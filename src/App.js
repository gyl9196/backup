import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import Amplify from 'aws-amplify';
import { SnackbarProvider } from 'notistack';

import { store } from 'store';
import theme from 'theme';
import Routes from './Routes';
import './App.scss';

import awsconfig from 'aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
