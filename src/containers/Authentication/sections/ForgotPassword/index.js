import React from "react";
import { ForgotPassword } from "aws-amplify-react";
import { TextField, Button } from "@material-ui/core";
import { ConsoleLogger as Logger } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { Formik } from "formik";
import * as Yup from "yup";

import "./styles.scss";

const logger = new Logger("ForgotPassword");
export default class CustomForgotPassword extends ForgotPassword {
  constructor(props) {
    super(props);

    this._validAuthStates = ["forgotPassword"];
    this.state = {
      loading: false,
      delivery: null,
      resetPasswordEmailError: "",
      resetPasswordError: "",
    };
  }

  send() {
    this.setState({
      loading: true,
    });
    const _a = this.props.authData;
    const authData = _a === void 0 ? {} : _a;
    const username = this.getUsernameFromInput() || authData.username;
    if (!Auth || typeof Auth.forgotPassword !== "function") {
      throw new Error(
        "No Auth module found, please ensure @aws-amplify/auth is imported"
      );
    }
    Auth.forgotPassword(username)
      .then((data) => {
        logger.debug(data);
        this.setState({
          loading: false,
          delivery: data.CodeDeliveryDetails,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          resetPasswordError: "Usernot found",
        });
      });
  }

  sendView() {
    return (
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={(values) => {
          this.setState({
            loading: true,
          });

          const username = values.email;
          if (!Auth || typeof Auth.forgotPassword !== "function") {
            throw new Error(
              "No Auth module found, please ensure @aws-amplify/auth is imported"
            );
          }
          Auth.forgotPassword(username)
            .then((data) => {
              logger.debug(data);
              localStorage.setItem("temp_username", username);
              this.setState({
                loading: false,
                resetPasswordEmailError: "",
                delivery: data.CodeDeliveryDetails,
              });
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                loading: false,
                resetPasswordEmailError: "User not found",
              });
            });
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Please enter correct email address")
            .required("Required"),
        })}
      >
        {(formProps) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = formProps;
          return (
            <div className="Authentication_forgotpassword_form">
              <form>
                <h3>Reset Password</h3>
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

                <div style={{ textAlign: "center", color: "red" }}>
                  {this.state.resetPasswordEmailError}
                </div>
              </form>
              <div className="Authentication_forgotpassword_signin_nav">
                <Button
                  className="Authentication_forgotpassword_signin_nav_button"
                  onClick={() => super.changeState("signIn")}
                >
                  Back to Sign In
                </Button>
                <Button
                  disabled={this.state.loading}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  CONFIRM
                </Button>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }

  _onResendCode(e) {
    e.preventDefault();
    this.send();
  }

  submit() {
    const _a = this.props.authData;
    const authData = _a === void 0 ? {} : _a;
    const _b = this.inputs;
    const { code, password } = _b;
    const username = localStorage.getItem("temp_username") || authData.username;
    if (!Auth || typeof Auth.forgotPasswordSubmit !== "function") {
      throw new Error(
        "No Auth module found, please ensure @aws-amplify/auth is imported"
      );
    }
    Auth.forgotPasswordSubmit(username, code, password)
      .then((data) => {
        logger.debug(data);
        this.setState({
          loading: false,
          delivery: null,
        });
        this.changeState("signIn");
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        return this.error(err);
      });
  }

  submitView() {
    return (
      <Formik
        initialValues={{
          code: "",
          password: "",
        }}
        onSubmit={(values) => {
          const _a = this.props.authData;
          const authData = _a === void 0 ? {} : _a;
          const { code, password } = values;
          const username = localStorage.getItem("temp_username") || authData.username;
          if (!Auth || typeof Auth.forgotPasswordSubmit !== "function") {
            throw new Error(
              "No Auth module found, please ensure @aws-amplify/auth is imported"
            );
          }
          Auth.forgotPasswordSubmit(username, code, password)
            .then((data) => {
              logger.debug(data);
              this.setState({
                loading: false,
                delivery: null,
              });
              this.changeState("signIn");
            })
            .catch((err) => {
              this.setState({
                loading: false,
                resetPasswordError: "Code or Password format error"
              });
              // return this.error(err);
            });
        }}

        validationSchema={Yup.object().shape({
          code: Yup.string().required("Code Field cannot be blank"),
          password: Yup.string().required("Password Field cannot be blank"),
        })}
      >
        {(formProps) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = formProps;
          return (
            <form className="Authentication_forgotpassword_form">
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
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.code && touched.code}
                helperText={errors.code && touched.code ? errors.code : ""}
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

              <div style={{ textAlign: "center", color: "red" }}>
                {this.state.resetPasswordError}
              </div>
              <div className="Authentication_forgotpassword_signin_nav">
                <Button
                  className="Authentication_forgotpassword_signin_nav_button"
                  onClick={(e) => this._onResendCode(e)}
                >
                  Resend Code
                </Button>
                <Button
                  disabled={this.state.loading}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  CONFIRM
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }

  showComponent() {
    // const username = this.getUsernameFromInput();
    return this.state.delivery ? this.submitView() : this.sendView();
  }
}
