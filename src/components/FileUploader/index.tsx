import { ONLY_UPLOAD_FILES_BELOW_10MB } from 'constants/errors';

import { Typography } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { theme } from 'themes';

import {
  ImagesContainer,
  DropZone,
  UploadContainer,
  FileInput,
} from './FileUploader.css';

type FileMetadata = {
  name: string;
  size: number;
  type: string;
};

export type FileInformation = {
  url: string;
  metadata: FileMetadata;
  file: File;
};

type ImageAccept = 'png' | 'jpeg' | 'jpg' | 'gif';

interface Props {
  isMultiple?: boolean;
  maximumSize?: number;
  imageAccepts?: ImageAccept[];
  width?: number;
  height?: number;
  selectedFiles?: FileInformation[];
  onChange(files: FileInformation[]): void;
}

const FileUploader = ({
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

  const [isOversized, setIsOversized] = useState(false);

  useCommonSnackbar({
    message: ONLY_UPLOAD_FILES_BELOW_10MB,
    severity: 'error',
    dependencies: [isOversized],
    callbackAfterReset: () => setIsOversized(false),
  });

  const validFileSize = (fileSize: number): boolean => {
    return fileSize <= maximumSize;
  };

  const getFileMetadata = ({ name, size, type }: File) => {
    return {
      name,
      size,
      type,
    };
  };

  const isInvalidFiles = (files: FileList | null): boolean => {
    if (files == null || files.length < 1) {
      return false;
    }

    const hasOversized = Array.from(files).some(
      ({ size }) => !validFileSize(size),
    );

    if (hasOversized) {
      setIsOversized(true);
      return false;
    }

    return true;
  };

  const uploadFile = (files: FileList | null) => {
    if (isInvalidFiles(files)) {
      return;
    }

    const mappingFiles = Array.from(files ?? []).map(
      (file): FileInformation => {
        const metadata = getFileMetadata(file);
        const url = URL.createObjectURL(file);

        return { url, metadata, file };
      },
    );

    onChange(mappingFiles);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target ?? {};

    uploadFile(files);
  };

  const handleOnDropZoneClick = (): void => {
    hiddenFileInput?.current?.click();
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    uploadFile(files);
  };

  return (
    <ImagesContainer>
      {selectedFiles.map((file) => {
        return (
          <DropZone width={width} height={height}>
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
        onDrop={handleOnDrop}
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
          onChange={handleFileChange}
          multiple={isMultiple}
        />
      </DropZone>
    </ImagesContainer>
  );
};

export default FileUploader;
