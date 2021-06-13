import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { Auth, Error404, Login } from 'pages';
import Designs from 'pages/Designs';
import React from 'react';
import {
  BrowserRouter,
  Route as PublicRoute,
  Route as NestedRoute,
  Switch,
} from 'react-router-dom';
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
              <PublicRoute path="/login/" component={Login} />
              <PublicRoute path="/error/" component={Error404} exact />
              <PublicRoute path="/auth/" component={Auth} />
              <PublicRoute path="*" component={Error404} />
            </Switch>
          </QueryParamProvider>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
