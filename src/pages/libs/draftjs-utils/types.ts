import { DraftStyleMap, EditorState, SelectionState } from 'draft-js';

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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type StyleMapType = {
  color?: any;
  bgcolor?: any;
  fontSize?: any;
  fontFamily?: any;
  CODE?: any;
  STITCH_CALCULATE_ROUND_UP?: any;
  STITCH_CALCULATE_ROUND_DOWN?: any;
  STITCH_CALCULATE_ROUND?: any;
  ROW_CALCULATE_ROUND_UP?: any;
  ROW_CALCULATE_ROUND_DOWN?: any;
  ROW_CALCULATE_ROUND?: any;
  STITCH_REPEAT_CALCULATE_ROUND?: any;
  STITCH_REPEAT_CALCULATE_ROUND_UP?: any;
  STITCH_REPEAT_CALCULATE_ROUND_DOWN?: any;
  ROW_REPEAT_CALCULATE_ROUND?: any;
  ROW_REPEAT_CALCULATE_ROUND_UP?: any;
  ROW_REPEAT_CALCULATE_ROUND_DOWN?: any;
  NOT_CALCULATE?: any;
  FONTSIZE?: any;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface AddToCustomStyleMap {
  styleType: StyleKeyType;
  styleKey: string;
  style: string | number;
  onChageCustomStyleMap: (customStyleMap: DraftStyleMap) => void;
}

export interface ToggleCustomInlineStyle {
  editorState: EditorState;
  styleType: StyleKeyType;
  style: string | number;
  isAlreadyApplyed: boolean;
  onChageCustomStyleMap: (customStyleMap: DraftStyleMap) => void;
}

export interface ChangeOriginalStyleToNewStyle {
  editorState: EditorState;
  originalStyle: StyleKeyType;
  newSelection: SelectionState;
  newStyle?: StyleKeyType;
  originalOffset?: number;
}
