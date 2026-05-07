import { useContext } from 'react';

import { ThemeContext } from '@core/providers/theme-provider';

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('ThemeContext is not initialized');
  }

  return context;
};

export default useTheme;
