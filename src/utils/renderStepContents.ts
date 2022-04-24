import { PAGE, PAGE_TYPE } from '../pages/EditDesign/types';

type StepContent = {
  createTitle: string;
  updateTitle: string;
  detailContents: string;
};

const stepContent: StepContent[] = [
  {
    createTitle: '🧒 도안 표지 만들기',
    updateTitle: '🧒 도안 표지 수정하기',
    detailContents:
      '어떤 도안인지 다른 니터들이 한 눈에 알아볼 수 있게\n도안을 대표하는 내용으로 채워주세요!',
  },
  {
    createTitle: '✍️ 도안 개요 입력하기',
    updateTitle: '✍️ 도안 개요 수정하기',
    detailContents:
      '니터들이 뜨개를 하는데 필요한 정보들을 입력해주세요.\n정보가 많은 도안일 수록 많은 니터들의 사랑을 받을 수 있답니다!',
  },
  {
    createTitle: '🧶 도안 작성하기',
    updateTitle: '🧶 도안 수정하기',
    detailContents:
      '편물을 만드는 방법을 단계별로 작성해주세요.\n게이지 계산이 필요한 코와 단의 경우 자동완성 기능을 사용하면,\n니팅이 게이지 계산을 자동으로 도와드릴게요! :D',
  },
  {
    createTitle: '🔍 확인하기',
    updateTitle: '🔍 확인하기',
    detailContents:
      '니터들이 뜨개를 하는데 필요한 정보들을 입력해주세요.\n정보가 많은 도안일 수록 많은 니터들의 사랑을 받을 수 있답니다!',
  },
];

export const renderStepContents = (currentStep: PAGE_TYPE): StepContent => {
  const { COVER, OUTLINE, PATTERN, REVIEW } = PAGE;

  switch (currentStep) {
    case COVER:
      return stepContent[COVER];
    case OUTLINE:
      return stepContent[OUTLINE];
    case PATTERN:
      return stepContent[PATTERN];
    case REVIEW:
      return stepContent[REVIEW];
    default:
      return stepContent[COVER];
  }
};
