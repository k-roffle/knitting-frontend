import {
  MY_INFORMATION_PROFILE_PATH,
  MY_INFORMATION_CREATE_DESIGN_PATH,
} from 'constants/path';

import CreateDesign from 'pages/CreateDesign';
import Error404 from 'pages/Error404';
import MyInformation from 'pages/MyInformation';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from 'utils/route';

const MyInformationRouter = (): React.ReactElement => {
  return (
    <Switch>
      <ProtectedRoute
        path={MY_INFORMATION_PROFILE_PATH}
        component={MyInformation}
        exact
        strict
        sensitive
      />
      <ProtectedRoute
        path={MY_INFORMATION_CREATE_DESIGN_PATH}
        component={CreateDesign}
        exact
        strict
        sensitive
      />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default MyInformationRouter;
