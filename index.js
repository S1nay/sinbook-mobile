import { AppRegistry } from 'react-native';
import { startNetworkLogging } from 'react-native-network-logger';

import { name as appName } from './app.json';
import App from './src/App';

if(__DEV__) {
    startNetworkLogging();
}

AppRegistry.registerComponent(appName, () => App);
