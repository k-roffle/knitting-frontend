import { Image } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useRef } from 'react';

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
  error?: boolean;
  onChange(files: ImageInformation[]): void;
}

const ImageFileUploader = ({
  isMultiple = false,
  maximumSize = 10000000,
  imageAccepts = ['png', 'jpeg', 'jpg', 'gif'],
  width = 320,
  height = 240,
  selectedFiles = [],
  error,
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
        error={error}
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
