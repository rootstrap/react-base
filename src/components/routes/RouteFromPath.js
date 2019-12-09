import React from 'react';
import { Route } from 'react-router-dom';
import { elementType, bool } from 'prop-types';

import PrivateRoute from './PrivateRoute';

const RouteFromPath = ({ needsAuth, ...route }) =>
  needsAuth ? <PrivateRoute {...route} /> : <Route {...route} />;

RouteFromPath.propTypes = {
  component: elementType.isRequired,
  needsAuth: bool
};

export default RouteFromPath;
