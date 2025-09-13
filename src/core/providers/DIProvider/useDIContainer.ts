import { useContext } from 'react';

import DIContext from './DIContext';

const useDIContainer = () => {
  const container = useContext(DIContext);

  if (!container) {
    console.error('DIContext is not initialized');
  }

  return container;
};

export default useDIContainer;
