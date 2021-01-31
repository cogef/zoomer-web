import { ParentProps } from 'utils/propTypes';
import { MainLayout } from './MainLayout';

export const AppLayout = (props: Props) => {
  const Layout = MainLayout;
  return <Layout>{props.children}</Layout>;
};

type Props = ParentProps;
