import {
  MY_INFORMATION_PROFILE_PATH,
  MY_INFORMATION_CREATE_DESIGN_PATH,
} from 'knitting/constants/path';
import CreateDesign from 'knitting/pages/CreateDesign';
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
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MyInformationRouter;
