import { ManagePage } from 'pages/ManagePage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { MainLayout } from '../layouts/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { SchedulePage } from '../pages/SchedulePage';

export const RootRoute = () => (
  <Switch>
    <Route path={routes.NOT_FOUND}>Not Found</Route>
    <Route path={routes.LOGIN}>
      <LoginPage />
    </Route>
    <PageRoute />
  </Switch>
);

const PageRoute = () => (
  <MainLayout>
    <Switch>
      <Redirect exact from={routes.HOME} to={routes.HOME} />

      <PrivateRoute exact path={routes.SCHEDULE}>
        <SchedulePage />
      </PrivateRoute>

      <PrivateRoute exact path={routes.MANAGE}>
        <ManagePage />
      </PrivateRoute>

      <Redirect to={routes.NOT_FOUND} />
    </Switch>
  </MainLayout>
);

export const routes = {
  HOME: '/',
  LOGIN: '/login',
  NOT_FOUND: '/404',
  SCHEDULE: '/schedule',
  MANAGE: '/manage',
};
