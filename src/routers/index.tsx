import { Route, Routes } from 'react-router-dom';

import {
  ERROR_PATH,
  LOGIN_ROUTER_ROOT,
  MY_INFORMATION_ROUTER_ROOT,
  PRODUCT_ROUTER_ROOT,
  ROUTER_PATH,
} from '../constants/path';
import { Error404 } from '../pages';
import { LoginRoute, ProtectedRoute } from '../utils/route';

import Login from './LoginRouter';
import MyInformation from './MyInformationRouter';
import Products from './ProductRouter';

const Routers = () => (
  <Routes>
    <Route
      path={ROUTER_PATH}
      element={
        <ProtectedRoute>
          <MyInformation />
        </ProtectedRoute>
      }
    />
    <Route
      path={MY_INFORMATION_ROUTER_ROOT + ROUTER_PATH}
      element={
        <ProtectedRoute>
          <MyInformation />
        </ProtectedRoute>
      }
    />
    <Route
      path={LOGIN_ROUTER_ROOT + ROUTER_PATH}
      element={
        <LoginRoute>
          <Login />
        </LoginRoute>
      }
    />
    <Route
      path={PRODUCT_ROUTER_ROOT + ROUTER_PATH}
      element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      }
    />
    <Route path={ERROR_PATH} element={<Error404 />} caseSensitive />
    <Route path="*" element={<Error404 />} />
  </Routes>
);

export default Routers;
