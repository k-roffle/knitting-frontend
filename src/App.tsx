import { Error404 } from 'pages';
import Designs from 'pages/Designs';
import React from 'react';
import {
  BrowserRouter,
  Route as PublicRoute,
  Route as NestedRoute,
  Switch,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={PublicRoute}>
        <Switch>
          <NestedRoute path="/designs/" component={Designs} />
          <PublicRoute path="/error/" component={Error404} exact />
          <PublicRoute path="*" component={Error404} />
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
