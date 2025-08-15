import { useContext } from 'react';

import { DIContext } from '../providers/DIProvider';

const useDIContainer = () => {
  return useContext(DIContext);
};

export default useDIContainer;
