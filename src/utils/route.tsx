import { LOGIN_PATH, ROOT_PATH } from 'constants/path';

import React from 'react';
import { RouteProps, Route, useLocation, Routes } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

export const ProtectedRoute = (props: RouteProps): React.ReactElement => {
  return isAuthenticated() ? (
    <RouteWithoutTrailigSlash {...props} />
  ) : (
    <RouteWithoutTrailigSlash {...props} path={LOGIN_PATH} />
  );
};

export const LoginRoute = (props: RouteProps): React.ReactElement => {
  return isAuthenticated() ? (
    <RouteWithoutTrailigSlash {...props} path={ROOT_PATH} />
  ) : (
    <RouteWithoutTrailigSlash {...props} />
  );
};

export const RouteWithoutTrailigSlash = (
  props: RouteProps,
): React.ReactElement => {
  const { pathname } = useLocation();
  const pathnameWithoutTrailingSlash = pathname?.replace(/\/$/, '');

  console.log('path', props);
  if (pathname === '/') {
    return (
      <Routes>
        <Route {...props} />
      </Routes>
    );
  }

  return pathname === pathnameWithoutTrailingSlash ? (
    <Routes>
      <Route {...props} />
    </Routes>
  ) : (
    <Routes>
      <Route {...props} path={pathnameWithoutTrailingSlash} />
    </Routes>
  );
};
