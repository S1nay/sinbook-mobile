import { Container } from 'inversify';
import { PropsWithChildren } from 'react';

import DIContext from './DIContext';

interface DIProviderProps {
  container: Container;
}

const DIProvider = (props: PropsWithChildren<DIProviderProps>) => {
  const { container, children } = props;
  return <DIContext.Provider value={container}>{children}</DIContext.Provider>;
};

export default DIProvider;
