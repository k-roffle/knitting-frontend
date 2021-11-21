import {
  MY_INFORMATION_ROUTER_ROOT,
  LOGIN_ROUTER_ROOT,
  ERROR_PATH,
} from 'constants/path';

import { ThemeProvider } from '@mui/material/styles';
import CommonSnackbar from 'components/CommonSnackbar';
import { Error404 } from 'pages';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
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

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
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
          <CommonSnackbar />
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
