import './styles.scss';
import { Button, Paper, Typography } from '@material-ui/core';
import { login, useAuth } from '../../utils/auth';
import { Redirect } from 'react-router-dom';

export const LoginPage = () => {
  const [user] = useAuth();

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <Paper className='login-card'>
        <Typography>Stuff</Typography>
        <Button variant='contained' onClick={login}>
          Sign in with Google
        </Button>
      </Paper>
    </div>
  );
};
