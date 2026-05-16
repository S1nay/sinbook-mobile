import { ServiceIdentifier } from 'inversify';
import { useMemo } from 'react';

import useDIContainer from '../use-DI-container';

const useUseCase = <T>(identifier: ServiceIdentifier<T>): T => {
  const container = useDIContainer();

  return useMemo(() => container.get<T>(identifier), [identifier]);
};

export default useUseCase;
