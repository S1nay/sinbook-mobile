import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { FlatList, Pressable } from 'react-native';

import Header from '@components/header';
import Placeholders from '@components/placeholders';
import ProfileInfo from '@components/profile-info';
import { useDIContainer, usePagination } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import Button from '@ui/button';
import Grid, { GridRenderItemInfo } from '@ui/grid';
import AppImage from '@ui/image';

import styles from './styles';
import { IProfileDetailsViewModel } from '../view-model';

const GRID_GAP = 2;
const GRID_NUM_OF_COLUMNS = 3;

const ProfileDetailsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['route']>();
  const {
    user,
    load,
    loadUser,
    refresh,
    loadMorePosts,
    posts,
    postsMeta,
    isLoading,
    isRefreshing,
  } = container.get(IProfileDetailsViewModel.$);

  const gridRef = useRef<FlatList | null>(null);

  useEffect(() => {
    params?.userIsUpdated ? loadUser() : load();
  }, [params?.userIsUpdated, params?.newPostIsCreated]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.nickName ?? 'Profile',
      header: props => (
        <Header {...props} rightIcon="threeDots" onPressRightIcon={navigateToSettings} />
      ),
    });
  }, [user]);

  const onPaginate = async (page: number) => loadMorePosts(page);

  const { isLoadMore, onLoadMore } = usePagination({ pagination: postsMeta, onPaginate });

  const navigateToSettings = () => {
    navigation.navigate(ProfileRouteNames.ProfileSettings);
  };

  const navigateToFollows = (type: 'follows' | 'followers') => {
    navigation.navigate(ProfileRouteNames.ProfileFollows, { type });
  };

  const navigateToProfileEdit = () => {
    if (user) navigation.navigate(ProfileRouteNames.ProfileEdit, { user });
  };

  const navigateToProfilePosts = () => {
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
        isRefreshing={isRefreshing}
        isLoading={isLoading}
        isLoadMore={isLoadMore}
        gap={GRID_GAP}
        style={styles.content}
        numberOfColumns={GRID_NUM_OF_COLUMNS}
        placeholder={<Placeholders.GridPlaceholder />}
        onRefresh={refresh}
        onLoadMore={onLoadMore}
        GridHeaderComponent={
          <ProfileInfo
            user={user}
            placeholder={<Placeholders.ProfileInfoPlaceholder />}
            gridRef={gridRef}
            onPressFollows={navigateToFollows}
            actions={
              <Button
                value="Edit Profile"
                icon={{ name: 'pencil', size: 16 }}
                onPress={navigateToProfileEdit}
              />
            }
          />
        }
      />
    </AppLayout>
  );
};

export default observer(ProfileDetailsView);
