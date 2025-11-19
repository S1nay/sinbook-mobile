import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import TurboImage from 'react-native-turbo-image';

import Header from '@components/header';
import { useAuth, useDIContainer, usePagination } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import getCorrectUrl from '@shared/utils/getConnectUrl';
import Button from '@ui/button';
import Grid, { GridRenderItemInfo } from '@ui/grid';

import { IProfileDetailsViewModel } from '../view-model';
import styles from './styles';
import GridPlaceholder from '../components/grid-placeholder';
import ProfileInfo from '../components/profile-info';
import ProfileInfoPlaceholder from '../components/profile-info-placeholder';

const GRID_GAP = 4;
const GRID_NUM_OF_COLUMNS = 3;

const ProfileDetailsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['route']>();
  const { logout, user, getUserData, getUserPosts, posts, postsMeta, isLoading } = container.get(
    IProfileDetailsViewModel.$,
  );
  const { unauthorize } = useAuth();

  useEffect(() => {
    getUserData({ id: params?.userId }).then(user => {
      if (!params?.userIsUpdated) {
        getUserPosts({ userId: user.id, perPage: 20, page: 1 });
      }
    });
  }, [params?.userIsUpdated]);

  useEffect(() => {
    if (user) {
      navigation.setOptions({
        headerTitle: user.nickName,
        header: props => <Header {...props} rightIcon="logout" onPressRightIcon={handleLogout} />,
      });
    }
  }, [user]);

  const onPaginate = async (page: number) => {
    if (user) {
      await getUserPosts({
        isPagination: true,
        userId: user.id,
        page,
        perPage: 20,
      });
    }
  };

  const { isLoadMore, onLoadMore } = usePagination({ pagination: postsMeta, onPaginate });

  const onRefresh = () => {
    if (user) {
      getUserData({ id: user.id, isRefetching: true });
      getUserPosts({
        userId: user.id,
        perPage: 20,
        page: 1,
        isRefetching: true,
      });
    }
  };

  const onNavigateToProfileEdit = () => {
    if (user) {
      navigation.navigate(ProfileRouteNames.ProfileEdit, { user });
    }
  };

  const handleLogout = () => {
    logout(unauthorize);
  };

  const renderPost = ({ item: post, style }: GridRenderItemInfo<IPost>) => {
    const uri = getCorrectUrl(post.images[0])!;

    return <TurboImage source={{ uri }} style={style} />;
  };

  return (
    <AppLayout disableBottomInsets>
      <Grid
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item: IPost) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.profileHeader}>
            {user ? (
              <>
                <ProfileInfo user={user} />
                <Button
                  value="Edit Profile"
                  icon={{ name: 'pencil', size: 16 }}
                  onPress={onNavigateToProfileEdit}
                />
              </>
            ) : (
              <ProfileInfoPlaceholder />
            )}
          </View>
        }
        ListEmptyComponent={<GridPlaceholder />}
        ListFooterComponent={isLoadMore ? <ActivityIndicator size={'small'} /> : undefined}
        refreshing={isLoading}
        gap={GRID_GAP}
        numberOfColumns={GRID_NUM_OF_COLUMNS}
        onRefresh={onRefresh}
        isLoadMore={isLoadMore}
        onLoadMore={onLoadMore}
      />
    </AppLayout>
  );
};

export default observer(ProfileDetailsView);
