import './styles.scss';
import { Typography } from '@material-ui/core';

export const Page = (props: Props) => {
  return (
    <div className={`page ${props.className || ''}`}>
      <Typography className='page__title' variant='h5'>
        {props.title}
      </Typography>
      {props.children}
    </div>
  );
};

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};
