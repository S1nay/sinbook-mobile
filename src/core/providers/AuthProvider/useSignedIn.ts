import { useContext } from 'react';

import AuthContext from './AuthContext';

const useSignedIn = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    console.error('AuthContext is not initialized');
    return false;
  }

  return context.isSignedIn;
};

export default useSignedIn;
