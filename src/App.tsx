import './presentation/shared/theme/unistyles';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useUnistyles } from 'react-native-unistyles';

import container from '@core/di/container';
import { Identifiers } from '@core/di/identifiers';
import { requestInterceptor, responseInterceptor } from '@core/interceptors';
import { SocketConnectionPaths } from '@core/interfaces/socket';
import { AuthProvider } from '@core/providers/auth-provider';
import { DIProvider } from '@core/providers/di-provider';
import { AppNavigator } from '@navigation/AppNavigator';
import BottomSheetModalWrapper from '@ui/bottom-sheet';
import ToastConfig from '@ui/toast';

const socketConnections = [
  SocketConnectionPaths.CHAT,
  SocketConnectionPaths.CHATS,
  SocketConnectionPaths.NOTIFICATIONS,
];

const App = () => {
  const { theme } = useUnistyles();
  const httpClient = useRef(container.get(Identifiers.SinbookHttpClient)).current;
  const storage = useRef(container.get(Identifiers.MMKVStorage)).current;
  const socketManager = useRef(container.get(Identifiers.SocketManager)).current;
  const navigation = useRef(container.get(Identifiers.NavigationService)).current;

  const setInterceptors = () => {
    httpClient.instance?.interceptors.request.use(request =>
      requestInterceptor({ request, storage }),
    );

    httpClient.instance?.interceptors.response.use(
      response => response,
      error => responseInterceptor({ error, storage, httpClient, navigation }),
    );
  };

  useEffect(() => {
    (async () => {
      setInterceptors();

      socketConnections.forEach(path => {
        socketManager.register(path, { transports: ['websocket'], timeout: 5000 });
      });
    })();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <DIProvider container={container}>
            <AuthProvider>
              <StatusBar barStyle={theme.components.statusBar.barStyle} />

              <AppNavigator />

              <BottomSheetModalWrapper />

              <Toast position={'bottom'} visibilityTime={3000} config={ToastConfig} />
            </AuthProvider>
          </DIProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
