import { ContentBlock, EditorState, Modifier, RichUtils } from 'draft-js';

import { getSelectedBlocksList } from './block';
import {
  AddToCustomStyleMap,
  ChangeOriginalStyleToNewStyle,
  StyleKeyType,
  StyleMapType,
  ToggleCustomInlineStyle,
} from './types';

const addToCustomStyleMap = ({
  styleType,
  styleKey,
  style,
  onChangeCustomStyleMap,
}: AddToCustomStyleMap): void => {
  const newCustomInlineStylesMap = Object.assign(customInlineStylesMap, {
    [`${styleType.toLowerCase()}-${style}`]: {
      [`${styleKey}`]: style,
    },
  });

  onChangeCustomStyleMap(newCustomInlineStylesMap);
};

export const toggleCustomInlineStyle = ({
  editorState,
  styleType,
  style,
  isAlreadyApplied,
  onChangeCustomStyleMap,
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
    if (!isAlreadyApplied) {
      addToCustomStyleMap({
        styleType,
        styleKey,
        style,
        onChangeCustomStyleMap,
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

export const changeOriginalStyleToNewStyle = ({
  editorState,
  originalStyle,
  newStyle,
  newSelection,
  originalOffset,
}: ChangeOriginalStyleToNewStyle): EditorState => {
  const selectionState = editorState.getSelection();
  const originalSelection = selectionState.merge({
    anchorKey: selectionState.getAnchorKey(),
    focusKey: selectionState.getFocusKey(),
    anchorOffset: originalOffset ?? selectionState.getAnchorOffset(),
    focusOffset: originalOffset ?? selectionState.getFocusOffset(),
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
