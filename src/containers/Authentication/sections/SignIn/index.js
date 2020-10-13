import React from "react";
import { SignIn } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import { TextField, Button, Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Formik } from "formik";
import * as Yup from "yup";

import "./styles.scss";

export default class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedUp", "signedOut"];
    this.signUpFields = ["email", "password", "phone_number"];

    this._googleSignIn = this._googleSignIn.bind(this);
    this.state = {
      loginError: ''
    }
  }

  _googleSignIn(e) {
    e.preventDefault();
    Auth.federatedSignIn({ provider: "Google" });
  }

  showComponent() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}

        onSubmit={(values) => {
          // TODO: Just function working, think about error handle      
          Auth.signIn(values.email, values.password)
            .then((res)=>{
            })
            .catch(e=> {
              console.log(e)
              this.setState({
                loginError: e.message
              })
            })  
        }}

        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Please enter correct email address")
            .required("Required"),
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
            handleSubmit
          } = formProps;
          return (
            <div className="Authentication_signin_form">
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
                  value={values.password}
                  placeholder="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
                
                <div className="Authentication_login_error">{this.state.loginError}</div>

                <div className="Authentication_remember_forgetpassword_wrapper">
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={()=>{console.log('helo')}}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                  </div>

                  <div className="Authentication_signin_forgotpassword_nav">
                    <button
                      onClick={() => this.changeState("forgotPassword")}
                      className="Authentication_signin_forgotpassword_nav_button"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>

                <Button
                  fullWidth
                  disabled={this.state.loading}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  
                >
                  Login
                </Button>
              </form>

              <div className="Authentication_signin_signup_nav">
                <span>Don&apos;t have an account? </span>
                <Button
                  onClick={() => this.changeState("signUp")}
                  className="Authentication_signin_signup_nav_button"
                >
                  Sign Up
                </Button>
              </div>

              <div className="Authentication_google_signin_wrapper">
              <button
                onClick={(e) => this._googleSignIn(e)}
                className="Authentication_google_signin_button"
              >
                <div className="Authentication_google_signin_icon">
                  <svg
                    width="86"
                    height="86"
                    viewBox="0 0 86 86"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d)">
                      <rect
                        x="10.1733"
                        y="8.8252"
                        width="65.1511"
                        height="65.1511"
                        rx="32.5755"
                        fill="white"
                      />
                    </g>
                    <path
                      d="M56.903 58.1326C53.0874 61.3553 48.1374 63.4006 42.7491 63.4006C34.7311 63.4006 27.6927 58.9834 23.8772 52.5381L25.3057 45.9534L31.6374 44.778C33.1069 49.5216 37.5412 53.0022 42.7491 53.0022C45.2755 53.0022 47.6217 52.203 49.5553 50.785L55.6397 51.7131L56.903 58.1326Z"
                      fill="#59C36A"
                    />
                    <path
                      d="M56.9029 58.1327L55.6396 51.7132L49.5553 50.785C47.6217 52.203 45.2755 53.0022 42.749 53.0022V63.4007C48.1374 63.4007 53.0873 61.3553 56.9029 58.1327Z"
                      fill="#00A66C"
                    />
                    <path
                      d="M31.1475 41.4007C31.1475 42.5865 31.3279 43.7209 31.6373 44.778L23.8771 52.5382C21.9436 49.2897 20.749 45.474 20.749 41.4007C20.749 37.3272 21.9436 33.5116 23.8771 30.2632L30.1053 31.3351L31.6373 38.0233C31.3279 39.0803 31.1475 40.2147 31.1475 41.4007Z"
                      fill="#FFDA2D"
                    />
                    <path
                      d="M64.749 41.4006C64.749 48.1037 61.6468 54.1108 56.9029 58.1327L49.5553 50.785C51.0505 49.7021 52.3139 48.2584 53.1389 46.5569H42.749C42.0271 46.5569 41.46 45.9896 41.46 45.2678V37.5334C41.46 36.8115 42.0271 36.2444 42.749 36.2444H63.099C63.7178 36.2444 64.2592 36.6826 64.3623 37.3013C64.6201 38.642 64.749 40.0341 64.749 41.4006Z"
                      fill="#4086F4"
                    />
                    <path
                      d="M53.139 46.5569C52.314 48.2584 51.0505 49.7021 49.5554 50.785L56.9029 58.1327C61.6468 54.1108 64.749 48.1038 64.749 41.4006C64.749 40.0341 64.6201 38.642 64.3622 37.3013C64.2592 36.6826 63.7177 36.2444 63.0989 36.2444H42.749V46.5569H53.139Z"
                      fill="#4175DF"
                    />
                    <path
                      d="M57.2639 25.5451C57.2897 25.906 57.135 26.2413 56.903 26.499L51.3858 31.9904C50.9476 32.4545 50.2257 32.506 49.7101 32.1193C47.6732 30.5983 45.2756 29.7991 42.7491 29.7991C37.5412 29.7991 33.1069 33.2795 31.6374 38.0233L23.8772 30.2631C27.6927 23.8178 34.7311 19.4006 42.7491 19.4006C47.8795 19.4006 52.8811 21.2913 56.7999 24.5912C57.0835 24.8233 57.2381 25.1841 57.2639 25.5451Z"
                      fill="#FF641A"
                    />
                    <path
                      d="M49.71 32.1193C50.2256 32.5061 50.9474 32.4545 51.3857 31.9904L56.9029 26.499C57.135 26.2413 57.2897 25.9061 57.2638 25.5451C57.2379 25.1841 57.0833 24.8233 56.7997 24.5912C52.8811 21.2913 47.8795 19.4006 42.749 19.4006V29.7991C45.2755 29.7991 47.6732 30.5983 49.71 32.1193Z"
                      fill="#F03800"
                    />
                    <defs>
                      <filter
                        id="filter0_d"
                        x="0.17334"
                        y="0.825195"
                        width="85.1511"
                        height="85.1511"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="5" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.0317495 0 0 0 0 0.151 0 0 0 0 0.349751 0 0 0 0.15 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </button>
              <div className="Authentication_google_signin_text">
                Google SignIn
              </div>
              </div>
              
            </div>
          );
        }}
      </Formik>
    );
  }
}
