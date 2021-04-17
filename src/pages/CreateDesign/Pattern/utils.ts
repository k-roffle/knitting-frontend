import { DraftStyleMap, EditorState } from 'draft-js';
import { getSelectionCustomInlineStyle } from 'pages/libs/draftjs-utils/inline';

import { defaultFontSize } from './types';

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
          defaultFontSize,
      )
    : undefined;
};
