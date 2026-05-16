import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { FlatList, Pressable } from 'react-native';

import Placeholders from '@components/placeholders';
import ProfileInfo from '@components/profile-info';
import { useDIContainer } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import {
  BottomTabRouteNames,
  MaintenanceRouteNames,
  MaintenanceScreenProps,
  ProfileRouteNames,
} from '@navigation/configuration';
import Button from '@ui/button';
import Grid, { GridRenderItemInfo } from '@ui/grid';
import AppImage from '@ui/image';

import styles from './styles';
import { IUserDetailsViewModel } from '../view-model';

const GRID_GAP = 2;
const GRID_NUM_OF_COLUMNS = 3;

const UserDetailsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<MaintenanceScreenProps<MaintenanceRouteNames.UserDetails>['navigation']>();
  const { params } = useRoute<MaintenanceScreenProps<MaintenanceRouteNames.UserDetails>['route']>();
  const { user, load, refresh, loadMorePosts, posts, postsMeta, isLoading, isRefreshing } =
    container.get(IUserDetailsViewModel.$);

  const gridRef = useRef<FlatList | null>(null);

  useEffect(() => {
    navigation.setOptions({ headerTitle: params.nickName });

    load(params.userId);
  }, [params.userId]);

  const onPaginate = async (page: number) => loadMorePosts(page);

  const navigateToProfilePosts = () => {
    if (user && posts.length && postsMeta)
      navigation.navigate(MaintenanceRouteNames.Tab, {
        screen: BottomTabRouteNames.Profile,
        params: {
          screen: ProfileRouteNames.ProfilePosts,
          params: { user, posts, meta: postsMeta },
        },
      });
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
        pagination={postsMeta}
        onPaginate={onPaginate}
        gap={GRID_GAP}
        style={styles.content}
        numberOfColumns={GRID_NUM_OF_COLUMNS}
        placeholder={<Placeholders.GridPlaceholder />}
        GridHeaderComponent={
          <ProfileInfo
            user={user}
            placeholder={<Placeholders.ProfileInfoPlaceholder />}
            gridRef={gridRef}
            actions={<Button value="Follow" onPress={() => {}} />}
          />
        }
        onRefresh={refresh}
      />
    </AppLayout>
  );
};

export default observer(UserDetailsView);
