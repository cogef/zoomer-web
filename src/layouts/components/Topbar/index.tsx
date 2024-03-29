import { Button, Icon, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { logout, useAuth } from '../../../utils/auth';
import './styles.scss';

export const Topbar = (props: Props) => {
  const [user] = useAuth();

  return (
    <div className='topbar'>
      <div className='topbar__left'>
        {props.small && (
          <Button className='btn-menu' size='small' onClick={props.onClick} color='primary'>
            <Icon>menu</Icon>
          </Button>
        )}
        <Typography variant='h4' className='title'>
          <Link to={routes.HOME}>
            <span className='title__zoom'>Zoom</span> Scheduler
          </Link>
        </Typography>
      </div>
      <div className='topbar__right'>
        {user && (
          <Button size={props.small ? 'small' : 'medium'} onClick={logout} variant='contained'>
            <Icon>logout</Icon>
            {props.small ? '' : 'Logout'}
          </Button>
        )}
      </div>
    </div>
  );
};

type Props = {
  small?: boolean;
  onClick?: () => void;
};
