import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const { user, setUser, token, setToken } = useContext(AuthContext);
  return { user, setUser, token, setToken };
}

export { AuthProvider, UseAuth };
