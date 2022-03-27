import { renderStepContents } from 'knitting/utils/renderStepContents';

import { Grid } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentStepAtom } from '../../atom';
import StepProgressBar from '../StepProgressBar';

import { Contents, Title } from './Header.css';

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
