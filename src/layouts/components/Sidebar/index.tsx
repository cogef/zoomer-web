import { SidebarItem } from './SidebarItem';
import './styles.scss';
import { UserAccount } from './UserAccount';

export const Sidebar = (props: Props) => {
  const openClass = props.isOpen ? 'open' : '';

  return (
    <div className={`sidebar ${openClass}`}>
      <UserAccount />
      <div className='separator' />
      <SidebarItem path='/schedule'>Schedule Meeting</SidebarItem>
      <SidebarItem path='/manage'>Manage Meeting</SidebarItem>
      <SidebarItem path='/upcoming'>Upcoming Meetings</SidebarItem>
    </div>
  );
};

type Props = {
  isOpen: boolean;
};
