import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import AuthLayout from '../Pages/__Layouts/Auth';
import DefaultLayout from '../Pages/__Layouts/Default';

interface IRoute extends RouteProps {
  component: React.ComponentType<any>;
  signed: boolean;
  isPrivate: boolean;
}

const route: React.FC<IRoute> = ({ component, signed, isPrivate, ...rest }) => {
  if (isPrivate && !signed) {
    return <Redirect to="/" />;
  }

  if (!isPrivate && signed) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default route;
