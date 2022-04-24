import { useCommonSnackbar } from 'knitting/components/CommonSnackbar/useCommonSnackbar';
import { MY_INFORMATION_ROUTER_ROOT } from 'knitting/constants/path';
import useFirebaseImageStorage from 'knitting/hooks/useFirebaseImageStorage';
import { usePost } from 'knitting/hooks/usePost';

import { convertToRaw } from 'draft-js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  coverInputAtom,
  outlineInputAtom,
  editorStateAtom,
  localCoverImageAtom,
  optionalOutlineInputAtom,
  draftIdAtom,
} from '../../../atom';
import { PostDesignInput, PostDraftDesign } from '../../../types';

type SaveDesign = {
  draftDesign: () => void;
  saveDesign: () => void;
  uploadFile: (() => void) | undefined;
};

export const useSaveDesign = (): SaveDesign => {
  const { name, coverImageUrl, description } = useRecoilValue(coverInputAtom);
  const { price, designType, patternType, stitches, rows, needle } =
    useRecoilValue(outlineInputAtom);
  const { size, yarn, extra, targetLevel, techniques } = useRecoilValue(
    optionalOutlineInputAtom,
  );
  const {
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
  } = size;

  const editorState = useRecoilValue(editorStateAtom);
  const localCoverImage = useRecoilValue(localCoverImageAtom);
  const [draftId, setDraftId] = useRecoilState(draftIdAtom);

  const { uploadResults, uploadFile } = useFirebaseImageStorage({
    path: 'designs/cover-image',
    fileInformationList: localCoverImage,
  });

  const { mutate: saveMutate } = usePost<number, PostDesignInput>({
    pathname: '/designs',
    onSuccess: () => navigate(MY_INFORMATION_ROUTER_ROOT),
  });

  const navigate = useNavigate();

  const { isSuccess, mutate: draftMutate } = usePost<number, PostDraftDesign>({
    pathname: 'designs/draft',
    onSuccess: (id) => {
      setDraftId(id);
    },
  });

  useCommonSnackbar({
    message: '도안이 임시저장 되었습니다.',
    severity: 'success',
    dependencies: [isSuccess],
  });

  const getDesignData = (): Omit<PostDesignInput, 'draft_id'> => {
    const pattern = `${JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    )}`;

    const separatedTechniques = techniques.split(',');

    return {
      name,
      cover_image_url: coverImageUrl,
      design_type: designType,
      pattern_type: patternType,
      stitches,
      rows,
      size: {
        total_length: totalLength,
        sleeve_length: sleeveLength,
        shoulder_width: shoulderWidth,
        bottom_width: bottomWidth,
        armhole_depth: armholeDepth,
      },
      needle,
      yarn,
      extra,
      price,
      description,
      target_level: targetLevel,
      pattern,
      techniques: separatedTechniques,
    };
  };

  const draftDesign = (): void => {
    draftMutate({
      id: draftId,
      design_id: null,
      value: JSON.stringify(getDesignData()),
    });
  };

  const saveDesign = (): void => {
    saveMutate({
      ...getDesignData(),
      draft_id: draftId,
    });
  };

  useEffect(() => {
    const imageUrl = uploadResults.map(({ url }) => url)[0];

    if (imageUrl != null) {
      saveDesign();
    }
  }, [uploadResults]);

  return { draftDesign, saveDesign, uploadFile };
};
