import { Container } from 'inversify';
import { PropsWithChildren, useEffect, useRef } from 'react';

import { bindInContainer } from '@core/helpers';
import { useDIContainer } from '@core/hooks';
import { DIProvider } from '@core/providers/di-provider';

interface ViewModelInjectorProps {
  viewModels: Array<Binding>;
}

const ViewModelInjector = (props: PropsWithChildren<ViewModelInjectorProps>) => {
  const { viewModels, children } = props;

  const container = useDIContainer();

  const localContainer = useRef<Container>(bindInContainer(container, viewModels));

  useEffect(() => {
    return () => {
      localContainer.current?.unbindAll();
    };
  }, [container, localContainer.current]);

  return <DIProvider container={localContainer.current}>{children}</DIProvider>;
};

export default ViewModelInjector;
