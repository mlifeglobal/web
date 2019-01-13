import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Box, Button, Text } from "grommet";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

import { authenticateFiller } from "../../state/actions";

export class ParticipantAuth extends React.Component {
  state = {
    phone: "",
    error: ""
  };

  onChange = value => {
    const phone = value;
    const error = phone ? "" : "Required";

    this.setState({ phone, error });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.authenticateFiller({ phone: this.state.phone });
  };

  render() {
    const { phone, error } = this.state;
    const { error: fillerError } = this.props.filler;

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
        <Helmet title="Filler Auth" />
        <StyledForm onSubmit={this.onSubmit}>
          <Text
            margin={{ horizontal: "xsmall", bottom: "xsmall" }}
            textAlign="center"
          >
            Enter your phone number with country code to start filling surveys
            and getting incentives.
          </Text>
          <Box
            direction="column"
            margin={{ top: "small", bottom: "xsmall", horizontal: "small" }}
            justify="center"
          >
            <PhoneInput
              placeholder="Enter phone number"
              country="CA"
              value={phone}
              onChange={this.onChange}
            />
            {error && <FormErrorText error={error} />}
          </Box>
          <Box
            direction="column"
            margin={{ top: "small", bottom: "xsmall" }}
            justify="center"
          >
            <Button
              primary
              disabled={false}
              label="Proceed"
              onClick={this.onSubmit}
            />
          </Box>
          <Box
            direction="column"
            margin={{ vertical: "xsmall" }}
            justify="center"
          >
            {fillerError && (
              <FormErrorText error={fillerError} textAlign="center" />
            )}
          </Box>
        </StyledForm>
      </Box>
    );
  }
}

ParticipantAuth.propTypes = {
  filler: PropTypes.object.isRequired,
  authenticateFiller: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    filler: state.filler
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authenticateFiller: payload => dispatch(authenticateFiller(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantAuth);
