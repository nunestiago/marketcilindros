import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [productTo, setProductTo] = useState({});

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, productTo, setProductTo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const { user, setUser, token, setToken, productTo, setProductTo } =
    useContext(AuthContext);
  return { user, setUser, token, setToken, productTo, setProductTo };
}

export { AuthProvider, UseAuth };
