import { Grid } from '@mui/material';
import { currentStepAtom } from 'knitting/pages/CreateDesign/atom';
import StepProgressBar from 'knitting/pages/CreateDesign/components/StepProgressBar';
import { renderStepContents } from 'knitting/utils/renderStepContents';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { Contents, Title } from './Header.css';

const Header = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Title variant="h3">✏️ 새로운 도안 작성</Title>
        <Contents>{renderStepContents(currentStep)}</Contents>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StepProgressBar />
      </Grid>
    </Grid>
  );
};

export default Header;
