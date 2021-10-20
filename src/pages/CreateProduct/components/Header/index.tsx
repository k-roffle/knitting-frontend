import { Grid } from '@material-ui/core';
import { useGetStepContents } from 'pages/CreateProduct/hooks/useGetStepContents';
import React from 'react';
import { Title, Contents } from 'styles/constants';

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
