import {
  ContentBlock,
  DraftStyleMap,
  EditorState,
  Modifier,
  RichUtils,
} from 'draft-js';

import { getSelectedBlocksList } from './block';

export type StyleKeyType =
  | 'color'
  | 'bgcolor'
  | 'fontSize'
  | 'fontFamily'
  | 'CODE'
  | 'STITCH_CALCULATE_ROUND'
  | 'STITCH_CALCULATE_ROUND_UP'
  | 'STITCH_CALCULATE_ROUND_DOWN'
  | 'ROW_CALCULATE_ROUND'
  | 'ROW_CALCULATE_ROUND_UP'
  | 'ROW_CALCULATE_ROUND_DOWN'
  | 'STITCH_REPEAT_CALCULATE_ROUND'
  | 'STITCH_REPEAT_CALCULATE_ROUND_UP'
  | 'STITCH_REPEAT_CALCULATE_ROUND_DOWN'
  | 'ROW_REPEAT_CALCULATE_ROUND'
  | 'ROW_REPEAT_CALCULATE_ROUND_UP'
  | 'ROW_REPEAT_CALCULATE_ROUND_DOWN'
  | 'NOT_CALCULATE'
  | 'FONTSIZE';

type StyleMapType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgcolor?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fontSize?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fontFamily?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CODE?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  STITCH_CALCULATE_ROUND_UP?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  STITCH_CALCULATE_ROUND_DOWN?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  STITCH_CALCULATE_ROUND?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ROW_CALCULATE_ROUND_UP?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ROW_CALCULATE_ROUND_DOWN?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ROW_CALCULATE_ROUND?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  STITCH_REPEAT_CALCULATE_ROUND?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  STITCH_REPEAT_CALCULATE_ROUND_UP?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  STITCH_REPEAT_CALCULATE_ROUND_DOWN?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ROW_REPEAT_CALCULATE_ROUND?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ROW_REPEAT_CALCULATE_ROUND_UP?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ROW_REPEAT_CALCULATE_ROUND_DOWN?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  NOT_CALCULATE?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FONTSIZE?: any;
};

interface AddToCustomStyleMap {
  styleType: StyleKeyType;
  styleKey: string;
  style: string | number;
  onChageCustomStyleMap: (customStyleMap: DraftStyleMap) => void;
}

const addToCustomStyleMap = ({
  styleType,
  styleKey,
  style,
  onChageCustomStyleMap,
}: AddToCustomStyleMap): void => {
  const newCustomInlineStylesMap = Object.assign(customInlineStylesMap, {
    [`${styleType.toLowerCase()}-${style}`]: {
      [`${styleKey}`]: style,
    },
  });

  onChageCustomStyleMap(newCustomInlineStylesMap);
};

interface ToggleCustomInlineStyle {
  editorState: EditorState;
  styleType: StyleKeyType;
  style: string | number;
  isAlreadyApplyed: boolean;
  onChageCustomStyleMap: (customStyleMap: DraftStyleMap) => void;
}

export const toggleCustomInlineStyle = ({
  editorState,
  styleType,
  style,
  isAlreadyApplyed,
  onChageCustomStyleMap,
}: ToggleCustomInlineStyle): EditorState => {
  const selection = editorState.getSelection();
  const nextContentState = Object.keys(customInlineStylesMap[styleType]).reduce(
    (contentState, inlineStyle) =>
      Modifier.removeInlineStyle(contentState, selection, inlineStyle),
    editorState.getCurrentContent(),
  );
  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    'change-inline-style',
  );
  const currentStyle = editorState.getCurrentInlineStyle();

  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce(
      (state?: EditorState, inlineStyle?: string) => {
        if (state != null && inlineStyle != null) {
          return RichUtils.toggleInlineStyle(state, inlineStyle);
        }
        return editorState;
      },
      nextEditorState,
    );
  }

  const styleKey = styleType === 'bgcolor' ? 'backgroundColor' : styleType;

  if (!currentStyle.has(`${styleType}-${style}`)) {
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      `${styleType.toLowerCase()}-${style}`,
    );
    if (!isAlreadyApplyed) {
      addToCustomStyleMap({
        styleType,
        styleKey,
        style,
        onChageCustomStyleMap,
      });
    }
  }

  return nextEditorState;
};

export const customInlineStylesMap: StyleMapType = {
  color: {},
  bgcolor: {},
  fontSize: {},
  fontFamily: {},
  CODE: {},
};

