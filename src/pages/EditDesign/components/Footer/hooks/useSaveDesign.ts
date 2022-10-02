import { useCommonSnackbar } from 'knitting/components/CommonSnackbar/useCommonSnackbar';
import { ImageInformation } from 'knitting/components/ImageFileUploader/hooks/useImageFileUploader';
import useDesignAtom from 'knitting/hooks/useDesignAtom';
import useFirebaseImageStorage from 'knitting/hooks/useFirebaseImageStorage';
import { usePost } from 'knitting/hooks/usePost';
import {
  coverInputAtom,
  outlineInputAtom,
  editorStateAtom,
  optionalOutlineInputAtom,
  draftIdAtom,
  isShowSaveModalAtom,
} from 'knitting/pages/EditDesign/atom';
import {
  DraftDesign,
  PostDesignInput,
  PostDraftDesign,
} from 'knitting/pages/EditDesign/types';
import { ObjectResponse } from 'knitting/utils/requestType';

import { convertToRaw } from 'draft-js';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

type SaveDesign = {
  draftDesign: () => void;
  saveDesign: () => void;
  uploadFile:
    | ((path: string, fileInformationList: ImageInformation[]) => void)
    | undefined;
};

export const useSaveDesign = (): SaveDesign => {
  const { name, coverImageUrl, description } = useRecoilValue(coverInputAtom);
  const setCoverInput = useSetRecoilState(coverInputAtom);
  const { price, designType, patternType, stitches, rows, needle } =
    useRecoilValue(outlineInputAtom);
  const { size, yarn, extra, targetLevel, techniques } = useRecoilValue(
    optionalOutlineInputAtom,
  );
  const editorState = useRecoilValue(editorStateAtom);
  const [draftId, setDraftId] = useRecoilState(draftIdAtom);
  const setIsShowSaveModal = useSetRecoilState(isShowSaveModalAtom);
  const { resetSaveDesignAtom } = useDesignAtom();

  const { downloadUrl, uploadFile } = useFirebaseImageStorage();

  const handleSaveDesign = () => {
    setIsShowSaveModal(true);
    resetSaveDesignAtom();
  };

  const {
    isSuccess: saveDesignSuccess,
    isError: saveDesignError,
    mutate: saveMutate,
  } = usePost<string, PostDesignInput>({
    pathname: '/designs',
    onSuccess: handleSaveDesign,
  });

  const {
    isSuccess: draftDesignSuccess,
    isError: draftDesignError,
    mutate: draftMutate,
  } = usePost<ObjectResponse<DraftDesign>, PostDraftDesign>({
    pathname: 'designs/draft',
    onSuccess: ({ payload }) => {
      setDraftId(payload.id);
    },
  });

  useCommonSnackbar({
    message: draftDesignSuccess
      ? '도안이 임시저장 되었습니다.'
      : '도안이 생성되었습니다.',
    severity: 'success',
    dependencies: [draftDesignSuccess, saveDesignSuccess],
  });

  useCommonSnackbar({
    message: draftDesignError
      ? '도안을 임시저장하는데 실패했습니다.'
      : '도안을 등록하는데 실패했습니다.',
    severity: 'error',
    dependencies: [draftDesignError, saveDesignError],
  });

  const getDesignData = (): Omit<PostDesignInput, 'draft_id'> => {
    const pattern = `${JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    )}`;

    const totalSize =
      size.totalLength +
      size.sleeveLength +
      size.shoulderWidth +
      size.bottomWidth +
      size.armholeDepth;

    return {
      name,
      cover_image_url: coverImageUrl,
      design_type: designType,
      pattern_type: patternType,
      stitches,
      rows,
      size:
        totalSize > 0
          ? {
              total_length: size.totalLength,
              sleeve_length: size.sleeveLength,
              shoulder_width: size.shoulderWidth,
              bottom_width: size.bottomWidth,
              armhole_depth: size.armholeDepth,
            }
          : null,
      needle,
      yarn,
      extra,
      price,
      description,
      target_level: targetLevel,
      pattern,
      techniques: techniques?.split(',') || null,
    };
  };

  const draftDesign = (): void => {
    draftMutate({
      design_id: null,
      id: draftId,
      value: JSON.stringify(getDesignData()),
    });
  };

  const saveDesign = (): void => {
    saveMutate({
      ...getDesignData(),
      draft_id: null,
    });
  };

  useEffect(() => {
    if (downloadUrl) {
      setCoverInput((currVal) => ({
        ...currVal,
        coverImageUrl: downloadUrl,
      }));
    }
  }, [downloadUrl]);

  return { draftDesign, saveDesign, uploadFile };
};
