import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';

import Post from '@components/post';
import { useDIContainer } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import List from '@ui/list';

import { IProfilePostsViewModel } from '../view-model';

const ProfilePostsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfilePosts>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfilePosts>['route']>();
  const { load, loadMorePosts, posts, postsMeta } = container.get(IProfilePostsViewModel.$);

  useEffect(() => {
    const { meta, posts, user } = params;

    navigation.setOptions({ headerTitle: user.nickName });

    load(posts, meta);
  }, []);

  const onPaginate = async (page: number) => loadMorePosts(page);

  const renderPost = ({ item: post }: ListRenderItemInfo<IPost>) => <Post post={post} />;

  return (
    <AppLayout disableBottomInsets>
      <List data={posts} renderItem={renderPost} pagination={postsMeta} onPaginate={onPaginate} />
    </AppLayout>
  );
};

export default observer(ProfilePostsView);
