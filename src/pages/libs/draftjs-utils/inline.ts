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
  isAlready: boolean;
  onChageCustomStyleMap: (customStyleMap: DraftStyleMap) => void;
}

export const toggleCustomInlineStyle = ({
  editorState,
  styleType,
  style,
  isAlready,
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
    if (!isAlready) {
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

/**
 * Function returns size at a offset.
 */

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

/**
 * Function returns an object of custom inline styles currently applicable.
 */

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
