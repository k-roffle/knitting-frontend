import { ImageInformation } from 'components/ImageFileUploader/hooks/useImageFileUploader';
import { EditorState } from 'draft-js';
import { atom } from 'recoil';

import { DESIGN, DesignInput, LEVEL, PAGE, PAGE_TYPE, PATTERN } from './types';

type CurrentDesignInput = Omit<
  DesignInput,
  'pattern' | 'techniques' | 'coverImageUrl'
> & {
  techniques: string;
};

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DETAIL,
});

export const currentDesignInputAtom = atom<CurrentDesignInput>({
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

export const localCoverImageAtom = atom<ImageInformation[]>({
  key: 'localCoverImage',
  default: [],
});

export const editorStateAtom = atom<EditorState>({
  key: 'editorState',
  default: EditorState.createEmpty(),
});
