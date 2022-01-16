import { LOGIN_PATH, LOGIN_REDIRECTED_PATH } from 'constants/path';

import Error404 from 'pages/Error404';
import Login from 'pages/Login';
import LoginRedirected from 'pages/LoginRedirected';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const LoginRouter = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route
        path={LOGIN_REDIRECTED_PATH}
        element={<LoginRedirected />}
        caseSensitive
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default LoginRouter;
