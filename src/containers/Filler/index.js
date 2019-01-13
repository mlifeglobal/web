import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import ConnectedSwitch from "components/ConnectedSwitch";

import { Box, Heading, Text, Button } from "grommet";

import ParticipantAuth from "./pages/ParticipantAuth";
import OptInChecker from "./pages/OptInChecker";
import QuestionsDisplay from "./pages/QuestionDisplay";

import { fillerLogout } from "./state/actions";

export class Filler extends React.Component {
  componentWillMount() {
    const {
      data: { phone },
      survey: { surveyId }
    } = this.props.filler;

    if (!phone) {
      this.props.changeRoute("/filler/auth");
    } else if (!surveyId) {
      this.props.changeRoute("/filler/optin");
    } else {
      this.props.changeRoute("/filler/survey");
    }
  }

  onFillerLogout = () => {
    this.props.fillerLogout();
    this.props.changeRoute("/filler/auth");
  };

  render() {
    const {
      data: { phone }
    } = this.props.filler;

    return (
      <>
        <Helmet title="Survey Filler" />
        {phone && (
          <Box pad={{ top: "small", right: "small" }} alignSelf="end">
            <Button
              onClick={this.onFillerLogout}
              label={
                <Text size="large">
                  {phone} <br /> Logout
                </Text>
              }
            />
          </Box>
        )}
        <Box fill margin={{ top: "xlarge" }} align="center">
          {!phone && <Heading level="2">Welcome to Web Survey Filler</Heading>}
          <ConnectedSwitch>
            <Route exact path="/filler/auth" component={ParticipantAuth} />
            <Route exact path="/filler/optin" component={OptInChecker} />
            <Route exact path="/filler/survey" component={QuestionsDisplay} />
          </ConnectedSwitch>
        </Box>
      </>
    );
  }
}

Filler.propTypes = {
  filler: PropTypes.object.isRequired,
  fillerLogout: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    filler: state.filler
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fillerLogout: () => dispatch(fillerLogout()),
    changeRoute: route => dispatch(push(route))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filler);
