import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';

import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import Avatar from '@ui/avatar';
import Button from '@ui/button';

import styles from './styles';
import ProfileInfoPlaceholder from '../profile-info-placeholder';
import { ProfileInfoProps } from './types';

const ProfileInfo = (props: ProfileInfoProps) => {
  const { user, gridRef } = props;

  const [contentHeight, setContentHeight] = useState(0);

  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['navigation']>();

  const onNavigateToProfileEdit = () => {
    if (user) navigation.navigate(ProfileRouteNames.ProfileEdit, { user });
  };

  const onNavigateToFollows = (type: 'follows' | 'followers') => {
    navigation.navigate(ProfileRouteNames.ProfileFollows, { type });
  };

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

        <Text onPress={() => onNavigateToFollows('followers')} style={styles.detailsText}>
          {user?.followersCount} followers
        </Text>

        <Text onPress={() => onNavigateToFollows('follows')} style={styles.detailsText}>
          {user?.followsCount} follows
        </Text>
      </View>

      <Button
        value="Edit Profile"
        icon={{ name: 'pencil', size: 16 }}
        onPress={onNavigateToProfileEdit}
      />
    </View>
  ) : (
    <ProfileInfoPlaceholder />
  );
};

export default ProfileInfo;
