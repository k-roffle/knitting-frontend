import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import CommonSnackbar from 'knitting/components/CommonSnackbar';
import {
  MY_INFORMATION_ROUTER_ROOT,
  LOGIN_ROUTER_ROOT,
  ERROR_PATH,
} from 'knitting/constants/path';
import { Error404 } from 'knitting/pages';
import Login from 'knitting/routers/LoginRouter';
import MyInformation from 'knitting/routers/MyInformationRouter';
import { theme } from 'knitting/themes';
import {
  RouteWithoutTrailigSlash as PublicRoute,
  RouteWithoutTrailigSlash as NestedRoute,
} from 'knitting/utils/route';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryParamProvider } from 'use-query-params';

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
