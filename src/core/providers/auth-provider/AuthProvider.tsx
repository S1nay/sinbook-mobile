import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { Identifiers } from '@core/di/identifiers';
import { useDIContainer } from '@core/hooks';
import { AuthStorageKeys } from '@data/storage';

import AuthContext from './AuthContext';

const AuthProvider = (props: PropsWithChildren<unknown>) => {
  const { children } = props;
  const container = useDIContainer();
  const [isAuth, setIsAuth] = useState(false);
  const storage = container?.get(Identifiers.MMKVStorage);

  useEffect(() => {
    const token = storage?.getBoolean(AuthStorageKeys.ACCESS_TOKEN);

    if (token) {
      setIsAuth(true);
    }
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
