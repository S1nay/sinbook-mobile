import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { View } from 'react-native';

import Header from '@components/header';
import { useAuth, useDIContainer } from '@core/hooks';
import AppLayout from '@layouts/_app';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';
import Button from '@ui/button';

import { IProfileDetailsViewModel } from '../view-model';
import styles from './styles';
import ProfileInfo from '../components/profile-info';
import ProfileInfoPlaceholder from '../components/profile-info-placeholder';
import ProfilePostGrid from '../components/profile-post-grid';
import ProfilePostGridPlaceholder from '../components/profile-post-grid-placeholder';

const ProfileDetailsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['route']>();
  const { logout, user, getUserData, getUserPosts, posts, postsMeta } = container.get(
    IProfileDetailsViewModel.$,
  );
  const { unauthorize } = useAuth();

  const handleLogout = () => {
    logout(unauthorize);
  };

  useEffect(() => {
    getUserData(params?.userId);
  }, []);

  useEffect(() => {
    if (user) {
      getUserPosts(user.id);
    }
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.nickName ?? '',
      header: props => <Header {...props} rightIcon="logout" onPressRightIcon={handleLogout} />,
    });
  }, [user]);

  return (
    <AppLayout isScroll disableBottomInsets>
      {user ? (
        <View style={styles.container}>
          <ProfileInfo user={user} />
          <Button value="Edit Profile" icon={{ name: 'pencil', size: 16 }} />

          {posts.length && postsMeta ? (
            <ProfilePostGrid posts={posts} postsMeta={postsMeta} />
          ) : (
            <ProfilePostGridPlaceholder />
          )}
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <ProfileInfoPlaceholder />
        </View>
      )}
    </AppLayout>
  );
};

export default observer(ProfileDetailsView);
