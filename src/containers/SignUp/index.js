import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";

import { Box, Button, TextInput, Text } from "grommet";
import { Formik } from "formik";
import * as Yup from "yup";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

import { signUpSubmit } from "./state/actions";

export class SignUp extends React.PureComponent {
  onSubmit = values => {
    this.props.signUpSubmit(values);
  };

  render() {
    const { signupError, loading } = this.props.auth;
    return (
      <Box
        gap="small"
        margin={{ top: "xlarge" }}
        pad={{ horizontal: "small" }}
        alignSelf="center"
        width="medium"
        round="medium"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Helmet title="Sign Up" />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            clientCode: ""
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email")
              .required("Required"),
            password: Yup.string().min(8, "At least 8 characters"),
            clientCode: Yup.string().required("Required")
          })}
          onSubmit={this.onSubmit}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Text margin={{ horizontal: "xsmall" }} textAlign="center">
                Provide your information to sign up.
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
                  id="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your first name"
                  plain
                />
              </Box>
              {// eslint-disable-next-line
              errors.firstName && touched.firstName && (
                <FormErrorText error={errors.firstName} />
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
                  id="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your last name"
                  plain
                />
              </Box>
              {errors.lastName && touched.lastName && (
                <FormErrorText error={errors.lastName} />
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
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small" }}
              >
                <TextInput
                  id="clientCode"
                  value={values.clientCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your client code"
                  plain
                />
              </Box>
              {// eslint-disable-next-line
              errors.clientCode && touched.clientCode && (
                <FormErrorText error={errors.clientCode} />
              )}

              <Box
                direction="row"
                fill="horizontal"
                justify="between"
                margin={{ top: "small" }}
                pad={{ horizontal: "xsmall" }}
              >
                <Button
                  disabled={loading}
                  label="Log In"
                  onClick={() => this.props.changeRoute("/auth/login")}
                />
                <Button
                  primary
                  disabled={!dirty || loading}
                  label="Sign Up"
                  onClick={handleSubmit}
                />
              </Box>
              <Box
                direction="column"
                margin={{ vertical: "xsmall" }}
                justify="center"
              >
                {signupError && (
                  <FormErrorText error={signupError} textAlign="center" />
                )}
              </Box>
            </StyledForm>
          )}
        </Formik>
      </Box>
    );
  }
}

SignUp.propTypes = {
  auth: PropTypes.object.isRequired,
  signUpSubmit: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUpSubmit: payload => dispatch(signUpSubmit(payload)),
    changeRoute: route => dispatch(push(route))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
