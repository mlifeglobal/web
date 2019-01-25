import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Box, Button, Text, TextInput, TextArea } from "grommet";
import { Formik } from "formik";
import * as Yup from "yup";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

import { sendBulkMsg } from "./state/actions";

export class BulkMsg extends React.Component {
  onSubmit = values => {
    const { phones, message = "", incentive = "" } = values;
    console.log({ phones, message, incentive });
    this.props.sendBulkMsg({ phones, message, incentive });
  };

  render() {
    const { loading, error } = this.props.bulkMsg;
    return (
      <Box fill pad={{ top: "xlarge" }}>
        <Box
          width="large"
          gap="small"
          pad={{ horizontal: "small" }}
          round="medium"
          alignSelf="center"
          border={{ color: "brand", side: "all" }}
          elevation="small"
          background={{ color: "white" }}
        >
          <Helmet title="Bulk Messaging" />
          <Formik
            initialValues={{ phones: "", message: "" }}
            validationSchema={Yup.object().shape({
              phones: Yup.string().required("Required"),
              message: Yup.string(),
              incentive: Yup.string()
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
                  Enter comma separated phone numbers and message content or
                  incentive amount. If you want to send message only, ignore
                  incentive and do otherwise if you want to send incentives
                  only.
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
                    id="phones"
                    value={values.phones}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter comma separated phone numbers ..."
                    plain
                  />
                </Box>
                {errors.phones && touched.phones && (
                  <FormErrorText error={errors.phones} />
                )}

                <Box
                  fill="horizontal"
                  round="small"
                  border={{ color: "brand", side: "all" }}
                  elevation="small"
                  background={{ color: "white" }}
                  margin={{ top: "small" }}
                >
                  <TextArea
                    id="message"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter message content ..."
                    type="message"
                    plain
                  />
                </Box>
                {errors.message && touched.message && (
                  <FormErrorText error={errors.message} />
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
                    id="incentive"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter incentive amount (e.g.: 'KES 20')"
                    type="incentive"
                    plain
                  />
                </Box>
                {errors.incentive && touched.incentive && (
                  <FormErrorText error={errors.incentive} />
                )}

                <Button
                  primary
                  disabled={!dirty || loading}
                  label="Send"
                  onClick={handleSubmit}
                  margin={{ top: "small" }}
                />
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
      </Box>
    );
  }
}

BulkMsg.propTypes = {
  bulkMsg: PropTypes.object.isRequired,
  sendBulkMsg: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    bulkMsg: state.bulkMsg
  };
}
function mapDispatchToProps(dispatch) {
  return {
    sendBulkMsg: (payload = {}) => dispatch(sendBulkMsg(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkMsg);