const getCurrentInlineStyle = (
  editorState: EditorState,
  stylePrefix: string,
): string | undefined => {
  const styles = editorState.getCurrentInlineStyle().toList();

  const filteredStyle = styles.filter(
    (style) => style != null && style.startsWith(stylePrefix.toLowerCase()),
  );

  if (filteredStyle && filteredStyle.size > 0) {
    return filteredStyle.get(0);
  }

  return undefined;
};

const getStyleAtOffset = (
  block: ContentBlock,
  stylePrefix: string,
  offset: number,
): string | undefined => {
  const styles = block.getInlineStyleAt(offset).toList();
  const filteredStyle = styles.filter(
    (style) => style != null && style.startsWith(stylePrefix.toLowerCase()),
  );

  if (filteredStyle && filteredStyle.size > 0) {
    return filteredStyle.get(0);
  }

  return undefined;
};

export const getSelectionCustomInlineStyle = (
  editorState: EditorState,
  styles: StyleKeyType[],
): StyleMapType => {
  if (editorState && styles && styles.length > 0) {
    const currentSelection = editorState.getSelection();
    const inlineStyles: StyleMapType = {};

    if (currentSelection.isCollapsed()) {
      styles.forEach((style) => {
        inlineStyles[style] = getCurrentInlineStyle(editorState, style);
      });
      return inlineStyles;
    }
    const start = currentSelection.getStartOffset();
    const end = currentSelection.getEndOffset();
    const selectedBlocks = getSelectedBlocksList(editorState);

    if (selectedBlocks.size > 0) {
      for (let index = 0; index < selectedBlocks.size; index += 1) {
        let blockStart = index === 0 ? start : 0;
        let blockEnd =
          index === selectedBlocks.size - 1
            ? end
            : selectedBlocks.get(index).getText().length;

        if (blockStart === blockEnd && blockStart === 0) {
          blockStart = 1;
          blockEnd = 2;
        } else if (blockStart === blockEnd) {
          blockStart -= 1;
        }
        for (let j = blockStart; j < blockEnd; j += 1) {
          if (j === blockStart) {
            styles.forEach((style) => {
              inlineStyles[style] = getStyleAtOffset(
                selectedBlocks.get(index),
                style,
                j,
              );
            });
          } else {
            styles.forEach((style) => {
              if (
                inlineStyles[style] &&
                inlineStyles[style] !==
                  getStyleAtOffset(selectedBlocks.get(index), style, j)
              ) {
                inlineStyles[style] = undefined;
              }
            });
          }
        }
      }
      return inlineStyles;
    }
  }
  return {};
};

interface ChangeOriginalStyleToNewStyle {
  editorState: EditorState;
  originalStyle: StyleKeyType;
  newStyle?: StyleKeyType;
  blockKey?: string;
  originalOffset?: number;
  startOffset?: number;
  endOffset?: number;
}

export const changeOriginalStyleToNeweStyle = ({
  blockKey,
  editorState,
  originalStyle,
  newStyle,
  originalOffset,
  startOffset,
  endOffset,
}: ChangeOriginalStyleToNewStyle): EditorState => {
  const selectionState = editorState.getSelection();
  const originalSelection = selectionState.merge({
    anchorKey: selectionState.getAnchorKey(),
    focusKey: selectionState.getFocusKey(),
    anchorOffset: originalOffset ?? selectionState.getAnchorOffset(),
    focusOffset: originalOffset ?? selectionState.getFocusOffset(),
  });

  const newSelection = selectionState.merge({
    focusKey: blockKey,
    anchorOffset: startOffset,
    focusOffset: endOffset,
  });

  const editorStateWithNewSelection = EditorState.forceSelection(
    editorState,
    newSelection,
  );

  const editorStateWithToggleOriginalStyle = RichUtils.toggleInlineStyle(
    editorStateWithNewSelection,
    originalStyle,
  );

  let editorStateWithNewStyle;

  if (newStyle == null) {
    editorStateWithNewStyle = editorStateWithToggleOriginalStyle;
  } else {
    editorStateWithNewStyle = RichUtils.toggleInlineStyle(
      editorStateWithToggleOriginalStyle,
      newStyle,
    );
  }

  const editorStateWithNewStyleAndPreviousSelection = EditorState.forceSelection(
    editorStateWithNewStyle,
    originalSelection,
  );

  return editorStateWithNewStyleAndPreviousSelection;
};
