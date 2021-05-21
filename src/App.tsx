import { StylesProvider } from '@material-ui/core/styles';
import { Error404 } from 'pages';
import Designs from 'pages/Designs';
import Login from 'pages/Login';
import React from 'react';
import {
  BrowserRouter,
  Route as PublicRoute,
  Route as NestedRoute,
  Switch,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <QueryParamProvider ReactRouterRoute={PublicRoute}>
          <Switch>
            <NestedRoute path="/login/" component={Login} />
            <NestedRoute path="/designs/" component={Designs} />
            <PublicRoute path="/error/" component={Error404} exact />
            <PublicRoute path="*" component={Error404} />
          </Switch>
        </QueryParamProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
