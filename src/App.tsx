import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './Routes';

import History from './Services/history';
import { AuthProvider } from './Contexts/auth';

function App() {
  return (
    <Router history={History}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>

  );
}

export default App;
