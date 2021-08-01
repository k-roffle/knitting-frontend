import CreateDesign from 'pages/CreateDesign';
import Error404 from 'pages/Error404';
import MyDesigns from 'pages/MyDesigns';
import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { ProtectedRoute } from 'utils/route';

const DesignRouter = ({
  match: { url },
}: RouteComponentProps): React.ReactElement => {
  return (
    <Switch>
      <ProtectedRoute path={`${url}`} component={MyDesigns} exact />
      <ProtectedRoute path={`${url}/create/`} component={CreateDesign} exact />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default DesignRouter;
