import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

export const PrivateRoute = ({ children, ...rest }: Props) => {
  const [user] = useAuth();

  if (!user) {
    return <Redirect to='/login' />;
  }

  return <Route {...rest}>{children}</Route>;
};

type Props = React.ComponentProps<typeof Route>;
