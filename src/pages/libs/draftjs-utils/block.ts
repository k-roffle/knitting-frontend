import { ContentBlock, EditorState } from 'draft-js';

export const getSelectedBlocksMap = (
  editorState: EditorState,
): Immutable.Iterable<string, ContentBlock> => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();

  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
};

/**
 * Function returns collection of currently selected blocks.
 */
export const getSelectedBlocksList = (
  editorState: EditorState,
): Immutable.List<ContentBlock> => {
  return getSelectedBlocksMap(editorState).toList();
};
