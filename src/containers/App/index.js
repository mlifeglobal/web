import React, { Component } from "react";
import { connect } from "react-redux";
import { Grommet, Box, Heading } from "grommet";
import Helmet from "react-helmet";
import { push } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components/RouteHOCs";

import theme from "utils/theme";

import Header from "components/Header";
import Login from "containers/Login";
import SignUp from "containers/SignUp";
import ForgotPassword from "containers/ForgotPassword";

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <Grommet theme={theme} full>
        <Helmet
          titleTemplate="%s - Mlife"
          defaultTitle="Mlife"
          meta={[{ name: "description", content: "Mlife Dashboard" }]}
        />
        <Box direction="column" fill background={{ color: "grey" }}>
          <Header onClick={() => this.props.pushRoute("/")} />
          <Switch>
            <Route path="/filler" component={() => <Heading>Filler</Heading>} />

            <PublicRoute
              exact
              auth={auth}
              path="/auth/login"
              component={Login}
            />
            <PublicRoute
              exact
              auth={auth}
              path="/auth/signup"
              component={SignUp}
            />
            <PublicRoute
              exact
              auth={auth}
              path="/auth/forgot"
              component={ForgotPassword}
            />

            <PrivateRoute
              auth={auth}
              path="/"
              component={() => <Heading>Dashboard</Heading>}
            />

            <Route component={() => <Heading>Not Found</Heading>} />
          </Switch>
        </Box>
      </Grommet>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    location: state.router.location
  };
}
function mapDispatchToProps(dispatch) {
  return {
    pushRoute: route => dispatch(push(route))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
