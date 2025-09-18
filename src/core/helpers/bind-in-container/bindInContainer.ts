import { Container } from 'inversify';

const bindInContainer = (container: Container, bindings: Array<Binding>): Container => {
  const localContainer = new Container({ parent: container });

  bindings.forEach(({ scope = 'singleton', identifier, implementation }) => {
    const binding = localContainer.bind(identifier).to(implementation);

    if (scope === 'singleton') {
      binding.inSingletonScope();
    }
  });

  return localContainer;
};

export default bindInContainer;
