import {
  MY_INFORMATION_ROUTER_ROOT,
  LOGIN_ROUTER_ROOT,
  ERROR_PATH,
} from 'constants/path';

import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import CommonSnackbar from 'components/CommonSnackbar';
import { Error404 } from 'pages';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Routes } from 'react-router-dom';
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
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <QueryParamProvider ReactRouterRoute={PublicRoute}>
                <Routes>
                  <NestedRoute
                    path={MY_INFORMATION_ROUTER_ROOT}
                    element={<MyInformation />}
                  />
                  <NestedRoute path={LOGIN_ROUTER_ROOT} element={<Login />} />
                  <PublicRoute
                    path={ERROR_PATH}
                    element={<Error404 />}
                    caseSensitive
                  />
                  <PublicRoute path="*" element={<Error404 />} />
                </Routes>
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
