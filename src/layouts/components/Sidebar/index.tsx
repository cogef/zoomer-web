import { routes } from 'routes';
import { SidebarItem } from './SidebarItem';
import './styles.scss';
import { UserAccount } from './UserAccount';

export const Sidebar = (props: Props) => {
  const openClass = props.isOpen ? 'open' : '';

  return (
    <div className={`sidebar ${openClass}`}>
      <UserAccount />
      <div className='separator' />
      <SidebarItem path={routes.SCHEDULE}>Schedule Meeting</SidebarItem>
      <SidebarItem path={routes.MANAGE}>Manage Meeting</SidebarItem>
      <SidebarItem path={routes.MEETINGS}>Meetings</SidebarItem>
      <SidebarItem path={routes.HOST_JOIN}>Host Join</SidebarItem>
    </div>
  );
};

type Props = {
  isOpen: boolean;
};
