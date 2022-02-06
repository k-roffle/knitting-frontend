import { DraftStyleMap, EditorState } from 'draft-js';
import { getSelectionCustomInlineStyle } from 'knitting/libs/draftjs-utils/inline';

import { DEFAULT_FONT_SIZE } from './constants';

export const getCurrentFontSize = (
  editorState: EditorState,
  customStyleMap: DraftStyleMap,
): number | undefined => {
  const selectionCustomInlineStyle = getSelectionCustomInlineStyle(
    editorState,
    ['FONTSIZE'],
  );

  return Object.keys(selectionCustomInlineStyle).includes('FONTSIZE')
    ? Number(
        customStyleMap[selectionCustomInlineStyle.FONTSIZE]?.fontSize ??
          DEFAULT_FONT_SIZE,
      )
    : undefined;
};
