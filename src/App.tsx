import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { Error404, Login, LoginRedirected } from 'pages';
import React from 'react';
import {
  BrowserRouter,
  Route as PublicRoute,
  Route as NestedRoute,
  Switch,
} from 'react-router-dom';
import Designs from 'routers/DesignRouter';
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
              <PublicRoute path="/login/" component={Login} exact={true} />
              <PublicRoute
                path="/login/redirected"
                component={LoginRedirected}
                exact={true}
              />
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
