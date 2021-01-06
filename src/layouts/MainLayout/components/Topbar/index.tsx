import { Button, Typography } from '@material-ui/core';
import { logout } from '../../../../utils/auth';
import './styles.scss';

export const Topbar = () => {
  return (
    <div className='topbar'>
      <div className='topbar__left'>
        <Typography variant='h4' className='title'>
          <span className='title__zoom'>Zoom</span> Scheduler
        </Typography>
      </div>
      <div className='topbar__right'>
        <Button onClick={logout} variant='contained'>
          Logout
        </Button>
      </div>
    </div>
  );
};
