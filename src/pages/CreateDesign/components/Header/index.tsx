import { Grid, Typography } from '@material-ui/core';
import { currentStepAtom } from 'pages/CreateDesign/atom';
import StepProgressBar from 'pages/CreateDesign/components/StepProgressBar';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { renderStepContents } from 'utils/renderStepContents';

const Title = styled(Typography)`
  margin-bottom: ${theme.spacing(2)};
  font-weight: 600;
`;

const Contents = styled(Typography)`
  white-space: pre-line;
`;

const Header = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const { title, detailContents } = renderStepContents(currentStep);

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
