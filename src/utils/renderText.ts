import {
  DESIGN,
  DESIGN_TYPE,
  PATTERN,
  PATTERN_TYPE,
} from '../pages/EditDesign/types';

export const renderPattern = (pattern: PATTERN_TYPE): string => {
  switch (pattern) {
    case PATTERN.TEXT:
      return '서술형 도안';
    case PATTERN.IMAGE:
      return '그림 도안';
    case PATTERN.VIDEO:
      return '영상 도안';
    default:
      return '서술형 도안';
  }
};

export const renderDesign = (design: DESIGN_TYPE): string => {
  switch (design) {
    case DESIGN.SWEATER:
      return '니트';
    default:
      return '니트';
  }
};
