import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';

import Post from '@components/post';
import UserCard from '@components/user-card';
import { useDIContainer } from '@core/hooks';
import { IPost, IUser } from '@domain/models';
import AppLayout from '@layouts/_app';
import { MaintenanceRouteNames, MaintenanceScreenProps } from '@navigation/configuration';
import List from '@ui/list';
import TopTabs from '@ui/tabs';

import { ISearchViewModel } from '../view-model';
import styles from './styles';

const TabRoutes = [
  { key: 'Posts', title: 'Posts' },
  { key: 'Users', title: 'Users' },
];

const SearchView = () => {
  const container = useDIContainer();
  const { getPosts, getUsers, posts, postsMeta, users, usersMeta } = container.get(
    ISearchViewModel.$,
  );
  const navigation =
    useNavigation<MaintenanceScreenProps<MaintenanceRouteNames.Tab>['navigation']>();

  useEffect(() => {
    getPosts({ mode: 'initial' });
    getUsers({ mode: 'initial' });
  }, []);

  const onPaginatePosts = async (page: number) => {
    await getPosts({ page, mode: 'pagination' });
  };

  const onPaginateUsers = async (page: number) => {
    await getUsers({ page, mode: 'pagination' });
  };

  const renderPost = ({ item: post }: ListRenderItemInfo<IPost>) => <Post post={post} />;
  const renderUser = ({ item: user }: ListRenderItemInfo<IUser>) => (
    <UserCard
      {...user}
      onPressUserName={(userId: number) => {
        navigation.navigate(MaintenanceRouteNames.UserDetails, { userId });
      }}
    />
  );

  return (
    <AppLayout>
      <TopTabs routes={TabRoutes}>
        <TopTabs.Content routeKey="Posts">
          <List
            data={posts}
            renderItem={renderPost}
            pagination={postsMeta}
            onPaginate={onPaginatePosts}
          />
        </TopTabs.Content>
        <TopTabs.Content routeKey="Users">
          <List
            data={users}
            renderItem={renderUser}
            pagination={usersMeta}
            onPaginate={onPaginateUsers}
            contentContainerStyle={styles.userListContainer}
          />
        </TopTabs.Content>
      </TopTabs>
    </AppLayout>
  );
};

export default observer(SearchView);
