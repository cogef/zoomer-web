import './styles.scss';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';

export const InputRow = (props: Props) => {
  return (
    <Grid className='input-row' container>
      <Grid item md={2}>
        <Typography className='label'>{props.label}</Typography>
      </Grid>
      <Grid item md={5}>
        {props.children}
      </Grid>
    </Grid>
  );
};

type Props = {
  label: string;
  children: React.ReactNode;
};
