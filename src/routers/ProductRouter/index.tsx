import { PRODUCT_DETAIL_PATH } from 'knitting/constants/path';
import { Error404 } from 'knitting/pages';
import ProductDetail from 'knitting/pages/ProductDetail';
import { ProtectedRoute } from 'knitting/utils/route';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
