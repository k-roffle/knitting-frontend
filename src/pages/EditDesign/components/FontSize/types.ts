import { DraftStyleMap, EditorState } from 'draft-js';

export type FontSizeProps = {
  onChange?: (editorState: EditorState) => void;
  onChangeCustomStyleMap: (customStyleMap: DraftStyleMap) => void;

  editorState: EditorState;
  defaultFontSize: number;
  fontSize?: number;
};

export const fontSizeOptions = [
  8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
];
