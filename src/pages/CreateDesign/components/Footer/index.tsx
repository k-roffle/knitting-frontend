import { FAILED_TO_SAVE_DESIGN } from 'constants/errors';

import { Button as MaterialButton } from '@material-ui/core';
import { convertToRaw } from 'draft-js';
import { Button, Snackbar } from 'dumbs';
import { usePost } from 'hooks/usePost';
import {
  currentDesignInputAtom,
  currentStepAtom,
  editorStateAtom,
} from 'pages/CreateDesign/recoils';
import { PAGE, PostDesignInput } from 'pages/CreateDesign/types';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { hasEmptyValue, hasNegativeNumber } from 'utils/validation';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing(6, 0, 4)};
`;

const Footer = (): React.ReactElement => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const {
    name,
    designType,
    patternType,
    stitches,
    rows,
    size,
    needle,
    yarn,
    extra,
    description,
    targetLevel,
    coverImageUrl,
    techniques,
  } = useRecoilValue(currentDesignInputAtom);
  const {
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
  } = size;
  const editorState = useRecoilValue(editorStateAtom);

  const { mutate } = usePost({
    pathname: '/design/',
  });
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

  const saveDesign = (): void => {
    const pattern = `${JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    )}`;

    const separatedTechniques = techniques.split(',');
    const postDesignData: PostDesignInput = {
      name,
      cover_image_url: coverImageUrl,
      design_type: designType,
      pattern_type: patternType,
      stitches,
      rows,
      size: {
        total_length: totalLength,
        sleeve_length: sleeveLength,
        shoulder_width: shoulderWidth,
        bottom_width: bottomWidth,
        armhole_depth: armholeDepth,
      },
      needle,
      yarn,
      extra,
      description,
      target_level: targetLevel,
      pattern,
      techniques: separatedTechniques,
    };

    mutate(postDesignData);
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

  const disabledNextButton = (): boolean => {
    const isInvalidNumberInput = hasNegativeNumber([
      stitches,
      rows,
      totalLength,
      sleeveLength,
      shoulderWidth,
      bottomWidth,
      armholeDepth,
    ]);

    const isInvalidRequiredValue = hasEmptyValue([
      name,
      description,
      techniques,
      coverImageUrl,
      needle,
      yarn,
    ]);

    switch (currentStep) {
      case PAGE.DETAIL:
        if (isInvalidRequiredValue || isInvalidNumberInput) {
          return true;
        }
        return false;
      case PAGE.PATTERN:
        // TODO: 도안 유효성 검사
        return false;
      default:
        return false;
    }
  };

  return (
    <FooterContainer>
      {currentStep === PAGE.DETAIL ? (
        <MaterialButton variant="contained" onClick={handleOnClickPrevious}>
          취소
        </MaterialButton>
      ) : (
        <MaterialButton variant="contained" onClick={handleOnClickPrevious}>
          이전
        </MaterialButton>
      )}
      <Button
        label={renderNextLabel()}
        onClick={handleOnClickNext}
        disabled={disabledNextButton()}
      />
      <Snackbar
        label={FAILED_TO_SAVE_DESIGN}
        onClose={handleSnackbarClose}
        open={openErrorSnackbar}
        severity="error"
      />
    </FooterContainer>
  );
};

export default Footer;
