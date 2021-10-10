import { ImageInformation } from 'components/ImageFileUploader/hooks/useImageFileUploader';
import { EditorState } from 'draft-js';
import { atom } from 'recoil';

import { DESIGN, DesignInput, LEVEL, PAGE, PAGE_TYPE, PATTERN } from './types';

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DETAIL,
});

export const currentDesignInputAtom = atom<
  Omit<DesignInput, 'pattern' | 'techniques'> & { techniques: string }
>({
  key: 'currentDesignInput',
  default: {
    name: '',
    designType: DESIGN.SWEATER,
    patternType: PATTERN.TEXT,
    description: '',
    techniques: '',
    targetLevel: LEVEL.NORMAL,
    coverImageUrl: '',
    stitches: 0,
    rows: 0,
    size: {
      totalLength: 0,
      sleeveLength: 0,
      shoulderWidth: 0,
      bottomWidth: 0,
      armholeDepth: 0,
    },
    needle: '',
    yarn: '',
    extra: undefined,
  },
});

export const localCoverImageAtom = atom<ImageInformation[] | undefined>({
  key: 'localCoverImage',
  default: undefined,
});

export const editorStateAtom = atom<EditorState>({
  key: 'editorState',
  default: EditorState.createEmpty(),
});
