import { PRODUCT_DETAIL_PATH } from 'knitting/constants/path';
import { Error404 } from 'knitting/pages';
import ProductDetail from 'knitting/pages/ProductDetail';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductRouter = (): React.ReactElement => {
  return (
    <Routes>
      <Route
        path={PRODUCT_DETAIL_PATH}
        element={<ProductDetail />}
        caseSensitive
      />
      <Route path="*" element={Error404} />
    </Routes>
  );
};

export default ProductRouter;
