import { Text, View } from 'react-native';

import Avatar from '@ui/avatar';

import styles from './styles';
import { ProfileInfoProps } from './types';

const ProfileInfo = ({ user }: ProfileInfoProps) => (
  <View style={styles.container}>
    <Avatar uri={user?.avatarPath} size={160} />

    <Text style={styles.name}>{user?.name}</Text>

    <Text style={styles.biography}>{user?.biography}</Text>

    <View style={styles.detailsContainer}>
      <Text style={styles.detailsText}>{user?.postsCount} posts</Text>
      <Text style={styles.detailsText}>{user?.followersCount} followers</Text>
      <Text style={styles.detailsText}>{user?.followsCount} follows</Text>
    </View>
  </View>
);

export default ProfileInfo;
