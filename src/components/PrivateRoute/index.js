import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  const { auth, component: WrappedComponent, ...rest } = props;
  return (
    <Route
      {...rest}
      render={wrappedProps =>
        auth && auth.data && auth.data.jwt ? (
          <WrappedComponent {...wrappedProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: wrappedProps.location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

export default PrivateRoute;
