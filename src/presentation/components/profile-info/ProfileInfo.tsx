import { useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';

import Avatar from '@ui/avatar';

import styles from './styles';
import { ProfileInfoProps } from './types';

const ProfileInfo = (props: ProfileInfoProps) => {
  const { user, gridRef, actions, placeholder = null, onPressFollows } = props;

  const [contentHeight, setContentHeight] = useState(0);

  const onScrollToPosts = () => {
    gridRef?.current?.scrollToOffset({ offset: contentHeight - 6 });
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setContentHeight(e.nativeEvent.layout.height);
  };

  return user ? (
    <View style={styles.container} onLayout={onLayout}>
      <Avatar uri={user?.avatarPath} size={160} />

      <Text style={styles.name}>{user?.name}</Text>

      <Text style={styles.biography}>{user?.biography}</Text>

      <View style={styles.detailsContainer}>
        <Text onPress={onScrollToPosts} style={styles.detailsText}>
          {user?.postsCount} posts
        </Text>

        <Text
          onPress={onPressFollows ? () => onPressFollows('followers') : undefined}
          style={styles.detailsText}
        >
          {user?.followersCount} followers
        </Text>

        <Text
          onPress={onPressFollows ? () => onPressFollows('follows') : undefined}
          style={styles.detailsText}
        >
          {user?.followsCount} follows
        </Text>
      </View>

      {actions}
    </View>
  ) : (
    placeholder
  );
};

export default ProfileInfo;
