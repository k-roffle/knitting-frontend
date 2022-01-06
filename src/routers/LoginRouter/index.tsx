import { LOGIN_REDIRECTED_PATH, LOGIN_PATH } from 'knitting/constants/path';
import Error404 from 'knitting/pages/Error404';
import Login from 'knitting/pages/Login';
import LoginRedirected from 'knitting/pages/LoginRedirected';
import { LoginRoute } from 'knitting/utils/route';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
