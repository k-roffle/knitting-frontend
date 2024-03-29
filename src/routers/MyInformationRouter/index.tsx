import {
  MY_INFORMATION_PROFILE_PATH,
  MY_INFORMATION_CREATE_DESIGN_PATH,
  MY_INFORMATION_UPDATE_DESIGN_PATH,
  MY_INFORMATION_CREATE_PRODUCT_PATH,
} from 'knitting/constants/path';
import CreateProduct from 'knitting/pages/CreateProduct';
import CreateDesign from 'knitting/pages/EditDesign/CreateDesign';
import UpdateDesign from 'knitting/pages/EditDesign/UpdateDesign';
import Error404 from 'knitting/pages/Error404';
import MyInformation from 'knitting/pages/MyInformation';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
        path={MY_INFORMATION_UPDATE_DESIGN_PATH}
        element={<UpdateDesign />}
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
