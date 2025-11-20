import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, Pressable } from 'react-native';
import TurboImage from 'react-native-turbo-image';

import Header from '@components/header';
import { getConnectUrl } from '@core/helpers';
import { useAuth, useDIContainer, usePagination } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import { Colors } from '@shared/colors';
import Grid, { GridRenderItemInfo } from '@ui/grid';

import GridPlaceholder from '../components/grid-placeholder';
import ProfileInfo from '../components/profile-info';
import { IProfileDetailsViewModel } from '../view-model';
import styles from './styles';

const GRID_GAP = 2;
const GRID_NUM_OF_COLUMNS = 3;

const ProfileDetailsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['route']>();
  const { logout, user, getUserData, getUserPosts, posts, postsMeta, isLoading } = container.get(
    IProfileDetailsViewModel.$,
  );

  const gridRef = useRef<FlatList | null>(null);

  const { unauthorize } = useAuth();

  useEffect(() => {
    getUserData({ id: params?.userId }).then(user => {
      if (!params?.userIsUpdated) getUserPosts({ userId: user.id });
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
    if (user) await getUserPosts({ isPagination: true, userId: user.id, page });
  };

  const { isLoadMore, onLoadMore } = usePagination({ pagination: postsMeta, onPaginate });

  const onRefresh = () => {
    if (user) {
      getUserData({ id: user.id, isRefetching: true });
      getUserPosts({ userId: user.id, isRefetching: true });
    }
  };

  const handleLogout = () => {
    logout(unauthorize);
  };

  const onNavigateToProfilePosts = () => {
    navigation.navigate(ProfileRouteNames.ProfilePosts);
  };

  const renderPost = ({ item: post, style }: GridRenderItemInfo<IPost>) => {
    const uri = getConnectUrl(post.images[0])!;

    return (
      <Pressable onPress={onNavigateToProfilePosts}>
        <TurboImage source={{ uri }} style={style} />
      </Pressable>
    );
  };

  return (
    <AppLayout disableBottomInsets>
      <Grid
        data={posts}
        ref={gridRef}
        renderItem={renderPost}
        keyExtractor={(item: IPost) => item.id.toString()}
        refreshing={isLoading}
        gap={GRID_GAP}
        style={styles.content}
        numberOfColumns={GRID_NUM_OF_COLUMNS}
        ListHeaderComponent={<ProfileInfo user={user} gridRef={gridRef} />}
        ListEmptyComponent={<GridPlaceholder />}
        ListFooterComponent={
          isLoadMore ? <ActivityIndicator size={'small'} color={Colors.black} /> : undefined
        }
        onRefresh={onRefresh}
        isLoadMore={isLoadMore}
        onLoadMore={onLoadMore}
      />
    </AppLayout>
  );
};

export default observer(ProfileDetailsView);
