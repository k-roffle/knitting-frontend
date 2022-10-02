import { ImageInformation } from 'knitting/components/ImageFileUploader/hooks/useImageFileUploader';
import { getAccessToken, TokenPayload } from 'knitting/utils/auth';

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
import { useState } from 'react';

import firebaseInit from '../firebaseInit';

type UploadStorage = {
  localFileId: string;
  progress?: number;
  error?: StorageError;
  url?: string;
};

type FirebaseImageStorage = {
  downloadUrl: string;
  uploadFile?: (path: string, fileInformationList: ImageInformation[]) => void;
};

const getUpdatedUploadResult = (
  localFileId: string,
  updatedUploadResult: UploadStorage,
  originUploadResult: UploadStorage,
): UploadStorage => {
  return updatedUploadResult.localFileId === localFileId
    ? originUploadResult
    : updatedUploadResult;
};

const useFirebaseImageStorage = (): FirebaseImageStorage => {
  const token = getAccessToken();

  if (token == null) {
    return {
      downloadUrl: '',
    };
  }

  const [uploadResults, setUploadResults] = useState<UploadStorage[]>([]);
  const [downloadUrl, setDownloadUrl] = useState('');

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

  const onComplete = (uploadTask: UploadTask): void => {
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      setDownloadUrl(url);
    });
  };

  const uploadFile = (
    path: string,
    fileInformationList: ImageInformation[],
  ) => {
    fileInformationList.forEach((fileInformation) => {
      const { metadata, file, url } = fileInformation;
      const extension = metadata.type.split('/')[1];
      const storageRef = ref(
        storage,
        `${path}/${userId}/${Date.now()}.${extension}`,
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => onLoading(snapshot, url),
        (error) => onError(error, url),
        () => onComplete(uploadTask),
      );
    });
  };

  return { downloadUrl, uploadFile };
};

export default useFirebaseImageStorage;
