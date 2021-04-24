import Button, { SIDE } from 'dumbs/Button';
import {
  currentDesignInputAtom,
  currentStepAtom,
} from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { request } from '../../../../utils/requests';

const Footer = (): React.ReactElement => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const {
    name,
    stitches,
    rows,
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
    needle,
    yarn,
    extra,
    price,
    designType,
    patternType,
  } = useRecoilValue(currentDesignInputAtom);

  const serializeSize = (value: number): Record<string, string | number> => {
    return {
      value,
      unit: 'Cm',
    };
  };

  const saveDesign = async (): Promise<void> => {
    const createdAt = new Date();

    try {
      await request('/design/', 'post', {
        id: uuidv4(),
        name,
        gauge: {
          stitches,
          rows,
        },
        size: {
          totalLength: serializeSize(totalLength),
          sleeveLength: serializeSize(sleeveLength),
          shoulderWidth: serializeSize(shoulderWidth),
          bottomWidth: serializeSize(bottomWidth),
          armholeDepth: serializeSize(armholeDepth),
        },
        needle,
        yarn,
        extra,
        price: {
          value: price,
        },
        designType,
        patternType,
        pattern: {
          value: '',
        },
        createdAt: createdAt.toISOString(),
      });

      window.location.reload();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('도안 저장에 실패했습니다.');
    }
  };

  const handleOnClickPrevious = (): void => {
    switch (currentStep) {
      case PAGE.PATTERN:
        setCurrentStep(PAGE.DETAIL);
        break;
      case PAGE.REVIEW:
        setCurrentStep(PAGE.PATTERN);
        break;
      default:
        break;
    }
  };

  const handleOnClickNext = (): void => {
    switch (currentStep) {
      case PAGE.DETAIL:
        setCurrentStep(PAGE.PATTERN);
        break;
      case PAGE.PATTERN:
        setCurrentStep(PAGE.REVIEW);
        break;
      case PAGE.REVIEW:
        saveDesign();
        break;
      default:
        break;
    }
  };

  const renderNextLabel = (): string => {
    return currentStep === PAGE.REVIEW ? '저장' : '다음';
  };

  return (
    <div>
      {currentStep !== PAGE.DETAIL && (
        <Button side={SIDE.LEFT} label="이전" onClick={handleOnClickPrevious} />
      )}
      <Button
        side={SIDE.RIGHT}
        label={renderNextLabel()}
        onClick={handleOnClickNext}
      />
    </div>
  );
};

export default Footer;
