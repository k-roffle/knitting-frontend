import { PRODUCT_DETAIL_PATH } from 'constants/path';

import { Error404 } from 'pages';
import ProductDetail from 'pages/ProductDetail';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from 'utils/route';

const ProductRouter = (): React.ReactElement => {
  return (
    <Switch>
      <ProtectedRoute
        path={PRODUCT_DETAIL_PATH}
        component={ProductDetail}
        exact
        strict
        sensitive
      />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default ProductRouter;
