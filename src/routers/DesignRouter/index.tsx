import CreateDesign from 'pages/CreateDesign';
import Error404 from 'pages/Error404';
import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

const DesignRouter = ({
  match: { url },
}: RouteComponentProps): React.ReactElement => {
  return (
    <Switch>
      <Route path={`${url}/create/`} component={CreateDesign} exact />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default DesignRouter;
