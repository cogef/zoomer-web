import './styles.scss';
import { ParentProps } from '../../utils/propTypes';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

export const MainLayout = (props: Props) => {
  return (
    <div className='layout-main'>
      <Topbar />
      <Sidebar />
      <main className='content'>{props.children}</main>
    </div>
  );
};

type Props = ParentProps;
