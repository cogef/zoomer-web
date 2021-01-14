import './styles.scss';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { InputRow } from '../InputRow';

export const InputSubRow = (props: Props) => {
  return (
    <InputRow label={props.topLabel} wide>
      <Grid className='input-sub-row' container>
        <Grid item xs={12} md={3}>
          <Typography className='label'>{props.label || ''}</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          {props.children}
        </Grid>
      </Grid>
    </InputRow>
  );
};

type Props = {
  label?: string;
  topLabel?: string;
  wide?: boolean;
  children: React.ReactNode;
};
