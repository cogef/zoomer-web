import { AppLayout } from 'layouts';
import { HostJoinPage } from 'pages/HostJoinPage';
import { ManagePage } from 'pages/ManagePage';
import { UpcomingPage } from 'pages/UpcomingPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { LoginPage } from '../pages/LoginPage';
import { SchedulePage } from '../pages/SchedulePage';

export const RootRoute = () => (
  <Switch>
    <Route path={routes.NOT_FOUND}>Not Found</Route>

    <Route path={routes.LOGIN}>
      <LoginPage />
    </Route>

    <Route exact path={routes.HOST_JOIN}>
      <HostJoinPage />
    </Route>

    <PageRoute />
  </Switch>
);

const PageRoute = () => (
  <AppLayout>
    <Switch>
      <Redirect exact from={routes.HOME} to={routes.SCHEDULE} />

      <PrivateRoute exact path={routes.SCHEDULE}>
        <SchedulePage />
      </PrivateRoute>

      <PrivateRoute exact path={routes.MANAGE}>
        <ManagePage />
      </PrivateRoute>

      <PrivateRoute exact path={routes.UPCOMING}>
        <UpcomingPage />
      </PrivateRoute>

      <Redirect to={routes.NOT_FOUND} />
    </Switch>
  </AppLayout>
);

export const routes = {
  HOME: '/',
  LOGIN: '/login',
  NOT_FOUND: '/404',
  HOST_JOIN: '/host-join',
  SCHEDULE: '/schedule',
  MANAGE: '/manage',
  UPCOMING: '/upcoming',
};
