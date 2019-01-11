import React, { Component } from "react";
import { Grommet, Box, Heading } from "grommet";
import Helmet from "react-helmet";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/Header";

import theme from "../../utils/theme";

class App extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <Helmet
          titleTemplate="%s - Mlife"
          defaultTitle="Mlife"
          meta={[{ name: "description", content: "Mlife Dashboard" }]}
        />
        <Box direction="column" fill background={{ color: "grey" }}>
          <Header onClick={() => this.props.changeRoute("/")} />
          <Switch>
            <Route
              exact
              path="/auth/login"
              component={() => <Heading>Login</Heading>}
            />
            <Route
              exact
              path="/auth/signup"
              component={() => <Heading>SignUp</Heading>}
            />
            <Route
              exact
              path="/auth/forgot"
              component={() => <Heading>Forgot Password</Heading>}
            />

            <Route path="/filler" component={() => <Heading>Filler</Heading>} />

            <PrivateRoute
              auth={{ data: { jwt: "dakjd" } }}
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

export default App;
