import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import Header from '@components/header';
import Placeholders from '@components/placeholders';
import ProfileInfo from '@components/profile-info';
import { useDIContainer, usePagination } from '@core/hooks';
import { IPost } from '@domain/models';
import AppLayout from '@layouts/_app';
import { MaintenanceRouteNames, MaintenanceScreenProps } from '@navigation/configuration';
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
    load(params.userId);
  }, [params.userId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.nickName ?? '',
      header: props => <Header {...props} isShowBackIcon isShowRightIcon={false} />,
    });
  }, [user]);

  const onPaginate = async (page: number) => loadMorePosts(page);

  const { isLoadMore, onLoadMore } = usePagination({ pagination: postsMeta, onPaginate });

  const renderPost = ({ item: post, style }: GridRenderItemInfo<IPost>) => {
    return <AppImage source={{ uri: post.images[0] }} style={style} />;
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
        GridHeaderComponent={
          <ProfileInfo
            user={user}
            placeholder={<Placeholders.ProfileInfoPlaceholder />}
            gridRef={gridRef}
            actions={<Button value="Follow" onPress={() => {}} />}
          />
        }
        onRefresh={refresh}
        onLoadMore={onLoadMore}
      />
    </AppLayout>
  );
};

export default observer(UserDetailsView);
