import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { Identifiers } from '@core/di/identifiers';
import { useDIContainer } from '@core/hooks';
import { UserStorageKeys } from '@infrastructure/storage/entities';

import AuthContext from './AuthContext';

const AuthProvider = (props: PropsWithChildren<unknown>) => {
  const { children } = props;
  const container = useDIContainer();
  const [isAuth, setIsAuth] = useState(false);
  const storage = container?.get(Identifiers.MMKVStorage);

  useEffect(() => {
    const isRememberMe = storage?.getBoolean(UserStorageKeys.IS_REMEMBER_ME);

    isRememberMe ? setIsAuth(true) : storage.clear();
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
