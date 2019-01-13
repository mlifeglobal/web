import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Box, Button, Text, TextInput } from "grommet";
import { Formik } from "formik";
import * as Yup from "yup";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

import { optInSurvey } from "../../state/actions";

export class OptInChecker extends React.Component {
  onSubmit = values => {
    this.props.optInSurvey(values);
  };

  render() {
    const { error, loading } = this.props.filler;
    return (
      <Box
        gap="small"
        pad={{ horizontal: "small" }}
        width="medium"
        round="medium"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Helmet title="Opt into survey" />
        <Formik
          initialValues={{ code: "" }}
          validationSchema={Yup.object().shape({
            code: Yup.string().required("Required")
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
                Enter valid opt in code to start filling the survey.
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
                  id="code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter valid Opt In code"
                  plain
                />
              </Box>
              {errors.code && touched.code && (
                <FormErrorText error={errors.code} />
              )}
              <Box
                direction="column"
                margin={{ top: "small" }}
                justify="center"
              >
                <Button
                  disabled={!dirty || loading}
                  primary
                  label="Submit"
                  onClick={handleSubmit}
                />
              </Box>
              <Box
                direction="column"
                margin={{ vertical: "xsmall" }}
                justify="center"
              >
                {error && <FormErrorText error={error} textAlign="center" />}
              </Box>
            </StyledForm>
          )}
        </Formik>
      </Box>
    );
  }
}

OptInChecker.propTypes = {
  filler: PropTypes.object.isRequired,
  optInSurvey: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    filler: state.filler
  };
}
function mapDispatchToProps(dispatch) {
  return {
    optInSurvey: payload => dispatch(optInSurvey(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptInChecker);
