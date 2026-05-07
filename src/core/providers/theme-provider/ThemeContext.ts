import { createContext } from 'react';

import { TTheme } from '@domain/models';

interface ThemeContext {
  activeTheme: TTheme;
  switchTheme: (theme: TTheme) => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export default ThemeContext;
