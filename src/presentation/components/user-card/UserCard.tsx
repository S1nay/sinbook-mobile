import { Pressable, Text, View } from 'react-native';

import Avatar from '@ui/avatar';
import Button from '@ui/button';

import styles from './styles';
import { UserCardProps } from './types';

const UserCard = (props: UserCardProps) => {
  const { mutualFollow, nickName, avatarPath, onPressUserName } = props;

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressUserName} style={styles.info}>
        <Avatar uri={avatarPath} />
        <Text style={styles.nickName}>{nickName}</Text>
      </Pressable>

      <Button
        value={mutualFollow ? 'Following' : 'Follow'}
        variant={mutualFollow ? 'secondary' : 'primary'}
        size="small"
      />
    </View>
  );
};

export default UserCard;
