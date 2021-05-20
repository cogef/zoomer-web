import './styles.scss';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';

export const InputRow = (props: Props) => {
  return (
    <Grid className='input-row' container>
      <Grid item xs={12} md={3} lg={2}>
        <Typography className='label'>{props.label || ''}</Typography>
      </Grid>
      <Grid item xs={12} md={9} lg={props.wide ? 8 : 5} className='row-body'>
        {props.children}
      </Grid>
    </Grid>
  );
};

type Props = {
  label?: string;
  wide?: boolean;
  children: React.ReactNode;
};
