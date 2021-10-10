import { ONLY_UPLOAD_FILES_BELOW_10MB } from 'constants/errors';

import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { ChangeEvent, DragEvent, useState } from 'react';

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

interface Props {
  maximumSize: number;
  onChange(files: FileInformation[]): void;
}

type FileUploader = {
  onFileChange(event: ChangeEvent<HTMLInputElement>): void;
  onFileDrop(event: DragEvent<HTMLDivElement>): void;
};

export const useFileUploader = ({
  maximumSize,
  onChange,
}: Props): FileUploader => {
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
