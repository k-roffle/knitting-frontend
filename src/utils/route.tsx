import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

export const ProtectedRoute = (props: RouteProps): React.ReactElement => {
  return isAuthenticated() ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
};
