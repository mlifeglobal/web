import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";

import { Box, Button, Text, TextInput } from "grommet";
import { Previous } from "grommet-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

import { requestPassword, resetPassword } from "./state/actions";

export class ForgotPassword extends React.PureComponent {
  onRequest = values => {
    this.props.requestPassword(values);
  };

  onReset = values => {
    const { password, code } = values;
    this.props.resetPassword({ password, code });
  };

  renderRequest() {
    const { requestStatus, requestError } = this.props.forgotPassword;

    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .required("Required")
        })}
        onSubmit={this.onRequest}
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
          <StyledForm onSubmit={handleSubmit} id="passwordRequestForm">
            <Text margin={{ horizontal: "small" }} textAlign="center">
              Type your email to get the reset code.
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

            <Box direction="column" margin={{ bottom: "small" }} />
            <Button
              primary
              disabled={!dirty || requestStatus === "loading"}
              label="Send Reset Email"
              onClick={handleSubmit}
              margin={{ top: "small" }}
            />

            {requestError && (
              <FormErrorText error={requestError} textAlign="center" />
            )}
          </StyledForm>
        )}
      </Formik>
    );
  }

  renderReset() {
    const { resetStatus, resetError } = this.props.forgotPassword;

    return (
      <Formik
        initialValues={{
          code: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required("Required"),
          password: Yup.string().min(8, "At least 8 characters"),
          /* eslint-disable */
          confirmPassword: Yup.mixed().test(
            "match",
            "Passwords do not match",
            function(password) {
              return password === this.options.parent.password;
            }
          )
          /* eslint-enable */
        })}
        onSubmit={this.onReset}
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
          <StyledForm onSubmit={handleSubmit} id="passwordResetForm">
            <Box direction="row">
              <Button
                icon={<Previous />}
                hoverIndicator
                onClick={() => this.props.resetStep()}
              />
              <Text margin={{ right: "small" }} textAlign="center">
                Use the code sent to your email to reset your password.
              </Text>
            </Box>

            <Box
              fill="horizontal"
              round="small"
              border={{ color: "brand", side: "all" }}
              elevation="small"
              background={{ color: "white" }}
              margin={{ top: "small" }}
            >
              <TextInput
                id="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Reset Code"
                plain
              />
            </Box>
            {errors.code && touched.code && (
              <FormErrorText error={errors.code} />
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
                placeholder="Enter new password"
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
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm password"
                type="password"
                plain
              />
            </Box>
            {// eslint-disable-next-line
            errors.confirmPassword && touched.confirmPassword && (
              <FormErrorText error={errors.confirmPassword} />
            )}

            <Box direction="column" margin={{ bottom: "small" }} />
            <Button
              primary
              disabled={!dirty || resetStatus === "loading"}
              label="Reset Password"
              onClick={handleSubmit}
              margin={{ top: "small" }}
            />

            {resetError && (
              <FormErrorText error={resetError} textAlign="center" />
            )}
          </StyledForm>
        )}
      </Formik>
    );
  }

  render() {
    const { step } = this.props.forgotPassword;
    return (
      <Box
        gap="small"
        margin={{ top: "xlarge" }}
        alignSelf="center"
        pad={{ horizontal: "small", bottom: "small" }}
        width="medium"
        round="medium"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Helmet title="Forgot Password" />

        {step === 0 ? this.renderRequest() : this.renderReset()}

        <Button
          label="Back to log in"
          onClick={() => this.props.changeRoute("/auth/login")}
        />
      </Box>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  requestPassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    forgotPassword: state.forgotPassword
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeRoute: route => dispatch(push(route)),
    requestPassword: payload => dispatch(requestPassword(payload)),
    resetPassword: payload => dispatch(resetPassword(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
