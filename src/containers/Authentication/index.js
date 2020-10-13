import React, { useEffect } from 'react';
import {
  Authenticator,
  Greetings,
  // ForgotPassword,
} from 'aws-amplify-react';
import { Hub } from 'aws-amplify';
import { Grid } from '@material-ui/core';
import CustomSignIn from './sections/SignIn';
import CustomSignUp from './sections/SignUp';
import CustomConfirmSignUp from './sections/ConfirmSignUp';
import CustomForgotPassword from './sections/ForgotPassword';

import './styles.scss';

const Authentication = () => {

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          window.location.href = '/';
          break;
        case 'signIn_failure':
          // updateError(data.message);
          break;
        case 'signUp_failure':
          // updateError(data.message);
          break;
        case 'signOut':
          // props.signOut();
          break;
        default:
          break;
      }
    });
  });

  return (
    <div className="Authentication_wrapper">
      <Grid container>
        {/* <Hidden>
          <Grid item md={7}>
            <div className="Authentication_image">
              <div>
                <div className="Authentication_slogan">
                  <p>Build Your Own Global </p>
                  <p>Support Network</p>
                </div>
                <div className="Authentication_copyright">
                  Copyrights 2020 Avicenna
                </div>
              </div>
            </div>
          </Grid>
        </Hidden> */}

        <Grid item xs={12}>
          <div className="Authentication">
            <div className="Authentication_logo">
              OverIP.build
              {/* <img
                src={require('assets/images/logo_site.png')}
                alt="Avicenna"
              /> */}
            </div>
            <div className="Authentication_container">
              <Authenticator hideDefault usernameAttributes="email">
                <CustomSignIn />
                <CustomSignUp usernameAttributes="email" />
                <CustomConfirmSignUp />
                <CustomForgotPassword />
                <Greetings />
              </Authenticator>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
