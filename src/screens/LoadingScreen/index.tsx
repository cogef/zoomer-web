import { CircularProgress, Typography } from '@material-ui/core';
import { Topbar } from '../../layouts/MainLayout/components/Topbar';
import './styles.scss';

export const LoadingScreen = () => {
  return (
    <>
      <Topbar />
      <div className='loading-screen'>
        <Typography variant='h5'>Loading Resources</Typography>
        <CircularProgress className='spinner' color='secondary' />
      </div>
    </>
  );
};
