import React from 'react';
import { Page } from './styles';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) =>{ return (
  <Page>
    <>
    {children}
    </>    
  </Page>
)};

export default AuthLayout;
