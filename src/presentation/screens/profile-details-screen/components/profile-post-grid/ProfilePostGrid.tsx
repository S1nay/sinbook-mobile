import TurboImage from 'react-native-turbo-image';

import { IPost } from '@domain/models';
import getCorrectUrl from '@shared/utils/getConnectUrl';
import Grid, { GridRenderItemInfo } from '@ui/grid';

import { ProfilePostGridProps } from './types';

const GRID_GAP = 4;
const GRID_NUM_OF_COLUMNS = 3;

const ProfilePostGrid = (props: ProfilePostGridProps) => {
  const { posts } = props;

  const renderItem = ({ item: post, style }: GridRenderItemInfo<IPost>) => {
    const uri = getCorrectUrl(post.images[0])!;

    return <TurboImage source={{ uri }} style={style} />;
  };

  return (
    <Grid
      data={posts}
      renderItem={renderItem}
      keyExtractor={({ id }) => `${id}`}
      numberOfColumns={GRID_NUM_OF_COLUMNS}
      gap={GRID_GAP}
    />
  );
};

export default ProfilePostGrid;
