import { FAILED_TO_UPLOAD_IMAGE } from 'constants/errors';

import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { FileInformation } from 'components/FileUploader';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  StorageError,
  UploadTaskSnapshot,
  UploadTask,
} from 'firebase/storage';
import firebaseInit from 'firebaseInit';
import decodeJwtToken from 'jwt-decode';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAccessToken, TokenPayload } from 'utils/auth';

interface Props {
  folder: string;
  subFolder: string;
}

type UploadStorage = {
  progress: number;
  error?: StorageError;
  url?: string;
};

const useFirebaseStorage = ({
  folder,
  subFolder,
}: Props):
  | (Pick<UploadStorage, 'progress' | 'url'> & {
      uploadFile(fileInformation: FileInformation): void;
    })
  | undefined => {
  const history = useHistory();
  const token = getAccessToken();

  if (token == null) {
    history.push('/login');
    return;
  }

  const [uploadResult, setUploadResult] = useState<UploadStorage>({
    progress: 0,
  });

  const { progress, error, url } = uploadResult ?? {};

  useCommonSnackbar({
    message: FAILED_TO_UPLOAD_IMAGE,
    severity: 'error',
    dependencies: [error],
  });

  const storage = getStorage(firebaseInit());
  const { id }: TokenPayload = decodeJwtToken(token);

  const onLoading = ({ bytesTransferred, totalBytes }: UploadTaskSnapshot) => {
    const percentage = Math.floor((bytesTransferred / totalBytes) * 100);

    setUploadResult({ ...uploadResult, progress: percentage });
  };

  const onError = (uploadError: StorageError) => {
    setUploadResult({ ...uploadResult, error: uploadError });
  };

  const onComplete = (uploadTask: UploadTask) => (): void => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
      setUploadResult({ ...uploadResult, url: downloadURL }),
    );
  };

  const uploadFile = async (fileInformation: FileInformation) => {
    const { metadata, file } = fileInformation;
    const extension = metadata.type.split('/')[1];
    const storageRef = ref(
      storage,
      `${folder}/${subFolder}/${id}/${Date.now()}.${extension}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', onLoading, onError, onComplete(uploadTask));
  };

  return { progress, url, uploadFile };
};

export default useFirebaseStorage;
