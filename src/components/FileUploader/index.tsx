import { ONLY_UPLOAD_FILES_BELOW_10MB } from 'constants/errors';

import { Typography } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { flexCenterAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';

type FileMetadata = {
  name: string;
  size: number;
  type: string;
};

type FileInformation = {
  url: string;
  metadata: FileMetadata;
};

type ImageAccept = 'png' | 'jpeg' | 'jpg' | 'gif';

interface Props {
  isMultiple?: boolean;
  maximumSize?: number;
  imageAccepts?: ImageAccept[];
  width?: number;
  height?: number;
}

const FileUploader = ({
  isMultiple = false,
  maximumSize = 10000000,
  imageAccepts = ['png', 'jpeg', 'jpg', 'gif'],
  width = theme.spacing(40),
  height = theme.spacing(30),
}: Props): React.ReactElement | null => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const types = imageAccepts.map((accept) => `image/${accept}`);

  const [selectedFiles, setSelectedFiles] = useState<FileInformation[]>([]);
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

  const uploadFile = (files: FileList | null) => {
    if (files == null || files.length < 1) {
      return;
    }

    const mappingFiles = Array.from(files ?? []).map(
      (file): FileInformation => {
        const metadata = getFileMetadata(file);
        const url = URL.createObjectURL(file);

        return { url, metadata };
      },
    );

    const file = Array.from(files)[0];

    const fileSize = file.size;

    if (!validFileSize(fileSize)) {
      setIsOversized(true);
      return;
    }

    setSelectedFiles(mappingFiles);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target ?? {};

    uploadFile(files);
  };

  const handleOnDropZonClick = (): void => {
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
          <DropZoon width={width} height={height}>
            <img
              src={file.url}
              alt="업로드한 이미지"
              draggable="false"
              width={width}
              height={height}
            />
          </DropZoon>
        );
      })}
      <DropZoon
        onClick={handleOnDropZonClick}
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
      </DropZoon>
    </ImagesContainer>
  );
};

export default FileUploader;

const FileInput = styled.input`
  display: none;
`;

const ImagesContainer = styled.div`
  display: flex;
`;

const DropZoon = styled.div<{ width: number; height: number }>`
  cursor: pointer;
  border: 1px solid ${palette.grey[300]};
  border-radius: ${theme.spacing(1)};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-right: ${theme.spacing(2)};

  img {
    object-fit: contain;
  }
`;

const UploadContainer = styled.div`
  ${flexCenterAlign}

  height: 100%;
  color: ${palette.text.secondary};
  flex-direction: column;

  svg {
    font-size: 3rem;
    margin-bottom: ${theme.spacing(2)};
  }
`;
