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
import { AuthUseCases } from '@domain/use-cases';
import Bootstrap from '@presentation/bootstrap';
import { IPostsStore, IUserStore } from '@presentation/store';
import { DIProvider } from '@shared/providers';
import BottomSheetModalWrapper from '@ui/bottom-sheet';
import ConfirmModalWrapper from '@ui/confirm-modal';
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
  const logoutUseCase = useRef(container.get(AuthUseCases.$Logout)).current;

  const clearSession = async () => {
    await logoutUseCase.execute();
    // Реактивную сессию (сторы presentation) чистим здесь — LogoutUseCase её не трогает
    container.get<IPostsStore>(IPostsStore.$).clear();
    container.get<IUserStore>(IUserStore.$).clear();
  };

  const setInterceptors = () => {
    httpClient.instance?.interceptors.request.use(request =>
      requestInterceptor({ request, storage }),
    );

    httpClient.instance?.interceptors.response.use(
      response => response,
      error =>
        responseInterceptor({
          error,
          storage,
          httpClient,
          navigation,
          onSessionExpired: clearSession,
        }),
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
            <StatusBar barStyle={theme.components.statusBar.barStyle} />

            <Bootstrap />

            <BottomSheetModalWrapper />

            <ConfirmModalWrapper />

            <Toast position={'bottom'} visibilityTime={3000} config={ToastConfig} />
          </DIProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
