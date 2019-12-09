import React from 'react';
import { bool, string, elementType } from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';

import routes from 'constants/routesPaths';

const PrivateRoute = ({ authenticated, ...route }) => {
  const location = useLocation();

  return authenticated ? (
    <Route {...route} />
  ) : (
    <Redirect
      to={{
        pathname: routes.login,
        state: { from: location }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: elementType.isRequired,
  path: string.isRequired,
  authenticated: bool.isRequired,
  exact: bool
};

export default PrivateRoute;
