import { PropsWithChildren, useMemo, useState } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

import { useDIContainer } from '@core/hooks';
import { TTheme } from '@domain/models';
import { ThemeUseCases } from '@domain/use-cases';

import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  const container = useDIContainer();
  const getThemeUseCase = container.get<UseCase<void, TTheme | null, TTheme | null>>(
    ThemeUseCases.$Get,
  );
  const switchThemeUseCase = container.get<UseCase<TTheme | null, void, void>>(
    ThemeUseCases.$Switch,
  );

  const [activeTheme, setActiveTheme] = useState<TTheme>(() => {
    const saved = getThemeUseCase.execute();

    if (saved === 'light' || saved === 'dark') {
      UnistylesRuntime.setAdaptiveThemes(false);
      UnistylesRuntime.setTheme(saved);
    }

    return saved ?? 'system';
  });

  const switchTheme = (theme: TTheme) => {
    switchThemeUseCase.execute(theme);
    setActiveTheme(theme);

    if (theme === 'system') {
      UnistylesRuntime.setAdaptiveThemes(true);
    } else {
      UnistylesRuntime.setAdaptiveThemes(false);
      UnistylesRuntime.setTheme(theme);
    }
  };

  const value = useMemo(() => ({ activeTheme, switchTheme }), [activeTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
