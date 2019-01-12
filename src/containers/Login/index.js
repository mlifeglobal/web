import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";

import { Box, Button, Text, TextInput } from "grommet";
import { Formik } from "formik";
import * as Yup from "yup";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

import { loginSubmit } from "./state/actions";

export class Login extends Component {
  onSubmit = values => {
    this.props.loginSubmit(values);
  };

  render() {
    const { loginError, isLoading } = this.props.auth;
    return (
      <Box
        gap="small"
        margin={{ top: "xlarge" }}
        pad={{ horizontal: "small" }}
        width="medium"
        round="medium"
        alignSelf="center"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Helmet title="Login" />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("Required"),
            password: Yup.string().min(8, "At least 8 characters")
          })}
          onSubmit={this.onSubmit}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Text margin={{ horizontal: "xsmall" }} textAlign="center">
                Enter your client credentials to proceed.
              </Text>
              <Box
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small" }}
              >
                <TextInput
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  plain
                />
              </Box>
              {errors.email && touched.email && (
                <FormErrorText error={errors.email} />
              )}
              <Box
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small" }}
              >
                <TextInput
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  type="password"
                  plain
                />
              </Box>
              {errors.password && touched.password && (
                <FormErrorText error={errors.password} />
              )}

              <Box
                direction="row"
                fill="horizontal"
                justify="between"
                margin={{ vertical: "small" }}
                pad={{ left: "small", right: "xsmall" }}
              >
                <Button
                  disabled={isLoading}
                  onClick={() => this.props.pushRoute("/auth/forgot")}
                >
                  <Box
                    direction="row"
                    align="center"
                    justify="center"
                    gap="small"
                  >
                    <Text size="small" color="darkestGrey">
                      Forgot <br /> Password?
                    </Text>
                  </Box>
                </Button>
                <Box direction="row" justify="end" gap="small">
                  <Button
                    disabled={isLoading}
                    label="Sign Up"
                    onClick={() => this.props.pushRoute("/auth/signup")}
                  />
                  <Button
                    primary
                    disabled={isLoading}
                    label="Log In"
                    onClick={handleSubmit}
                  />
                </Box>
              </Box>
              <Button
                label="Go to Survey Filler"
                onClick={() => this.props.pushRoute("/filler")}
              />
              <Box
                direction="column"
                margin={{ vertical: "xsmall" }}
                justify="center"
              >
                {loginError && (
                  <FormErrorText error={loginError} textAlign="center" />
                )}
              </Box>
            </StyledForm>
          )}
        </Formik>
      </Box>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginSubmit: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loginSubmit: payload => dispatch(loginSubmit(payload)),
    pushRoute: route => dispatch(push(route))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
