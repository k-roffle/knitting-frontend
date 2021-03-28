import { Grid, Typography } from '@material-ui/core';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';

import StepProgressBar from '../StepProgressBar';

const Title = styled(Typography)`
  margin-bottom: ${theme.spacing(2)};
  font-weight: 600;
`;

const Contents = styled(Typography)`
  white-space: pre-line;
`;

const Header = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const renderContents = (): string => {
    const detailContents =
      '도안의 기본 정보를 입력하여 주세요.\n니터들이 원하는 도안을 더 빠르게 찾을 수 있을 거예요!';

    switch (currentStep) {
      case PAGE.DETAIL:
        return detailContents;
      case PAGE.PATTERN:
        return '편물을 만드는 방법을 단계별로 작성해주세요.\n게이지 계산이 필요한 코와 단의 경우 자동완성 기능을 사용하면,\n니팅이 게이지 계산을 자동으로 도와드릴게요! :D';
      case PAGE.REVIEW:
        return '입력한 도안이 올바른지 확인해보세요!\n정확한 도안은 니터로부터 더 높은 만족을 받을 수 있을 거예요;)';
      default:
        return detailContents;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Title variant="h3">🧶 새로운 도안 작성하기</Title>
        <Contents>{renderContents()}</Contents>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StepProgressBar />
      </Grid>
    </Grid>
  );
};

export default Header;
