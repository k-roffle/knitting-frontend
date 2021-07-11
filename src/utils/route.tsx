import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

export const ProtectedRoute = (props: RouteProps): React.ReactElement => {
  return isAuthenticated() ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login/',
      }}
    />
  );
};

export const LoginRoute = (props: RouteProps): React.ReactElement => {
  return isAuthenticated() ? (
    <Redirect
      to={{
        pathname: '/designs/create/',
      }}
    />
  ) : (
    <Route {...props} />
  );
};
