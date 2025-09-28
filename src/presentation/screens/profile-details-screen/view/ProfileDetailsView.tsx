import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { View } from 'react-native';

import Header from '@components/header';
import { useAuth, useDIContainer } from '@core/hooks';
import { ProfileRouteNames, ProfileScreenProps } from '@navigation/configuration';

import { IProfileDetailsViewModel } from '../view-model';

const ProfileDetailsView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileDetails>['navigation']>();
  const { logout } = container.get(IProfileDetailsViewModel.$);
  const { unauthorize } = useAuth();

  const handleLogout = () => {
    logout(unauthorize);
  };

  useEffect(() => {
    navigation.setOptions({
      header: props => <Header {...props} rightIcon="logout" onPressRightIcon={handleLogout} />,
    });
  }, []);

  return <View />;
};

export default observer(ProfileDetailsView);
