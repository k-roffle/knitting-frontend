import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  StorageError,
  UploadTaskSnapshot,
  UploadTask,
} from 'firebase/storage';
import decodeJwtToken from 'jwt-decode';
import { useCommonSnackbar } from 'knitting/components/CommonSnackbar/useCommonSnackbar';
import { ImageInformation } from 'knitting/components/ImageFileUploader/hooks/useImageFileUploader';
import { FAILED_TO_UPLOAD_IMAGE } from 'knitting/constants/errors';
import { getAccessToken, TokenPayload } from 'knitting/utils/auth';
import { useEffect, useState } from 'react';

import firebaseInit from '../firebaseInit';

type UploadStorage = {
  localFileId: string;
  progress?: number;
  error?: StorageError;
  url?: string;
};

type FirebaseImageStorage = {
  uploadResults: UploadStorage[];
  uploadFile?(): void;
};

interface Props {
  path: string;
  fileInformationList: ImageInformation[];
}

const getUpdatedUploadResult = (
  localFileId: string,
  updatedUploadResult: UploadStorage,
  originUploadResult: UploadStorage,
): UploadStorage => {
  return updatedUploadResult.localFileId === localFileId
    ? originUploadResult
    : updatedUploadResult;
};

const useFirebaseImageStorage = ({
  path,
  fileInformationList,
}: Props): FirebaseImageStorage => {
  const token = getAccessToken();

  if (token == null) {
    return {
      uploadResults: [],
    };
  }

  const [uploadResults, setUploadResults] = useState<UploadStorage[]>([]);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useCommonSnackbar({
    message: FAILED_TO_UPLOAD_IMAGE,
    severity: 'error',
    dependencies: [showErrorToast],
  });

  const storage = getStorage(firebaseInit());
  const { id: userId }: TokenPayload = decodeJwtToken(token);

  const onLoading = (
    { bytesTransferred, totalBytes }: UploadTaskSnapshot,
    localFileId: string,
  ) => {
    const progress = Math.floor((bytesTransferred / totalBytes) * 100);
    const updatedUploadResults = uploadResults.map((uploadResult) =>
      getUpdatedUploadResult(localFileId, uploadResult, {
        progress,
        ...uploadResult,
      }),
    );

    setUploadResults(updatedUploadResults);
  };

  const onError = (uploadError: StorageError, localFileId: string) => {
    const updatedUploadResults = uploadResults.map((uploadResult) =>
      getUpdatedUploadResult(localFileId, uploadResult, {
        error: uploadError,
        ...uploadResult,
      }),
    );

    setUploadResults(updatedUploadResults);
  };

  const onComplete = (uploadTask: UploadTask, localFileId: string): void => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const updatedUploadResults = uploadResults.map((uploadResult) =>
        getUpdatedUploadResult(localFileId, uploadResult, {
          url: downloadURL,
          ...uploadResult,
        }),
      );

      setUploadResults(updatedUploadResults);
    });
  };

  const uploadFile = async (): Promise<void> => {
    fileInformationList.forEach((fileInformation) => {
      const { metadata, file, url } = fileInformation;
      const extension = metadata.type.split('/')[1];
      const storageRef = ref(
        storage,
        `${path}/${userId}/${Date.now()}.${extension}`,
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploadResults(
        uploadResults.concat({
          localFileId: url,
        }),
      );
      uploadTask.on(
        'state_changed',
        (snapshot) => onLoading(snapshot, url),
        (error) => onError(error, url),
        () => onComplete(uploadTask, url),
      );
    });
  };

  useEffect(() => {
    const hasError = uploadResults.some(({ error }) => error);

    setShowErrorToast(hasError);
  }, [uploadResults]);

  useEffect(() => {
    const initialUploadResult = fileInformationList.map(
      ({ url }): UploadStorage => {
        return {
          localFileId: url,
        };
      },
    );

    setUploadResults(initialUploadResult);
  }, [fileInformationList]);

  return { uploadResults, uploadFile };
};

export default useFirebaseImageStorage;
