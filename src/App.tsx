import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect, useMemo } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { hide } from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import container from '@core/di/container';
import { Identifiers } from '@core/di/identifiers';
import { requestInterceptor, responseInterceptor } from '@core/interceptors';
import { DIProvider } from '@core/providers/DIProvider';
import { SocketConnectionPaths } from '@infrastructure/socket/entities';
import { AppNavigator } from '@navigation/AppNavigator';

// icons (Presentation)
// UI Base (Inputs, Buttons, Sheets, Elements of UI) (Presentation)
// layouts (AuthLayout, AppLayout) (Presentation)

const socketConnections = [
  SocketConnectionPaths.CHAT,
  SocketConnectionPaths.CHATS,
  SocketConnectionPaths.NOTIFICATIONS,
];

const App = () => {
  const httpClient = useMemo(() => container.get(Identifiers.SinbookHttpClient), []);
  const storage = useMemo(() => container.get(Identifiers.MMKVStorage), []);
  const socketManager = useMemo(() => container.get(Identifiers.SocketManager), []);
  const navigation = useMemo(() => container.get(Identifiers.NavigationService), []);

  const setInterceptors = () => {
    httpClient.instance?.interceptors.request.use(request =>
      requestInterceptor({ request, storage }),
    );

    httpClient.instance?.interceptors.response.use(
      response => response,
      async error => {
        await responseInterceptor({ error, storage, httpClient, navigation });
      },
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
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} />

            <AppNavigator />
          </SafeAreaView>
        </DIProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
