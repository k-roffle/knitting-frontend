import { ImageInformation } from 'knitting/components/ImageFileUploader/hooks/useImageFileUploader';

import { EditorState } from 'draft-js';
import { atom } from 'recoil';

import { SnakeToCamelCase } from '../../utils/types';

import {
  DESIGN,
  DesignInput,
  DesignSize,
  PAGE,
  PAGE_TYPE,
  PATTERN,
} from './types';

export type CoverInput = Pick<
  DesignInput,
  'name' | 'coverImageUrl' | 'description'
>;

export type OutlineInput = Pick<
  DesignInput,
  'price' | 'designType' | 'patternType' | 'stitches' | 'rows' | 'needle'
>;

export type OptionalOutlineInput = Pick<
  DesignInput,
  'targetLevel' | 'yarn' | 'extra'
> & {
  techniques: string | null;
  size: SnakeToCamelCase<DesignSize>;
};

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'editCurrentStep',
  default: PAGE.COVER,
});

export const stepValidationsAtom = atom<(boolean | undefined)[]>({
  key: 'stepValidations',
  default: new Array(PAGE.REVIEW).fill(undefined),
});

export const coverInputAtom = atom<CoverInput>({
  key: 'coverInputAtom',
  default: {
    name: '',
    coverImageUrl: '',
    description: null,
  },
});

export const coverImageAtom = atom<ImageInformation | undefined>({
  key: 'coverImageAtom',
  default: undefined,
});

export const outlineInputAtom = atom<OutlineInput>({
  key: 'outlineInputAtom',
  default: {
    price: 0,
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
    techniques: null,
    targetLevel: null,
    size: {
      totalLength: 0,
      shoulderWidth: 0,
      bottomWidth: 0,
      armholeDepth: 0,
      sleeveLength: 0,
    },
    yarn: null,
    extra: null,
  },
});

export const editorStateAtom = atom<EditorState>({
  key: 'editorState',
  default: EditorState.createEmpty(),
});

export const draftIdAtom = atom<string | null>({
  key: 'draftId',
  default: null,
});

export const isShowSaveModalAtom = atom<boolean>({
  key: 'isShowSaveModal',
  default: false,
});

export const sizeValidationAtom = atom<boolean>({
  key: 'sizeValidation',
  default: true,
});
