import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Route } from "react-router-dom";
import ConnectedSwitch from "components/ConnectedSwitch";

import { push } from "connected-react-router";
import { Box } from "grommet";

import Sidebar from "components/Sidebar";
import Home from "containers/Home";
import Surveys from "containers/Surveys";
// import SurveyEdit from "containers/SurveyEdit/Loadable";
// import ParticipantData from "containers/ParticipantData";

import { logout } from "containers/App/state/actions";

export class Dashboard extends React.PureComponent {
  state = {
    activeTopLink: "home"
  };

  componentWillReceiveProps(nextProps) {
    const {
      data: { jwt }
    } = nextProps.auth;
    if (!jwt) {
      nextProps.changeRoute("/auth/login");
    }
  }

  onSidebarClick = (link, to) => {
    if (link === "logout") {
      this.props.logout();
    } else {
      this.setState({ activeTopLink: link });
      this.props.changeRoute(to);
    }
  };

  render() {
    const sidebarTopLinks = [
      {
        id: "home",
        display: "Home",
        to: "/"
      },
      {
        id: "surveys",
        display: "Surveys",
        to: "/surveys"
      },
      {
        id: "data",
        display: "Data Points",
        to: "/data"
      }
    ];

    const sidebarBottomLinks = [
      {
        id: "filler",
        display: "Go to filler",
        to: "/filler"
      },
      {
        id: "logout",
        display: "Logout"
      }
    ];

    return (
      <Box direction="row" fill>
        <Helmet title="Dashboard" />
        <Sidebar
          activeTopLink={this.state.activeTopLink}
          topLinks={sidebarTopLinks}
          bottomLinks={sidebarBottomLinks}
          onClick={this.onSidebarClick}
        />
        <ConnectedSwitch>
          <Route exact path="/" component={Home} />
          <Route exact path="/surveys" component={Surveys} />
          <Route exact path="/surveys/edit" component={Home} />
          <Route exact path="/data" render={() => <p>Data Points</p>} />
        </ConnectedSwitch>
      </Box>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    dashboard: state.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    changeRoute: route => dispatch(push(route))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
