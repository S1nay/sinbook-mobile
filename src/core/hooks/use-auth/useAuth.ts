import { useContext } from 'react';

import { AuthContext } from '@core/providers/AuthProvider';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('AuthContext is not initialized');
  }

  return context;
};

export default useAuth;
