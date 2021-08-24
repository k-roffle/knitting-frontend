import { LOGIN_REDIRECTED_PATH, LOGIN_PATH } from 'constants/path';

import Error404 from 'pages/Error404';
import Login from 'pages/Login';
import LoginRedirected from 'pages/LoginRedirected';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginRoute } from 'utils/route';

const LoginRouter = (): React.ReactElement => {
  return (
    <Switch>
      <LoginRoute path={LOGIN_PATH} component={Login} exact strict sensitive />
      <LoginRoute
        path={LOGIN_REDIRECTED_PATH}
        component={LoginRedirected}
        exact
        strict
        sensitive
      />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default LoginRouter;
