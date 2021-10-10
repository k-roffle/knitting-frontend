import { MY_INFORMATION_ROUTER_ROOT } from 'constants/path';

import { Button as MaterialButton } from '@material-ui/core';
import { convertToRaw } from 'draft-js';
import { Button } from 'dumbs';
import useFirebaseImageStorage from 'hooks/useFirebaseImageStorage';
import { usePost } from 'hooks/usePost';
import {
  currentDesignInputAtom,
  currentStepAtom,
  editorStateAtom,
  localCoverImageAtom,
} from 'pages/CreateDesign/recoils';
import { PAGE, PostDesignInput } from 'pages/CreateDesign/types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const localCoverImage = useRecoilValue(localCoverImageAtom);

  const { uploadResults, uploadFile } = useFirebaseImageStorage({
    path: 'designs/cover-image',
    fileInformationList: localCoverImage,
  });

  const { mutate } = usePost({
    pathname: '/design/',
    onSuccess: () => history.push(MY_INFORMATION_ROUTER_ROOT),
  });

  const history = useHistory();

  useEffect(() => {
    const coverImageUrl = uploadResults.map(({ url }) => url)[0];

    if (coverImageUrl != null) {
      saveDesign(coverImageUrl);
    }
  }, [uploadResults]);

  const saveDesign = (coverImageUrl: string): void => {
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
        uploadFile?.();
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
      needle,
      yarn,
      localCoverImage[0]?.url,
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
    </FooterContainer>
  );
};

export default Footer;
