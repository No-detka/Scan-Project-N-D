import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { checkUserAuthorization } from '../redux/userSlice';

import ProtectedRoute from './ProtectedRoute';
import { routes } from './routes.data';

const Router: FC = () => {
  const { isAuthorized, isFirstLoad } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuthorization());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          if (route.protected) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
                    <route.component />
                  </ProtectedRoute>
                }
              />
            );
          }
          return <Route key={route.path} path={route.path} element={<route.component />} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
