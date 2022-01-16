import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CommonSnackbar from 'knitting/components/CommonSnackbar';
import {
  MY_INFORMATION_ROUTER_ROOT,
  LOGIN_ROUTER_ROOT,
  ERROR_PATH,
  ROUTER_PATH,
} from 'knitting/constants/path';
import { Error404 } from 'knitting/pages';
import Login from 'knitting/routers/LoginRouter';
import MyInformation from 'knitting/routers/MyInformationRouter';
import { theme } from 'knitting/themes';
import {
  LoginRoute,
  ProtectedRoute,
  RouteWithoutTrailingSlash,
} from 'knitting/utils/route';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <RouteWithoutTrailingSlash />
              <Routes>
                <Route
                  path={MY_INFORMATION_ROUTER_ROOT + ROUTER_PATH}
                  element={
                    <ProtectedRoute>
                      <MyInformation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={LOGIN_ROUTER_ROOT + ROUTER_PATH}
                  element={
                    <LoginRoute>
                      <Login />
                    </LoginRoute>
                  }
                />
                <Route path={ERROR_PATH} element={<Error404 />} caseSensitive />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </ThemeProvider>
          </StyledEngineProvider>
          <CommonSnackbar />
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
