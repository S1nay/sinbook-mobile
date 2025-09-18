import { useContext } from 'react';

import { DIContext } from '@core/providers/DIProvider';

const useDIContainer = () => {
  const container = useContext(DIContext);

  if (!container) {
    throw new Error('DIContext is not initialized');
  }

  return container;
};

export default useDIContainer;
