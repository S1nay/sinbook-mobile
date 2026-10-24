import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';

import Post from '@components/post';
import { useDIContainer } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { MaintenanceRouteNames, MaintenanceScreenProps } from '@navigation/configuration';
import List from '@ui/list';

import { IProfilePostsViewModel } from '../view-model';

const ProfilePostsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<MaintenanceScreenProps<MaintenanceRouteNames.ProfilePosts>['navigation']>();
  const { params } =
    useRoute<MaintenanceScreenProps<MaintenanceRouteNames.ProfilePosts>['route']>();
  const vm = container.get(IProfilePostsViewModel.$);
  const { load, loadMorePosts, posts, postsMeta, currentUserId, likePost } = vm;

  useEffect(() => {
    navigation.setOptions({ headerTitle: params.nickName });

    load(params.postIds, params.meta);
  }, []);

  const onPaginate = async (page: number) => loadMorePosts(page, params.userId);

  const renderPost = ({ item: post }: ListRenderItemInfo<IPost>) => (
    <Post post={post} currentUserId={currentUserId} onLike={likePost} />
  );

  return (
    <AppLayout disableBottomInsets>
      <List data={posts} renderItem={renderPost} pagination={postsMeta} onPaginate={onPaginate} />
    </AppLayout>
  );
};

export default observer(ProfilePostsView);
