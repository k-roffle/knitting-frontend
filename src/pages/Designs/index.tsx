import { Error404 } from 'pages';
import CreateDesign from 'pages/CreateDesign';
import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

const Designs = ({
  match: { url },
}: RouteComponentProps): React.ReactElement => {
  return (
    <Switch>
      <Route path={`${url}/create/`} component={CreateDesign} exact />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default Designs;
