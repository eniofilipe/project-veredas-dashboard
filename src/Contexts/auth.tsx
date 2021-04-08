import React, { createContext, useEffect, useState } from 'react';

import history from '../Services/history';
import { getLogin, getValidaToken } from '../Api/Login';
import { Administrador, Login } from '../Types';

interface IAuthContext {
  signed: boolean;
  admin: Administrador | null;
  signIn: (data: Login) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [admin, setAdmin] = useState<Administrador | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  );

  const handleToken = async () => {
    if (token) {
      try {
        const response = await getValidaToken(token);

        setAdmin({
          nome: response.data.nome,
          email: response.data.email,
          id: response.data.id,
        });
      } catch (error) {
        console.log(error);
        setAdmin(null);
        setToken(null);
      }
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  const signIn = async (data: Login) => {
    try {
      const response = await getLogin({
        email: data.email,
        password: data.password,
      });

      setAdmin(response.data.client);
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
