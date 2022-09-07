import {
  coverImageAtom,
  coverInputAtom,
  currentStepAtom,
  editorStateAtom,
  isShowSaveModalAtom,
  outlineInputAtom,
  stepValidationsAtom,
} from 'knitting/pages/EditDesign/atom';

import { useResetRecoilState } from 'recoil';

const useDesignAtom = () => {
  const resetCurrentStep = useResetRecoilState(currentStepAtom);
  const resetCoverInput = useResetRecoilState(coverInputAtom);
  const resetCoverImage = useResetRecoilState(coverImageAtom);
  const resetOutlineInput = useResetRecoilState(outlineInputAtom);
  const resetEditorState = useResetRecoilState(editorStateAtom);
  const resetStepValidation = useResetRecoilState(stepValidationsAtom);
  const resetIsShowSaveModal = useResetRecoilState(isShowSaveModalAtom);

  const resetSaveDesignAtom = () => {
    resetCurrentStep();
    resetCoverInput();
    resetCoverImage();
    resetOutlineInput();
    resetEditorState();
    resetStepValidation();
    resetIsShowSaveModal();
  };

  return { resetSaveDesignAtom };
};

export default useDesignAtom;
