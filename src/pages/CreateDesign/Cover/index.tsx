import { FormGroup } from '@mui/material';
import ImageFileUploader from 'knitting/components/ImageFileUploader';
import { ImageInformation } from 'knitting/components/ImageFileUploader/hooks/useImageFileUploader';
import { FormLabel, InputWithLabel, RequiredMark } from 'knitting/dumbs';
import {
  coverImageAtom,
  CoverInput,
  coverInputAtom,
} from 'knitting/pages/CreateDesign/atom';
import { Row } from 'knitting/pages/CreateDesign/common.css';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Cover = (): React.ReactElement => {
  const [coverInput, setCoverInput] = useRecoilState(coverInputAtom);
  const [coverImage, setCoverImage] = useRecoilState(coverImageAtom);

  const { name, description } = coverInput;

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

  const handleChangeCoverImage = (images: ImageInformation[]) => {
    setCoverImage(images[0]);
  };

  useEffect(() => {
    if (coverImage) {
      setCoverInput({
        ...coverInput,
        coverImageUrl: coverImage.url,
      });
    }
  }, [coverImage]);

  return (
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
        />
      </Row>
      <Row item xs={12}>
        <InputWithLabel
          id="description"
          variant="h5"
          label="한 줄 소개"
          aria-describedby="description"
          placeholder="예) 어디서나 잘 어울리는 기본 니트 도안"
          value={description}
          onChange={(event) => handleInputChange(event, 'description')}
        />
      </Row>
    </FormGroup>
  );
};

export default Cover;
