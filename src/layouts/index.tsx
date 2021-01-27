import { useMediaQuery } from '@material-ui/core';
import { ParentProps } from 'utils/propTypes';
import { MainLayout } from './MainLayout';
import { SmallLayout } from './SmallLayout';

export const AppLayout = (props: Props) => {
  const isSmall = useMediaQuery('(max-width:960px)');
  const Layout = isSmall ? SmallLayout : MainLayout;
  return <Layout>{props.children}</Layout>;
};

type Props = ParentProps;
