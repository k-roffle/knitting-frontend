import {
  MY_INFORMATION_PROFILE_PATH,
  MY_INFORMATION_CREATE_DESIGN_PATH,
  MY_INFORMATION_CREATE_PRODUCT_PATH,
} from 'knitting/constants/path';
import CreateDesign from 'knitting/pages/CreateDesign';
import CreateProduct from 'knitting/pages/CreateProduct';
import Error404 from 'knitting/pages/Error404';
import MyInformation from 'knitting/pages/MyInformation';
import { ProtectedRoute } from 'knitting/utils/route';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
      <ProtectedRoute
        path={MY_INFORMATION_CREATE_PRODUCT_PATH}
        component={CreateProduct}
        exact
        strict
        sensitive
      />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default MyInformationRouter;
