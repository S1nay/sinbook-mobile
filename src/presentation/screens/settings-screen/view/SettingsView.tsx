import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';

import { useAuth, useDIContainer, useTheme } from '@core/hooks';
import { TTheme } from '@domain/models';
import AppLayout from '@layouts/_app';
import Button from '@ui/button';
import SegmentedControl from '@ui/segmented-control';

import styles from './styles';
import { ISettingsViewModel } from '../view-model';

const THEMES = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

const SettingsView = () => {
  const container = useDIContainer();
  const { logout } = container.get(ISettingsViewModel.$);
  const { activeTheme, switchTheme } = useTheme();
  const { unauthorize } = useAuth();

  const handleThemeChange = (value: string) => {
    switchTheme(value as TTheme);
  };

  const handleLogout = () => {
    logout(unauthorize);
  };

  return (
    <AppLayout>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>

          <SegmentedControl defaultValue={activeTheme} onValueChange={handleThemeChange}>
            <SegmentedControl.Indicator />
            <SegmentedControl.Items items={THEMES} />
          </SegmentedControl>
        </View>

        <Button
          value="Logout"
          variant="secondary"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
    </AppLayout>
  );
};

export default observer(SettingsView);
