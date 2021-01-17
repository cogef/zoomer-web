import { SidebarItem } from './SidebarItem';
import './styles.scss';
import { UserAccount } from './UserAccount';

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <UserAccount />
      <div className='separator' />
      <SidebarItem path='/schedule'>Schedule Meeting</SidebarItem>
      <SidebarItem path='/manage'>Manage Meeting</SidebarItem>
    </div>
  );
};
