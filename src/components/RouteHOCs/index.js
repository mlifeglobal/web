import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

function PublicRoute({
  auth: { data: { jwt } = {} } = {},
  component: WrappedComponent,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={wrappedProps =>
        jwt ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: wrappedProps.location }
            }}
          />
        ) : (
          <WrappedComponent {...wrappedProps} />
        )
      }
    />
  );
}

function PrivateRoute({
  auth: { data: { jwt } = {} } = {},
  component: WrappedComponent,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={wrappedProps =>
        jwt ? (
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

const requiredPropTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

PublicRoute.propTypes = requiredPropTypes;
PrivateRoute.propTypes = requiredPropTypes;

export { PrivateRoute, PublicRoute };
