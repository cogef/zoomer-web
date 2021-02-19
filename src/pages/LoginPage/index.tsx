import './styles.scss';
import { Button, Paper, Typography } from '@material-ui/core';
import { login, useAuth } from '../../utils/auth';
import { NavLink, Redirect } from 'react-router-dom';
import { Topbar } from 'layouts/components/Topbar';
import { routes } from 'routes';
import { OrDivider } from './OrDivider';
import { useCurrentPageAnalytics } from 'utils/hooks/useAnalytics';

export const LoginPage = () => {
  useCurrentPageAnalytics('Login');

  const [user] = useAuth();

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <Topbar />
      <Paper className='login-card'>
        <Typography variant='h6' className='heading'>
          Sign in to schedule and manage meetings
        </Typography>
        <Button variant='contained' onClick={login}>
          Sign in with Google
        </Button>
        {/*<hr />*/}
        <OrDivider />
        <NavLink to={routes.HOST_JOIN}>Join a meeting as the host</NavLink>
      </Paper>
    </div>
  );
};
