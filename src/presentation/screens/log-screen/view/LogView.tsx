import NetworkLogger from 'react-native-network-logger';

import AppLayout from '@layouts/_app';
import { Colors } from '@shared/colors';

const LogView = () => {
  return (
    <AppLayout>
      <NetworkLogger
        sort="desc"
        theme={{
          colors: {
            background: Colors.white,
            text: Colors.black,
          },
        }}
      />
    </AppLayout>
  );
};

export default LogView;
