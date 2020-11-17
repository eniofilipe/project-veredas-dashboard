import React, { createContext, useState } from 'react';
import { isNull } from 'util';
import history from '../Services/history';
/* import { Vendedor } from '../types/Vendedor';
import { getVendedor } from '../resolvers/Vendedor'; */

interface IAuthContext {
  signed: boolean;
  vendedor: string | null;
  signIn(): Promise<void>;
  signOut(): void;
  codigo: number;
  setCodigo: React.Dispatch<React.SetStateAction<number>>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [codigo, setCodigo] = useState<number>(0);
  const [vendedor, setVendedor] = useState<string | null>(
    localStorage.getItem('vendedor')
      ? JSON.parse(localStorage.getItem('vendedor') || '')
      : null,
  );

  async function signIn() {
    try {
      /* const response = await getVendedor(codigo);

      if (response.length > 0) {
        setVendedor(response[0] as Vendedor);
        localStorage.setItem('vendedor', JSON.stringify(response[0]));

        history.push('/dashboard');
        setCodigo(0);
      } */
      localStorage.setItem('vendedor', JSON.stringify("Entro"));

      history.push('/dashboard');
      setCodigo(0);


    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    setVendedor(null);
    localStorage.clear();
    history.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!vendedor,
        vendedor,
        signIn,
        signOut,
        setCodigo,
        codigo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
