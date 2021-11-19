import { MY_INFORMATION_ROUTER_ROOT } from 'constants/path';

import { convertToRaw } from 'draft-js';
import useFirebaseImageStorage from 'hooks/useFirebaseImageStorage';
import { usePost } from 'hooks/usePost';
import {
  currentDesignInputAtom,
  editorStateAtom,
  localCoverImageAtom,
} from 'pages/CreateDesign/atom';
import { PostDesignInput } from 'pages/CreateDesign/types';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const useSaveDesign = (): (() => void) | undefined => {
  const {
    name,
    designType,
    patternType,
    stitches,
    rows,
    size,
    needle,
    yarn,
    extra,
    description,
    targetLevel,
    techniques,
  } = useRecoilValue(currentDesignInputAtom);
  const {
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
  } = size;

  const editorState = useRecoilValue(editorStateAtom);
  const localCoverImage = useRecoilValue(localCoverImageAtom);

  const { uploadResults, uploadFile } = useFirebaseImageStorage({
    path: 'designs/cover-image',
    fileInformationList: localCoverImage,
  });

  const { mutate } = usePost({
    pathname: '/design',
    onSuccess: () => history.push(MY_INFORMATION_ROUTER_ROOT),
  });

  const history = useHistory();

  const saveDesign = (coverImageUrl: string): void => {
    const pattern = `${JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    )}`;

    const separatedTechniques = techniques.split(',');
    const postDesignData: PostDesignInput = {
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
      description,
      target_level: targetLevel,
      pattern,
      techniques: separatedTechniques,
    };

    mutate(postDesignData);
  };

  useEffect(() => {
    const coverImageUrl = uploadResults.map(({ url }) => url)[0];

    if (coverImageUrl != null) {
      saveDesign(coverImageUrl);
    }
  }, [uploadResults]);

  return uploadFile;
};
