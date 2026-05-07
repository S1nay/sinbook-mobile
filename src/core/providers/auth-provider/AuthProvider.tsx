import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { hide } from 'react-native-bootsplash';

import { useDIContainer } from '@core/hooks';
import { AuthUseCases } from '@domain/use-cases';

import AuthContext from './AuthContext';

const AuthProvider = (props: PropsWithChildren<unknown>) => {
  const { children } = props;
  const container = useDIContainer();
  const [isAuth, setIsAuth] = useState(false);
  const checkAuthUseCase = container.get<UseCase<void, boolean, boolean>>(AuthUseCases.$CheckAuth);

  useEffect(() => {
    (async () => {
      if (checkAuthUseCase.execute()) {
        setIsAuth(true);
      }

      await hide({ fade: true });
    })();
  }, []);

  const authorize = () => {
    setIsAuth(true);
  };

  const unauthorize = () => {
    setIsAuth(false);
  };

  const values = useMemo(
    () => ({
      isAuth,
      authorize,
      unauthorize,
    }),
    [isAuth],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
