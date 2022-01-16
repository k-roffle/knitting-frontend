import { LOGIN_PATH, ROOT_PATH } from 'constants/path';

import React from 'react';
import { RouteProps, useLocation, Navigate } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const location = useLocation();

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to={LOGIN_PATH} state={{ from: location }} replace />
  );
};

export const LoginRoute = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  return isAuthenticated() ? <Navigate to={ROOT_PATH} /> : children;
};

export const RouteWithoutTrailingSlash = (
  props: RouteProps,
): React.ReactElement | null => {
  const location = useLocation();

  if (location.pathname.match('/.*/$')) {
    return (
      <Navigate
        replace
        {...props}
        to={{
          pathname: location.pathname.replace(/\/$/, ''),
          search: location.search,
        }}
      />
    );
  }

  return null;
};
