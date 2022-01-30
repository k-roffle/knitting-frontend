import { ImageInformation } from 'components/ImageFileUploader/hooks/useImageFileUploader';
import { EditorState } from 'draft-js';
import { atom } from 'recoil';

import { DESIGN, DesignInput, LEVEL, PAGE, PAGE_TYPE, PATTERN } from './types';

export type CoverInput = Pick<
  DesignInput,
  'name' | 'coverImageUrl' | 'description'
>;

export type OutlineInput = Pick<
  DesignInput,
  'designType' | 'patternType' | 'stitches' | 'rows' | 'needle'
>;

export type OptionalOutlineInput = Pick<
  DesignInput,
  'targetLevel' | 'yarn' | 'extra' | 'size'
> & {
  techniques: string;
};

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.COVER,
});

export const coverInputAtom = atom<CoverInput>({
  key: 'coverInputAtom',
  default: {
    name: '',
    coverImageUrl: '',
    description: '',
  },
});

export const coverImageAtom = atom<ImageInformation | undefined>({
  key: 'coverImageAtom',
  default: undefined,
});

export const outlineInputAtom = atom<OutlineInput>({
  key: 'outlineInputAtom',
  default: {
    designType: DESIGN.SWEATER,
    patternType: PATTERN.TEXT,
    stitches: 0,
    rows: 0,
    needle: '',
  },
});

export const optionalOutlineInputAtom = atom<OptionalOutlineInput>({
  key: 'optionalOutlineInputAtom',
  default: {
    techniques: '',
    targetLevel: LEVEL.NORMAL,
    size: {
      totalLength: 0,
      sleeveLength: 0,
      shoulderWidth: 0,
      bottomWidth: 0,
      armholeDepth: 0,
    },
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
