import React, { createContext, useState } from 'react';

import history from '../Services/history';
import { getLogin } from '../Api/Login';
import { Administrador, Login } from '../Types';

interface IAuthContext {
  signed: boolean;
  admin: Administrador | null;
  signIn: (data: Login) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [admin, setAdmin] = useState<Administrador | null>(
    localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin') || '') : null
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  );

  const signIn = async (data: Login) => {
    try {
      const response = await getLogin({
        email: data.email,
        password: data.password,
      });

      setAdmin(response.data.client);
      localStorage.setItem('admin', JSON.stringify(response.data.client));
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  function signOut() {
    setAdmin(null);
    setToken(null);
    localStorage.clear();
    history.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!admin,
        admin,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
