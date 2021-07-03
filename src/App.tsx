import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { Error404 } from 'pages';
import React from 'react';
import {
  BrowserRouter,
  Route as PublicRoute,
  Route as NestedRoute,
  Switch,
} from 'react-router-dom';
import Designs from 'routers/DesignRouter';
import Login from 'routers/LoginRouter';
import { theme } from 'themes';
import { QueryParamProvider } from 'use-query-params';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryParamProvider ReactRouterRoute={PublicRoute}>
            <Switch>
              <NestedRoute path="/designs/" component={Designs} />
              <NestedRoute path="/login/" component={Login} />
              <PublicRoute path="/error/" component={Error404} exact />
              <PublicRoute path="*" component={Error404} />
            </Switch>
          </QueryParamProvider>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
