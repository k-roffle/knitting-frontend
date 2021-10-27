import { Grid, Typography } from '@material-ui/core';
import StepProgressBar from 'pages/CreateDesign/components/StepProgressBar';
import useStepContents from 'pages/CreateDesign/hooks/useStepContents';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'themes';

const Title = styled(Typography)`
  margin-bottom: ${theme.spacing(2)};
  font-weight: 600;
`;

const Contents = styled(Typography)`
  white-space: pre-line;
`;

const Header = (): React.ReactElement => {
  const { title, detailContents } = useStepContents();

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
