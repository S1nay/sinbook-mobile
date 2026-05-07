import NetworkLogger from 'react-native-network-logger';
import { useUnistyles } from 'react-native-unistyles';

import AppLayout from '@layouts/_app';

const LogView = () => {
  const { theme } = useUnistyles();

  return (
    <AppLayout>
      <NetworkLogger
        sort="desc"
        theme={{
          colors: {
            background: theme.colors.background.primary,
            text: theme.colors.foreground.primary,
            card: theme.colors.background.secondary,
          },
        }}
      />
    </AppLayout>
  );
};

export default LogView;
