import { Button as MaterialButton } from '@material-ui/core';
import { convertToRaw } from 'draft-js';
import { Button, Snackbar } from 'dumbs';
import {
  currentDesignInputAtom,
  currentStepAtom,
  editorStateAtom,
} from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { FAILED_TO_SAVE_DESIGN } from 'utils/errors';
import { request } from 'utils/requests';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing(6, 0, 4)};
`;

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
  const editorState = useRecoilValue(editorStateAtom);

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

  const serializeSize = (value: number): Record<string, string | number> => {
    return {
      value,
      unit: 'Cm',
    };
  };

  const saveDesign = async (): Promise<void> => {
    try {
      await requestSaveDesign();
      window.location.reload();
    } catch (e) {
      setOpenErrorSnackbar(true);
    }
  };

  const requestSaveDesign = async (): Promise<void> => {
    await request('/design/', 'post', {
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
      pattern: convertToRaw(editorState.getCurrentContent()),
    });
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
    const isInvalidNumberInput = [
      stitches,
      rows,
      totalLength,
      sleeveLength,
      shoulderWidth,
      bottomWidth,
      armholeDepth,
      needle,
    ].some((value) => value < 1);

    switch (currentStep) {
      case PAGE.DETAIL:
        if (name === '' || isInvalidNumberInput) {
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
