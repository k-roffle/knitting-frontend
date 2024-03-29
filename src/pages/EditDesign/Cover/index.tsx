import ImageFileUploader from 'knitting/components/ImageFileUploader';
import { ImageInformation } from 'knitting/components/ImageFileUploader/hooks/useImageFileUploader';
import { FormLabel, InputWithLabel, RequiredMark } from 'knitting/dumbs';

import { FormGroup } from '@mui/material';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  coverImageAtom,
  CoverInput,
  coverInputAtom,
  isLoadingAtom,
  stepValidationsAtom,
} from '../atom';
import { Row } from '../common.css';
import Footer from '../components/Footer';
import { useSaveDesign } from '../components/Footer/hooks/useSaveDesign';
import { useStepController } from '../components/Footer/hooks/useStepController';
import { PAGE } from '../types';

const Cover = (): React.ReactElement => {
  const [coverInput, setCoverInput] = useRecoilState(coverInputAtom);
  const [coverImage, setCoverImage] = useRecoilState(coverImageAtom);
  const stepValidations = useRecoilValue(stepValidationsAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const { onPreviousClick, onNextClick, changeValidation } =
    useStepController();
  const { uploadFile } = useSaveDesign();
  const { name, description, coverImageUrl } = coverInput;

  const showValidation = stepValidations[PAGE.COVER] === false;

  const handleInputChange = (
    {
      currentTarget,
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: keyof CoverInput,
  ): void => {
    setCoverInput({
      ...coverInput,
      [type]: currentTarget.value,
    });
  };

  const handleChangeCoverImage = async (images: ImageInformation[]) => {
    setCoverImage(images[0]);

    if (uploadFile) {
      setIsLoading(true);
      await uploadFile('designs/cover-image', images);
    }
  };

  const handleNextClick = (): void => {
    if (!isLoading) {
      changeValidation([name, coverImageUrl]);
      onNextClick();
    }
  };

  return (
    <>
      <FormGroup>
        <Row item xs={12}>
          <InputWithLabel
            id="name"
            variant="h5"
            label="이름"
            placeholder="예) 토니 캔디 라운드넥 니트"
            value={name}
            onChange={(event) => handleInputChange(event, 'name')}
            isRequired
            showValidation={showValidation}
          />
        </Row>
        <Row item xs={12}>
          <FormLabel variant="h5">
            표지 이미지
            <RequiredMark />
          </FormLabel>
          <ImageFileUploader
            selectedFiles={coverImage ? [coverImage] : []}
            onChange={handleChangeCoverImage}
            error={showValidation && coverImage == null}
          />
        </Row>
        <Row item xs={12}>
          <InputWithLabel
            id="description"
            variant="h5"
            label="한 줄 소개"
            aria-describedby="description"
            placeholder="예) 어디서나 잘 어울리는 기본 니트 도안"
            value={description || ''}
            onChange={(event) => handleInputChange(event, 'description')}
          />
        </Row>
      </FormGroup>
      <Footer
        previousLabel="취소"
        nextLabel="다음"
        onPreviousClick={onPreviousClick}
        onNextClick={handleNextClick}
      />
    </>
  );
};

export default Cover;
