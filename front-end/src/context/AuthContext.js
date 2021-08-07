import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  // TODO deslogar

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const { user, setUser } = useContext(AuthContext);
  return { user, setUser };
}

export { AuthProvider, UseAuth };
