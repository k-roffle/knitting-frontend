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

type CurrentCoverInput = Pick<
  DesignInput,
  'name' | 'coverImageUrl' | 'description'
>;

type CurrentOutlineInput = Pick<
  DesignInput,
  'designType' | 'patternType' | 'stitches' | 'rows' | 'needle'
>;

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.COVER,
});

export const currentCoverInputAtom = atom<CurrentCoverInput>({
  key: 'currentCoverInputAtom',
  default: {
    name: '',
    coverImageUrl: '',
    description: '',
  },
});

export const coverImageAtom = atom<ImageInformation[] | undefined>({
  key: 'coverImageAtom',
  default: undefined,
});

export const currentOutlineInputAtom = atom<CurrentOutlineInput>({
  key: 'currentOutlineInputAtom',
  default: {
    designType: DESIGN.SWEATER,
    patternType: PATTERN.TEXT,
    stitches: 0,
    rows: 0,
    needle: '',
  },
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
