import {
  MY_INFORMATION_PROFILE_PATH,
  MY_INFORMATION_CREATE_DESIGN_PATH,
} from 'constants/path';

import CreateDesign from 'pages/CreateDesign';
import Error404 from 'pages/Error404';
import MyInformation from 'pages/MyInformation';
import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { ProtectedRoute } from 'utils/route';

const MyInformationRouter = ({
  match: { url },
}: RouteComponentProps): React.ReactElement => {
  return (
    <Switch>
      <ProtectedRoute
        path={MY_INFORMATION_PROFILE_PATH}
        component={MyInformation}
        exact
      />
      <ProtectedRoute
        path={MY_INFORMATION_CREATE_DESIGN_PATH}
        component={CreateDesign}
        exact
      />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default MyInformationRouter;
