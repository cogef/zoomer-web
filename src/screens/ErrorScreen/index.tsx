import { Typography } from '@material-ui/core';
import { Topbar } from '../../layouts/components/Topbar';
import './styles.scss';

export const ErrorScreen = (props: Props) => {
  return (
    <>
      <Topbar />
      <div className='error-screen'>
        <Typography className='title' variant='h5'>
          Error
        </Typography>
        <Typography className='error-msg' variant='h5'>
          {props.errorMsg}
        </Typography>
      </div>
    </>
  );
};

type Props = {
  errorMsg: string;
};
