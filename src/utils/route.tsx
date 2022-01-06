import { LOGIN_PATH, ROOT_PATH } from 'knitting/constants/path';
import { isAuthenticated } from 'knitting/utils/auth';
import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = (props: RouteProps): React.ReactElement => {
  return isAuthenticated() ? (
    <RouteWithoutTrailigSlash {...props} />
  ) : (
    <Redirect
      to={{
        pathname: LOGIN_PATH,
      }}
    />
  );
};

export const LoginRoute = (props: RouteProps): React.ReactElement => {
  return isAuthenticated() ? (
    <Redirect
      to={{
        pathname: ROOT_PATH,
      }}
    />
  ) : (
    <RouteWithoutTrailigSlash {...props} />
  );
};

export const RouteWithoutTrailigSlash = (
  props: RouteProps,
): React.ReactElement => {
  const pathname = props.location?.pathname;
  const pathnameWithoutTrailingSlash = pathname?.replace(/\/$/, '');

  if (pathname === '/') {
    return <Route {...props} />;
  }

  return pathname === pathnameWithoutTrailingSlash ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: pathnameWithoutTrailingSlash,
      }}
    />
  );
};
