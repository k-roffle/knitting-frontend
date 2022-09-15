import CommonSnackbar from 'knitting/components/CommonSnackbar';
import { theme } from 'knitting/themes';
import { RouteWithoutTrailingSlash } from 'knitting/utils/route';

import { Global } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyle from './globalStyles';
import Routers from './routers';

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Global styles={GlobalStyle} />
              <RouteWithoutTrailingSlash />
              <Routers />
            </ThemeProvider>
          </StyledEngineProvider>
          <CommonSnackbar />
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
