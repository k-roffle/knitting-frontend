import { FormGroup, InputProps } from '@material-ui/core';
import ImageFileUploader from 'components/ImageFileUploader';
import { ImageInformation } from 'components/ImageFileUploader/hooks/useImageFileUploader';
import { FormLabel, InputWithLabel, RequiredMark } from 'dumbs';
import { Row } from 'pages/CreateDesign/common.css';
import {
  coverImageAtom,
  currentCoverInputAtom,
} from 'pages/CreateDesign/recoils';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Cover = (): React.ReactElement => {
  const [currentCoverInput, setCurrentCoverInput] = useRecoilState(
    currentCoverInputAtom,
  );
  const [coverImage, setCoverImage] = useRecoilState(coverImageAtom);

  const { name, description } = currentCoverInput;

  const handleChangeName: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentCoverInput({
      ...currentCoverInput,
      name: currentTarget.value,
    });
  };

  const handleChangeDescription: InputProps['onChange'] = ({
    currentTarget,
  }) => {
    if (currentTarget == null) return;
    setCurrentCoverInput({
      ...currentCoverInput,
      description: currentTarget.value,
    });
  };

  const handleChangeCoverImage = (images: ImageInformation[]) => {
    setCoverImage(images[0]);
  };

  useEffect(() => {
    if (coverImage) {
      setCurrentCoverInput({
        ...currentCoverInput,
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
          onChange={handleChangeName}
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
          onChange={handleChangeDescription}
        />
      </Row>
    </FormGroup>
  );
};

export default Cover;
