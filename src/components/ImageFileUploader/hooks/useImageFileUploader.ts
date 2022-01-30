import { ONLY_UPLOAD_FILES_BELOW_10MB } from 'constants/errors';

import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { ChangeEvent, DragEvent, useState } from 'react';

type ImageMetadata = {
  name: string;
  size: number;
  type: string;
};

export type ImageInformation = {
  url: string;
  metadata: ImageMetadata;
  file: File;
};

interface Props {
  maximumSize: number;
  onChange(files: ImageInformation[]): void;
}

type ImageFileUploader = {
  onFileChange(event: ChangeEvent<HTMLInputElement>): void;
  onFileDrop(event: DragEvent<HTMLDivElement>): void;
};

export const useImageFileUploader = ({
  maximumSize,
  onChange,
}: Props): ImageFileUploader => {
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
      return true;
    }

    const hasOversized = Array.from(files).some(
      ({ size }) => !validFileSize(size),
    );

    if (hasOversized) {
      setIsOversized(true);
      return true;
    }

    return false;
  };

  const uploadFile = (files: FileList | null) => {
    if (isInvalidFiles(files)) {
      return;
    }

    const mappingFiles = Array.from(files ?? []).map(
      (file): ImageInformation => {
        const metadata = getFileMetadata(file);
        const url = URL.createObjectURL(file);

        return { url, metadata, file };
      },
    );

    onChange(mappingFiles);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target ?? {};

    uploadFile(files);
  };

  const onFileDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    uploadFile(files);
  };

  return { onFileChange, onFileDrop };
};
