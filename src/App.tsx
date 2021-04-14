import { Router } from 'react-router-dom';
import React from 'react';

import dtUtils from '@date-io/dayjs';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'jspdf/dist/polyfills.es.js';
import Routes from './Routes';

import theme from './Styles/theme';

import History from './Services/history';
import { AuthProvider } from './Contexts/auth';

const App = () => {
  return (
    <Router history={History}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={dtUtils}>
          <AuthProvider>
            <Routes />
            <ToastContainer />
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
