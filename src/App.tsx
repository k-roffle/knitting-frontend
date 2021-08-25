import {
  MY_INFORMATION_ROUTER_ROOT,
  LOGIN_ROUTER_ROOT,
  ERROR_PATH,
} from 'constants/path';

import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import CommonSnackbar from 'components/CommonSnackbar';
import { Error404 } from 'pages';
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from 'routers/LoginRouter';
import MyInformation from 'routers/MyInformationRouter';
import { theme } from 'themes';
import { QueryParamProvider } from 'use-query-params';
import {
  RouteWithoutTrailigSlash as PublicRoute,
  RouteWithoutTrailigSlash as NestedRoute,
} from 'utils/route';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <QueryParamProvider ReactRouterRoute={PublicRoute}>
              <Switch>
                <NestedRoute
                  path={MY_INFORMATION_ROUTER_ROOT}
                  component={MyInformation}
                />
                <NestedRoute path={LOGIN_ROUTER_ROOT} component={Login} />
                <PublicRoute
                  path={ERROR_PATH}
                  component={Error404}
                  exact
                  strict
                  sensitive
                />
                <PublicRoute path="*" component={Error404} />
              </Switch>
            </QueryParamProvider>
          </ThemeProvider>
        </StylesProvider>
        <CommonSnackbar />
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
