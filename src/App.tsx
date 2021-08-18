import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import CommonSnackbar from 'components/CommonSnackbar';
import { Error404 } from 'pages';
import React from 'react';
import {
  BrowserRouter,
  Route as PublicRoute,
  Route as NestedRoute,
  Switch,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from 'routers/LoginRouter';
import MyInformation from 'routers/MyInformationRouter';
import { theme } from 'themes';
import { QueryParamProvider } from 'use-query-params';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <QueryParamProvider ReactRouterRoute={PublicRoute}>
              <Switch>
                <NestedRoute path="/my/" component={MyInformation} />
                <NestedRoute path="/login/" component={Login} />
                <PublicRoute path="/error/" component={Error404} exact />
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
