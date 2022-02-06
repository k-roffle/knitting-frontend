import { Grid } from '@mui/material';
import { useGetStepContents } from 'knitting/pages/CreateProduct/hooks/useGetStepContents';
import { Title, Contents } from 'knitting/styles/constants';
import React from 'react';

import StepProgressBar from '../StepProgressBar';

const Header = (): React.ReactElement => {
  const { title, detailContents } = useGetStepContents();

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Title variant="h3">{title}</Title>
        <Contents>{detailContents}</Contents>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StepProgressBar />
      </Grid>
    </Grid>
  );
};

export default Header;
