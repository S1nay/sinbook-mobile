import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { hide } from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import container from '@core/di/container';
import { Identifiers } from '@core/di/identifiers';
import { requestInterceptor, responseInterceptor } from '@core/interceptors';
import { AuthProvider } from '@core/providers/AuthProvider';
import { DIProvider } from '@core/providers/DIProvider';
import { SocketConnectionPaths } from '@infrastructure/socket/entities';
import { AppNavigator } from '@navigation/AppNavigator';

const socketConnections = [
  SocketConnectionPaths.CHAT,
  SocketConnectionPaths.CHATS,
  SocketConnectionPaths.NOTIFICATIONS,
];

const App = () => {
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
      await hide({ fade: true });
      setInterceptors();

      socketConnections.forEach(path => {
        socketManager.register(path, { transports: ['websocket'], timeout: 5000 });
      });
    })();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <DIProvider container={container}>
          <AuthProvider>
            <StatusBar barStyle={'dark-content'} />

            <AppNavigator />
          </AuthProvider>
        </DIProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
