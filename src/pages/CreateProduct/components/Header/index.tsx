import { Grid } from '@material-ui/core';
import { currentStepAtom } from 'pages/CreateProduct/recoils';
import { PAGE } from 'pages/CreateProduct/types';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Title, Contents } from 'styles/constants';

import StepProgressBar from '../StepProgressBar';

const Header = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const getStepContents = (): { title: string; detailContents: string } => {
    const defaultContents = {
      title: '💁 판매할 도안 선택하기',
      detailContents:
        '판매하고 싶은 도안을 아래에서 선택해주세요!\n여러 도안을 함께 묶어 세트로 판매해도 좋아요 😊\n많은 니터분들이 관심을 가질 수 있도록 구성해봐요!',
    };

    switch (currentStep) {
      case PAGE.DESIGN:
        return defaultContents;
      case PAGE.PACKAGE:
        return {
          title: '📦 상품 구성하기',
          detailContents:
            '도안을 어떻게 판매할 것인지 상품을 구성해보세요!\n적절한 상품 구성은 더 많은 판매로 이어질 수 있어요! 🤭',
        };
      case PAGE.INTRODUCTION:
        return {
          title: '💬 상품에 대해 소개하기',
          detailContents:
            '이 상품에 대해 니터들에게 소개해주세요!\n도안을 따라 뜨개질을 하다보면 어떤 편물이 나오는지\n결과물을 공유해준다면,  더 많은 니터들이 믿고 구매할 수 있을거예요! 😉',
        };
      case PAGE.CONFIRM:
        return {
          title: '🔍 확인하기',
          detailContents:
            '다른 니터들에게 상품이 어떻게 노출될지 확인해보세요!\n수정되면 좋을 부분은 없는지 꼼꼼히 확인해봐요! 👀',
        };
      default:
        return defaultContents;
    }
  };

  const renderTitles = (): string => {
    const { title } = getStepContents();

    return title;
  };

  const renderContents = (): string => {
    const { detailContents } = getStepContents();

    return detailContents;
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Title variant="h3">{renderTitles()}</Title>
        <Contents>{renderContents()}</Contents>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StepProgressBar />
      </Grid>
    </Grid>
  );
};

export default Header;
