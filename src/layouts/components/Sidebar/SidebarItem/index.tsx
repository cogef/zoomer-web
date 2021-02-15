import { Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { RoutePath } from 'routes';
import { ParentProps } from 'utils/propTypes';
import './styles.scss';

export const SidebarItem = (props: Props) => {
  const match = useRouteMatch<PathParams>('/:route');

  const activeClass = props.path === match?.url ? 'active' : '';

  return (
    <div className={`sidebar-item ${activeClass}`}>
      <Link to={props.path}>
        <Typography className='type'>{props.children}</Typography>
      </Link>
    </div>
  );
};

type Props = {
  path: RoutePath;
} & ParentProps;

type PathParams = { route: string };
