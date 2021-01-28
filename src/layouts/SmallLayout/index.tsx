import './styles.scss';
import { ParentProps } from '../../utils/propTypes';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { useState } from 'react';

export const SmallLayout = (props: Props) => {
  const [sbOpen, setSbOpen] = useState(false);
  return (
    <div className='layout-small'>
      <Topbar small onClick={() => setSbOpen(open => !open)} />
      <Sidebar isOpen={sbOpen} />
      <main className='content'>{props.children}</main>
    </div>
  );
};

type Props = ParentProps;
