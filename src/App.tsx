import { Global } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CommonSnackbar from 'knitting/components/CommonSnackbar';
import {
  MY_INFORMATION_ROUTER_ROOT,
  LOGIN_ROUTER_ROOT,
  ERROR_PATH,
  PRODUCT_DETAIL_PATH,
} from 'knitting/constants/path';
import GlobalStyle from 'knitting/globalStyles';
import { Error404 } from 'knitting/pages';
import Login from 'knitting/routers/LoginRouter';
import MyInformation from 'knitting/routers/MyInformationRouter';
import Product from 'knitting/routers/ProductRouter';
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
          <ThemeProvider theme={theme}>
            <QueryParamProvider ReactRouterRoute={PublicRoute}>
              <Global styles={GlobalStyle} />
              <Switch>
                <NestedRoute
                  path={MY_INFORMATION_ROUTER_ROOT}
                  component={MyInformation}
                />
                <NestedRoute path={LOGIN_ROUTER_ROOT} component={Login} />
                <NestedRoute path={PRODUCT_DETAIL_PATH} component={Product} />
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
