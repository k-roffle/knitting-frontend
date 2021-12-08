import { Grid } from '@material-ui/core';
import { currentStepAtom } from 'pages/CreateDesign/atom';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Title, Contents } from 'styles/constants';

import StepProgressBar from '../StepProgressBar';

const Header = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const renderContents = (): string => {
    switch (currentStep) {
      case PAGE.COVER:
        return '어떤 도안인지 다른 니터들이 한 눈에 알아볼 수 있게\n도안을 대표하는 내용으로 채워주세요!';
      case PAGE.OUTLINE:
        return '니터들이 뜨개를 하는데 필요한 정보들을 입력해주세요.\n정보가 많은 도안일 수록 많은 니터들의 사랑을 받을 수 있답니다!';
      case PAGE.PATTERN:
        return '편물을 만드는 방법을 단계별로 작성해주세요.\n게이지 계산이 필요한 코와 단의 경우 자동완성 기능을 사용하면,\n니팅이 게이지 계산을 자동으로 도와드릴게요! :D';
      case PAGE.REVIEW:
        return '입력한 도안이 올바른지 확인해보세요!\n정확한 도안은 니터로부터 더 높은 만족을 받을 수 있을 거예요;)';
      default:
        return '';
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Title variant="h3">✏️ 새로운 도안 작성</Title>
        <Contents>{renderContents()}</Contents>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StepProgressBar />
      </Grid>
    </Grid>
  );
};

export default Header;
