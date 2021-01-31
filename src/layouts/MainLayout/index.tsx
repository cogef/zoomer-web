import './styles.scss';
import { ParentProps } from '../../utils/propTypes';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';

export const MainLayout = (props: Props) => {
  const isSmall = useMediaQuery('(max-width:960px)');
  const [sbOpen, setSbOpen] = useState(false);

  const smallClass = isSmall ? 'small' : '';
  return (
    <div className={`layout ${smallClass}`}>
      <Topbar small={isSmall} onClick={() => setSbOpen(open => !open)} />
      <Sidebar isOpen={isSmall ? sbOpen : true} />
      <main className='content'>{props.children}</main>
    </div>
  );
};

type Props = ParentProps;
