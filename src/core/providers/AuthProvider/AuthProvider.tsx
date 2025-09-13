import { PropsWithChildren, useMemo } from 'react';

import { Identifiers } from '@core/di/identifiers';
import { UserStorageKeys } from '@infrastructure/storage/entities';

import AuthContext from './AuthContext';
import { useDIContainer } from '../DIProvider';

const AuthProvider = (props: PropsWithChildren<unknown>) => {
  const { children } = props;
  const container = useDIContainer();
  const storage = container?.get(Identifiers.MMKVStorage);

  const token = storage?.getBoolean(UserStorageKeys.ACCESS_TOKEN);

  const values = useMemo(
    () => ({
      isSignedIn: token !== null,
    }),
    [token],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
