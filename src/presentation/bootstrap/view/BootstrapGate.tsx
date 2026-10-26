import { useRef, useState } from 'react';
import { Animated, Image } from 'react-native';
import { useHideAnimation } from 'react-native-bootsplash';

import { AppNavigator } from '@navigation/AppNavigator';
import { useDIContainer } from '@shared/hooks';

import splashLogo from '../../../../assets/bootsplash/logo.png';
import { IBootstrapViewModel } from '../view-model';

// Фон/размер лого — из assets/bootsplash/manifest.json (сгенерировано bootsplash)
const SPLASH_MANIFEST = { background: '#ffffff', logo: { width: 100, height: 101 } };

const BootstrapGate = () => {
  const container = useDIContainer();
  const { initialize } = useRef(container.get(IBootstrapViewModel.$)).current;
  // синхронная инициализация: применяем тему и узнаём, авторизован ли пользователь
  const initialAuthed = useRef(initialize()).current;

  const [isSplashVisible, setSplashVisible] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;

  const { container: splashContainer, logo } = useHideAnimation({
    manifest: SPLASH_MANIFEST,
    logo: splashLogo,
    animate: () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setSplashVisible(false));
    },
  });

  return (
    <>
      <AppNavigator initialAuthed={initialAuthed} />

      {isSplashVisible && (
        <Animated.View {...splashContainer} style={[splashContainer.style, { opacity }]}>
          <Image {...logo} />
        </Animated.View>
      )}
    </>
  );
};

export default BootstrapGate;
