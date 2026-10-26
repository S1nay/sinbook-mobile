import { UnistylesRuntime } from 'react-native-unistyles';

import { TTheme } from '@domain/models';

// Применяет выбранную тему к Unistyles. 'system' => адаптивная тема по настройке устройства.
const applyTheme = (theme: TTheme): void => {
  if (theme === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
    return;
  }

  UnistylesRuntime.setAdaptiveThemes(false);
  UnistylesRuntime.setTheme(theme);
};

export default applyTheme;
