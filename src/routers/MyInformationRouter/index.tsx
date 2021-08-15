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
      <ProtectedRoute path={`${url}`} component={MyInformation} exact />
      <ProtectedRoute
        path={`${url}/designs/create/`}
        component={CreateDesign}
        exact
      />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default MyInformationRouter;
