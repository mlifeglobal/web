import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Box, Text, Button, Select } from "grommet";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

// import { fetchSurveys } from "containers/SurveyList/actions";

export class ExportData extends React.PureComponent {
  /* componentDidMount() {
    const { data: surveys } = this.props.surveys;
    if (!surveys || surveys.length <= 0) {
      this.props.fetchSurveys({ offset: 0, limit: -1 });
    }
  } */

  onSubmit = values => {
    console.log("here");
    console.log(values);
  };

  render() {
    /* const { loading, data: surveys } = this.props.surveys;

    let surveyOptions = [];
    if (surveys) {
      surveyOptions = surveys.map(survey => ({
        value: survey.id,
        label: survey.name
      }));
    } */

    const surveyOptions = [];
    for (let i = 1; i <= 10; i += 1) {
      surveyOptions.push({
        lab: `option ${i}`,
        val: i,
        dis: i % 5 === 0,
        sel: i % 13 === 0
      });
    }

    return (
      <Box fill align="center" gap="xsmall" margin="xsmall">
        <Helmet title="Export Data" />

        <Formik
          initialValues={{ surveys: [] }}
          validationSchema={Yup.object().shape({
            surveys: Yup.array()
              .min(1, "No surveys selected")
              .required("Required")
          })}
          onSubmit={this.onSubmit}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleSubmit,
            handleBlur,
            setFieldValue
          }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Text textAlign="center">Choose surveys to filter by.</Text>
              <Field
                component={() => (
                  <Select
                    placeholder="Select"
                    multiple
                    options={surveyOptions}
                    value={values.surveys}
                    disabledKey="dis"
                    labelKey="lab"
                    valueKey="val"
                    onBlur={handleBlur}
                    onChange={value => setFieldValue("surveys", value)}
                  />
                )}
                name="surveys"
              />
              {errors.surveys && touched.surveys && (
                <FormErrorText error={errors.surveys} />
              )}

              {values.surveys.length > 0 && <p>test</p>}

              <Button
                primary
                disabled={!dirty || isSubmitting}
                label="Download"
                onClick={handleSubmit}
              />
            </StyledForm>
          )}
        </Formik>
      </Box>
    );
  }
}

ExportData.propTypes = {
  // surveys: PropTypes.object.isRequired,
  // fetchSurveys: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
    // surveys: state.surveys
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // fetchSurveys: data => dispatch(fetchSurveys(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportData);
