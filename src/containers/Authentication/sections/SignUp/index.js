import React from 'react';
import { SignUp } from 'aws-amplify-react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { Formik } from "formik";
import * as Yup from "yup";

import './styles.scss';
import { Auth } from 'aws-amplify';

export default class CustomSignUp extends SignUp {
  constructor(props) {
    super(props);

    this._validAuthStates = ['signUp'];
    this.signUpFields = [
      {
        label: 'Email',
        key: 'email',
        required: true,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        type: 'password',
      },
      {
        label: 'Phone Number',
        key: 'phone_line_number',
        required: true,
        type: 'string',
      },
    ];

    this.state = {
      signupError: ''
    }
  }

  showComponent() {
    return (
      <Formik
      initialValues={{
        email: "",
        password: "",
        phone_line_number: "",
      }}

      onSubmit={(values)=>{
        const signup_info = {
          username: values.email,
          password: values.password,
          attributes: {
            phone_number: values.phone_line_number.toString()
          }
        }

        Auth.signUp(signup_info).then(res => {
          this.changeState("confirmSignUp")
          // for the next page 
          localStorage.setItem('temp_username', values.email)
        }).catch(e => {
          switch (e.code) {
            case "InvalidPasswordException":
              e.message = "Invalid password format"
              break;
            case "InvalidParameterException":
              if (e.message.includes('phone')){
                break
              }
              e.message = "Invalid password format"
              break;
            default:
              break;
          } 

          this.setState({
            signupError: e.message
          })
        })
      }}

      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Please enter correct email address")
          .required("Required"),
        password: Yup.string().required("Password Field cannot be blank"),
        phone_line_number: Yup.number().typeError('must be a number').required("Phone nubmer cannot be blank")
      })}          
      >
        {(formProps)=>{
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          } = formProps
          return (
            <div className="Authentication_signup_form">
              <form>
                <TextField
                  id="email"
                  variant="outlined"
                  label="Email"
                  name="email"
                  key="email"
                  placeholder="Email"
                  fullWidth
                  margin="normal"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />
                <TextField
                  id="password"
                  variant="outlined"
                  label="Password"
                  name="password"
                  key="password"
                  placeholder="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
                <TextField
                  id="phone_line_number"
                  variant="outlined"
                  label="Phone Number"
                  name="phone_line_number"
                  key="phone_line_number"
                  placeholder="Phone Number"
                  fullWidth
                  margin="normal"
                  type="text"
                  value={values.phone_line_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone_line_number && touched.phone_line_number}
                  helperText={
                    errors.phone_line_number && touched.phone_line_number ? errors.phone_line_number : ""
                  }
                />

                <div className="Authentication_signup_error">{this.state.signupError}</div>

                <Button disabled={this.state.requestPending} size="large" fullWidth variant="contained" color="primary" onClick={handleSubmit}>SIGN UP</Button>
              </form>
              <div className="Authentication_signup_signin_nav">
                <span>Have an account?</span>
                <Button onClick={() => super.changeState('signIn')} className="Authentication_signup_signin_nav_button">Sign In</Button>
              </div>
            </div>
          );
        }}
      </Formik>
    )
   
  }
}
