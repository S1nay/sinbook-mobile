import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';

import Header from '@components/header';
import Post from '@components/post';
import { useDIContainer } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import List from '@ui/list';

import { IProfilePostsViewModel } from '../view-model';

// Прокинуть загруженные посты с экрана пользователя в параметры навигации
// После создания поста, обновления профиля данные на экранах поиска и главной устаревают
const ProfilePostsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfilePosts>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfilePosts>['route']>();
  const { load, loadMorePosts, posts, postsMeta } = container.get(IProfilePostsViewModel.$);

  useEffect(() => {
    if (params.user) load(params.user.id);
  }, [params.user]);

  useEffect(() => {
    if (params.user) {
      navigation.setOptions({
        headerTitle: params.user.nickName,
        header: props => <Header {...props} isShowBackIcon />,
      });
    }
  }, [params.user]);

  const onPaginate = async (page: number) => {
    if (params.user) await loadMorePosts(page);
  };

  const renderPost = ({ item: post }: ListRenderItemInfo<IPost>) => <Post post={post} />;

  return (
    <AppLayout disableBottomInsets>
      <List data={posts} renderItem={renderPost} pagination={postsMeta} onPaginate={onPaginate} />
    </AppLayout>
  );
};

export default observer(ProfilePostsView);
