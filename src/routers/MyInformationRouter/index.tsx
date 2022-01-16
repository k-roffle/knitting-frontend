import {
  MY_INFORMATION_PROFILE_PATH,
  MY_INFORMATION_CREATE_DESIGN_PATH,
  MY_INFORMATION_CREATE_PRODUCT_PATH,
} from 'constants/path';

import CreateDesign from 'pages/CreateDesign';
import CreateProduct from 'pages/CreateProduct';
import Error404 from 'pages/Error404';
import MyInformation from 'pages/MyInformation';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const MyInformationRouter = (): React.ReactElement => {
  return (
    <Routes>
      <Route
        path={MY_INFORMATION_PROFILE_PATH}
        element={<MyInformation />}
        caseSensitive
      />
      <Route
        path={MY_INFORMATION_CREATE_DESIGN_PATH}
        element={<CreateDesign />}
        caseSensitive
      />
      <Route
        path={MY_INFORMATION_CREATE_PRODUCT_PATH}
        element={<CreateProduct />}
        caseSensitive
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MyInformationRouter;
