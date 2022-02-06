import { LOGIN_REDIRECTED_PATH, LOGIN_PATH } from 'knitting/constants/path';
import Error404 from 'knitting/pages/Error404';
import Login from 'knitting/pages/Login';
import LoginRedirected from 'knitting/pages/LoginRedirected';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginRouter = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={LOGIN_PATH} element={<Login />} caseSensitive />
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
