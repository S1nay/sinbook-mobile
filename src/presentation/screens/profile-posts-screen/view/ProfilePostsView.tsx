import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import Header from '@components/header';
import Post from '@components/post';
import { useDIContainer, usePagination } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';

import { IProfilePostsViewModel } from '../view-model';
import styles from './styles';

const ProfilePostsView = () => {
  const container = useDIContainer();
  const { theme } = useUnistyles();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfilePosts>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfilePosts>['route']>();
  const { getUserPosts, posts, postsMeta } = container.get(IProfilePostsViewModel.$);

  useEffect(() => {
    if (params.user) getUserPosts({ userId: params.user.id, mode: 'initial' });
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
    if (params.user) await getUserPosts({ userId: params.user.id, page, mode: 'pagination' });
  };

  const { isLoadMore, onLoadMore } = usePagination({ pagination: postsMeta, onPaginate });

  const renderPost = ({ item: post }: ListRenderItemInfo<IPost>) => (
    <Post post={post} user={params.user} />
  );

  const onEndReached = () => {
    if (!isLoadMore && onLoadMore) onLoadMore();
  };

  return (
    <AppLayout disableBottomInsets>
      <FlatList
        data={posts}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isLoadMore ? (
            <ActivityIndicator size={'small'} color={theme.colors.foreground.primary} />
          ) : undefined
        }
      />
    </AppLayout>
  );
};

export default observer(ProfilePostsView);
