import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { MainLayout } from '../layouts/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { SchedulePage } from '../pages/SchedulePage';

export const RootRoute = () => (
  <Switch>
    <Route path='/404'>Not Found</Route>
    <Route path='/login'>
      <LoginPage />
    </Route>
    <PageRoute />
  </Switch>
);

const PageRoute = () => (
  <MainLayout>
    <Switch>
      <Redirect exact from='/' to='/schedule' />

      <PrivateRoute path='/schedule'>
        <SchedulePage />
      </PrivateRoute>

      <Redirect to='/404' />
    </Switch>
  </MainLayout>
);
