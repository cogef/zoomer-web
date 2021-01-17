import { Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { ParentProps } from 'utils/propTypes';
import './styles.scss';

export const SidebarItem = (props: Props) => {
  const { pathname } = useLocation();

  const activeClass = pathname === props.path ? 'active' : '';

  return (
    <div className={`sidebar-item ${activeClass}`}>
      <Link to={props.path}>
        <Typography>{props.children}</Typography>
      </Link>
    </div>
  );
};

type Props = {
  path: string;
} & ParentProps;
