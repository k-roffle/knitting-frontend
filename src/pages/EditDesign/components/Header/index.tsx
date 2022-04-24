import { renderStepContents } from 'knitting/utils/renderStepContents';
import { EditType } from 'knitting/utils/types';

import { Grid } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentStepAtom } from '../../atom';
import StepProgressBar from '../StepProgressBar';

import { Contents, Title } from './Header.css';

interface HeaderProps {
  type: EditType;
}

const Header = ({ type }: HeaderProps): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const { createTitle, updateTitle, detailContents } =
    renderStepContents(currentStep);

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Title variant="h3">
          {type === 'CREATE' ? createTitle : updateTitle}
        </Title>
        <Contents>{detailContents}</Contents>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StepProgressBar />
      </Grid>
    </Grid>
  );
};

export default Header;
