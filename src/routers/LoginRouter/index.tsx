import Error404 from 'pages/Error404';
import Login from 'pages/Login';
import LoginRedirected from 'pages/LoginRedirected';
import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

const LoginRouter = ({
  match: { url },
}: RouteComponentProps): React.ReactElement => {
  return (
    <Switch>
      <Route path={`${url}/`} component={Login} exact />
      <Route path={`${url}/redirected/`} component={LoginRedirected} exact />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default LoginRouter;
