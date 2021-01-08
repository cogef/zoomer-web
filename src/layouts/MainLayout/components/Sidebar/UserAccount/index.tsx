import './styles.scss';
import { Avatar, Typography } from '@material-ui/core';
import { useAuth } from 'utils/auth';

export const UserAccount = () => {
  const [user] = useAuth();
  if (!user) return null;

  return (
    <div className='user-account'>
      <Avatar className='avatar' alt={user.displayName || ''} src={user.photoURL || ''} />
      <Typography>{user.displayName}</Typography>
    </div>
  );
};
