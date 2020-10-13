import React from 'react';
import { ConfirmSignUp } from 'aws-amplify-react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

import './styles.scss';

const logger = new Logger('ConfirmSignUp');
export default class CustomConfirmSignUp extends ConfirmSignUp {
  constructor(props) {
    super(props);

    this._validAuthStates = ['confirmSignUp'];
    this._onResend = this._onResend.bind(this);

    this.state = {
      loading: false,
      confirmError: ''
    };
  }

  _onResend(e) {
    e.preventDefault();
    this.resend();
  }

  resend() {
    this.setState({ loading: true });
    const username = localStorage.getItem('temp_username')|| this.inputs.username;
    if (!Auth || typeof Auth.resendSignUp !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }
    Auth.resendSignUp(username)
      .then(() => {
        this.setState({ loading: false });
        return logger.debug('code resent');
      })
      .catch((err) => {
        this.setState({ loading: false });
        return this.error(err);
      });
  }

  confirm() {
    this.setState({ loading: true });
    const username = localStorage.getItem('temp_username') || this.inputs.username;
    const { code } = this.inputs;
    if (!Auth || typeof Auth.confirmSignUp !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }
    Auth.confirmSignUp(username, code)
      .then(() => {
        this.setState({ 
          loading: false,
          confirmError: ''
         });
        localStorage.removeItem('temp_username')
        return this.changeState('signedUp');
      })
      .catch((err) => {
        this.setState({ 
          loading: false,
          confirmError: err.message
        });
      });
  }

  showComponent() {
    const username = localStorage.getItem('temp_username');

    return (
      <form className="Authentication_confirmsignup_form" action="POST">
        <TextField
          id="username"
          variant="outlined"
          label="Username"
          name="username"
          key="username"
          placeholder="Username"
          fullWidth
          margin="normal"
          type="text"
          onChange={this.handleInputChange}
          disabled={username ? true : false}
          defaultValue={username || ''}
          autoComplete="off"
        />
        <TextField
          id="code"
          variant="outlined"
          label="Code"
          name="code"
          key="code"
          placeholder="Code"
          fullWidth
          margin="normal"
          type="text"
          onChange={this.handleInputChange}
          autoComplete="off"
        />
        <div style={{textAlign: 'center', color: 'red'}}>{this.state.confirmError}</div>
        <div className="Authentication_resend_code">
          <span>Lost your code? </span>
          <Button disabled={this.state.loading} onClick={(e) => { this._onResend(e); }} className="Authentication_resend_code_button">Resend</Button>
        </div>
        <div className="Authentication_confirmsignup_signin_nav">
          <Button className="Authentication_confirmsignup_signin_nav_button" onClick={() => super.changeState('signIn')}>Back to Sign In</Button>
          <Button disabled={this.state.loading} variant="contained" color="primary" onClick={() => this.confirm()}>CONFIRM</Button>
        </div>
      </form>
    );
  }
}