import { AppLayout } from 'layouts';
import { HostJoinPage } from 'pages/HostJoinPage';
import { ManagePage } from 'pages/ManagePage';
import { MeetingsPage } from 'pages/MeetingsPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { LoginPage } from '../pages/LoginPage';
import { SchedulePage } from '../pages/SchedulePage';
import { routes } from './routes';

export const RootRoute = () => (
  <Switch>
    <Route path={routes.NOT_FOUND}>Not Found</Route>

    <Route path={routes.LOGIN}>
      <LoginPage />
    </Route>

    <Route exact path={routes.HOST_JOIN}>
      <HostJoinPage />
    </Route>

    <PageRoutes />
  </Switch>
);

const PageRoutes = () => (
  <AppLayout>
    <Switch>
      <Redirect exact from={routes.HOME} to={routes.SCHEDULE} />

      <PrivateRoute exact path={routes.SCHEDULE}>
        <SchedulePage />
      </PrivateRoute>

      <PrivateRoute path={routes.MANAGE}>
        <ManagePage />
      </PrivateRoute>

      <PrivateRoute path={routes.MEETINGS}>
        <MeetingsPage />
      </PrivateRoute>

      <Redirect to={routes.NOT_FOUND} />
    </Switch>
  </AppLayout>
);
