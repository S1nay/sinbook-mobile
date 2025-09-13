import { createContext } from 'react';

interface AuthContext {
  isSignedIn: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
