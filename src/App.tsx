import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect, useMemo } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { hide as hideBootSplash } from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import container from '@core/di/container';
import { Identifiers } from '@core/di/identifiers';
import { requestInterceptor, responseInterceptor } from '@core/interceptors';
import { DIProvider } from '@core/providers/DIProvider';
import { AppNavigator } from '@navigation/AppNavigator';

// sockets (Infrastructure)
// icons (Presentation)
// UI Base (Inputs, Buttons, Sheets, Elements of UI) (Presentation)
// layouts (AuthLayout, AppLayout) (Presentation)

const App = () => {
  const httpClient = useMemo(() => container.get(Identifiers.SinbookHttpClient), []);
  const storage = useMemo(() => container.get(Identifiers.MMKVStorage), []);
  const navigation = useMemo(() => container.get(Identifiers.NavigationService), []);

  const setInterceptors = () => {
    httpClient.instance?.interceptors.request.use(request =>
      requestInterceptor({
        request,
        storage,
      }),
    );

    httpClient.instance?.interceptors.response.use(
      response => response,
      async error => {
        await responseInterceptor({
          error,
          storage,
          httpClient,
          navigation,
        });
      },
    );
  };

  useEffect(() => {
    (async () => {
      await hideBootSplash({
        fade: true,
      });
      setInterceptors();
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <DIProvider container={container}>
          <SafeAreaView>
            <StatusBar barStyle={'light-content'} />

            <AppNavigator />
          </SafeAreaView>
        </DIProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
