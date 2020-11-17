import { Router } from 'react-router-dom';
import React from 'react';
import Routes from './Routes';

import History from './Services/history';
import { AuthProvider } from './Contexts/auth';

const App = () => {
  return (
    <Router history={History}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
};

export default App;
