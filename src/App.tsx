import { Router } from 'react-router-dom';
import React from 'react';

import dtUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Routes from './Routes';

import History from './Services/history';
import { AuthProvider } from './Contexts/auth';

const App = () => {
  return (
    <Router history={History}>
      <MuiPickersUtilsProvider utils={dtUtils}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </Router>
  );
};

export default App;
