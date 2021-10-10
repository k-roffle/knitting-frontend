import { Typography } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { useRef } from 'react';
import { theme } from 'themes';

import {
  ImagesContainer,
  DropZone,
  UploadContainer,
  FileInput,
} from './ImageFileUploader.css';
import {
  ImageInformation,
  useImageFileUploader,
} from './hooks/useImageFileUploader';

type ImageAccept = 'png' | 'jpeg' | 'jpg' | 'gif';

interface Props {
  isMultiple?: boolean;
  maximumSize?: number;
  imageAccepts?: ImageAccept[];
  width?: number;
  height?: number;
  selectedFiles?: ImageInformation[];
  onChange(files: ImageInformation[]): void;
}

const ImageFileUploader = ({
  isMultiple = false,
  maximumSize = 10000000,
  imageAccepts = ['png', 'jpeg', 'jpg', 'gif'],
  width = theme.spacing(40),
  height = theme.spacing(30),
  selectedFiles = [],
  onChange,
}: Props): React.ReactElement | null => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const types = imageAccepts.map((accept) => `image/${accept}`);

  const { onFileChange, onFileDrop } = useImageFileUploader({
    maximumSize,
    onChange,
  });

  const handleOnDropZoneClick = (): void => {
    hiddenFileInput?.current?.click();
  };

  return (
    <ImagesContainer>
      {selectedFiles.map((file, index) => {
        return (
          <DropZone key={index} width={width} height={height}>
            <img
              src={file.url}
              alt="업로드한 이미지"
              draggable="false"
              width={width}
              height={height}
            />
          </DropZone>
        );
      })}
      <DropZone
        onClick={handleOnDropZoneClick}
        onDrop={onFileDrop}
        onDragOver={(event) => event.preventDefault()}
        width={width}
        height={height}
      >
        <UploadContainer>
          <Image />
          <Typography variant="subtitle1">
            이미지를 드랍하거나 클릭하세요
          </Typography>
        </UploadContainer>

        <FileInput
          type="file"
          accept={types.join(',')}
          ref={hiddenFileInput}
          onChange={onFileChange}
          multiple={isMultiple}
        />
      </DropZone>
    </ImagesContainer>
  );
};

export default ImageFileUploader;
