import { createContext } from 'react';

interface AuthContext {
  isAuth: boolean;
  authorize: () => void;
  unauthorize: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
