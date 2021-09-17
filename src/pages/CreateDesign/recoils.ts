import { FileInformation } from 'components/FileUploader';
import { EditorState } from 'draft-js';
import { atom } from 'recoil';

import { DESIGN, DesignInput, LEVEL, PAGE, PAGE_TYPE, PATTERN } from './types';

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DETAIL,
});

export const currentDesignInputAtom = atom<DesignInput>({
  key: 'currentDesignInput',
  default: {
    name: '',
    designType: DESIGN.SWEATER,
    patternType: PATTERN.TEXT,
    description: '',
    techniques: '',
    targetLevel: LEVEL.NORMAL,
    stitches: 0,
    rows: 0,
    totalLength: 0,
    sleeveLength: 0,
    shoulderWidth: 0,
    bottomWidth: 0,
    armholeDepth: 0,
    needle: '',
    yarn: '',
    extra: undefined,
    pattern: '',
  },
});

export const localCoverImageAtom = atom<FileInformation[] | undefined>({
  key: 'localCoverImage',
  default: undefined,
});

export const editorStateAtom = atom<EditorState>({
  key: 'editorState',
  default: EditorState.createEmpty(),
});
