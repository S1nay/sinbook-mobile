import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, Pressable } from 'react-native';
import TurboImage from 'react-native-turbo-image';
import { useUnistyles } from 'react-native-unistyles';

import Header from '@components/header';
import { getConnectUrl } from '@core/helpers';
import { useDIContainer, usePagination } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import Grid, { GridRenderItemInfo } from '@ui/grid';

import styles from './styles';
import GridPlaceholder from '../components/grid-placeholder';
import ProfileInfo from '../components/profile-info';
import { IProfileDetailsViewModel } from '../view-model';

const GRID_GAP = 2;
const GRID_NUM_OF_COLUMNS = 3;

const ProfileDetailsView = () => {
  const container = useDIContainer();
  const { theme } = useUnistyles();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['route']>();
  const { user, getUserData, getUserPosts, posts, postsMeta, isLoading } = container.get(
    IProfileDetailsViewModel.$,
  );

  const gridRef = useRef<FlatList | null>(null);

  useEffect(() => {
    const postCreated = !!params?.newPostIsCreated;
    getUserData({ id: params?.userId, isRefetching: postCreated }).then(user => {
      if (!params?.userIsUpdated)
        getUserPosts({ userId: user.id, mode: postCreated ? 'post-created' : 'initial' });
    });
  }, [params?.userIsUpdated, params?.newPostIsCreated]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.nickName ?? 'Profile',
      header: props => (
        <Header {...props} rightIcon="threeDots" onPressRightIcon={navigateToSettings} />
      ),
    });
  }, [user]);

  const onPaginate = async (page: number) => {
    if (user) await getUserPosts({ userId: user.id, page, mode: 'pagination' });
  };

  const { isLoadMore, onLoadMore } = usePagination({ pagination: postsMeta, onPaginate });

  const onRefresh = () => {
    if (user) {
      getUserData({ id: user.id, isRefetching: true });
      getUserPosts({ userId: user.id, mode: 'refetch' });
    }
  };

  const navigateToSettings = () => {
    navigation.navigate(ProfileRouteNames.ProfileSettings);
  };

  const onNavigateToProfilePosts = () => {
    if (user) navigation.navigate(ProfileRouteNames.ProfilePosts, { user });
  };

  const renderPost = ({ item: post, style }: GridRenderItemInfo<IPost>) => {
    return (
      <Pressable onPress={navigateToProfilePosts}>
        <AppImage source={{ uri: post.images[0] }} style={style} />
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
        ListEmptyComponent={isLoading ? <GridPlaceholder /> : null}
        ListFooterComponent={
          isLoadMore ? (
            <ActivityIndicator size={'small'} color={theme.colors.foreground.primary} />
          ) : undefined
        }
        onRefresh={onRefresh}
        isLoadMore={isLoadMore}
        onLoadMore={onLoadMore}
      />
    </AppLayout>
  );
};

export default observer(ProfileDetailsView);
