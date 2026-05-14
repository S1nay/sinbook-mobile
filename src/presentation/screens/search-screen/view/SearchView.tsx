import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';

import Placeholders from '@components/placeholders';
import Post from '@components/post';
import UserCard from '@components/user-card';
import { useDIContainer } from '@core/hooks';
import { IPost, IUser } from '@domain/models';
import AppLayout from '@layouts/_app';
import { MaintenanceRouteNames, MaintenanceScreenProps } from '@navigation/configuration';
import List from '@ui/list';
import SearchInput from '@ui/search-input';
import TopTabs from '@ui/tabs';

import { ISearchViewModel } from '../view-model';
import styles from './styles';

const TabRoutes = [
  { key: 'Posts', title: 'Posts' },
  { key: 'Users', title: 'Users' },
];

const USERS_TAB_INDEX = 1;

const SearchView = () => {
  const container = useDIContainer();
  const {
    loadPosts,
    loadUsers,
    refreshPosts,
    refreshUsers,
    loadMorePosts,
    loadMoreUsers,
    posts,
    postsMeta,
    users,
    usersMeta,
    isPostsLoading,
    isUsersLoading,
    isPostsRefreshing,
    isUsersRefreshing,
  } = container.get(ISearchViewModel.$);

  const navigation =
    useNavigation<MaintenanceScreenProps<MaintenanceRouteNames.Tab>['navigation']>();

  const usersLoaded = useRef(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const onTabIndexChange = (index: number) => {
    setActiveTabIndex(index);
    if (index === USERS_TAB_INDEX && !usersLoaded.current) {
      usersLoaded.current = true;
      loadUsers();
    }
  };

  const handleSearch = (query: string) => {
    setSearch(query);

    if (activeTabIndex === USERS_TAB_INDEX) {
      if (usersLoaded.current) loadUsers(query);
    } else {
      loadPosts(query);
    }
  };

  const onPaginatePosts = async (page: number) => loadMorePosts(page, search);
  const onPaginateUsers = async (page: number) => loadMoreUsers(page, search);

  const navigateToUserDetails = (userId: number, nickName: string) =>
    navigation.navigate(MaintenanceRouteNames.UserDetails, { userId, nickName });

  const renderPost = ({ item: post }: ListRenderItemInfo<IPost>) => <Post post={post} />;
  const renderUser = ({ item: user }: ListRenderItemInfo<IUser>) => (
    <UserCard
      {...user}
      onPressUserName={() => navigateToUserDetails(user.id, user.nickName)}
      style={styles.userCard}
    />
  );

  return (
    <AppLayout>
      <TopTabs routes={TabRoutes} onIndexChange={onTabIndexChange}>
        <TopTabs.Content routeKey="Posts">
          <List
            data={posts}
            renderItem={renderPost}
            pagination={postsMeta}
            onPaginate={onPaginatePosts}
            onRefresh={refreshPosts}
            isLoading={isPostsLoading}
            ListHeaderComponent={<SearchInput onDebouncedChange={handleSearch} />}
            contentContainerStyle={styles.postListContainer}
            isRefreshing={isPostsRefreshing}
            placeholder={<Placeholders.PostListPlaceholder />}
          />
        </TopTabs.Content>
        <TopTabs.Content routeKey="Users">
          <List
            data={users}
            renderItem={renderUser}
            pagination={usersMeta}
            onPaginate={onPaginateUsers}
            onRefresh={refreshUsers}
            isLoading={isUsersLoading}
            ListHeaderComponent={<SearchInput onDebouncedChange={handleSearch} />}
            contentContainerStyle={styles.userListContainer}
            isRefreshing={isUsersRefreshing}
            placeholder={<Placeholders.UserCardListPlaceholder />}
          />
        </TopTabs.Content>
      </TopTabs>
    </AppLayout>
  );
};

export default observer(SearchView);
