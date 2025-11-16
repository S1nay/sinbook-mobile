import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { RefreshControl, View } from 'react-native';

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
  const { logout, user, getUserData, getUserPosts, posts, postsMeta, isLoading } = container.get(
    IProfileDetailsViewModel.$,
  );
  const { unauthorize } = useAuth();

  useFocusEffect(
    useCallback(() => {
      getUserData(params?.userId).then(user => {
        if (user) {
          getUserPosts(user.id);
        }
      });
    }, [params?.userId]),
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.nickName ?? '',
      header: props => <Header {...props} rightIcon="logout" onPressRightIcon={handleLogout} />,
    });
  }, [user]);

  const handleRefreshProfile = () => {
    if (user) {
      getUserData(user.id, true);
      getUserPosts(user.id, true);
    }
  };

  const navigateToProfileEdit = () => {
    if (user) {
      navigation.navigate(ProfileRouteNames.ProfileEdit, { user });
    }
  };

  const handleLogout = () => {
    logout(unauthorize);
  };

  return (
    <AppLayout
      isScroll
      disableBottomInsets
      scrollViewProps={{
        refreshControl: <RefreshControl refreshing={isLoading} onRefresh={handleRefreshProfile} />,
      }}
    >
      {user && !isLoading ? (
        <View style={styles.container}>
          <ProfileInfo user={user} />
          <Button
            value="Edit Profile"
            icon={{ name: 'pencil', size: 16 }}
            onPress={navigateToProfileEdit}
          />

          {posts.length > 0 && postsMeta && !isLoading ? (
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
