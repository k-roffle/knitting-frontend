import { FormGroup, Input, InputProps } from '@material-ui/core';
import ImageFileUploader from 'components/ImageFileUploader';
import { ImageInformation } from 'components/ImageFileUploader/hooks/useImageFileUploader';
import { FormLabel, RequiredInput, RequiredMark } from 'dumbs';
import {
  coverImageAtom,
  currentCoverInputAtom,
} from 'pages/CreateDesign/recoils';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const FullWidthInput = styled(Input)`
  width: 100%;
`;

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
      <RequiredInput
        id="name"
        variant="h5"
        label="이름"
        placeholder="예) 토니 캔디 라운드넥 니트"
        value={name}
        onChange={handleChangeName}
      />
      <FormLabel variant="h5">
        표지 이미지
        <RequiredMark />
      </FormLabel>
      <ImageFileUploader
        selectedFiles={coverImage ? [coverImage] : []}
        onChange={handleChangeCoverImage}
      />
      <FormLabel variant="h5">한 줄 소개</FormLabel>
      <FullWidthInput
        id="description"
        aria-describedby="description"
        placeholder="예) 어디서나 잘 어울리는 기본 니트 도안"
        value={description}
        onChange={handleChangeDescription}
      />
    </FormGroup>
  );
};

export default Cover;
