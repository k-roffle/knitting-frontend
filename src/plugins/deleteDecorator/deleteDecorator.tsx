import { DraftInlineStyle, EditorState } from 'draft-js';
import {
  changeOriginalStyleToNeweStyle,
  StyleKeyType,
} from 'pages/libs/draftjs-utils/inline';
import { ReactElement, useEffect } from 'react';

import { UnitDecoratorProps } from '../unitDecorator';

export default function DeleteDecorator(
  props: UnitDecoratorProps,
): ReactElement {
  const { children, getEditorState, setEditorState, blockKey, end } = props;
  const editorState = getEditorState();

  const getDecoratorStyle = (startOffset: number): DraftInlineStyle => {
    const selectionState = editorState.getSelection();
    const newSelection = selectionState.merge({
      anchorKey: blockKey,
      focusKey: blockKey,
      anchorOffset: startOffset,
      focusOffset: end,
    });

    const editorStateWithDecoratorSelection = EditorState.forceSelection(
      editorState,
      newSelection,
    );

    return editorStateWithDecoratorSelection.getCurrentInlineStyle();
  };

  useEffect(() => {
    children?.some((element) => {
      const startOffset = element?.props?.start;

      if (startOffset == null) {
        return false;
      }

      const decoratorStyle = getDecoratorStyle(startOffset);

      const canCalculate = decoratorStyle.some(
        (style) => style?.includes('CALCULATE') ?? false,
      );

      if (canCalculate) {
        let newEeditorState;

        decoratorStyle.forEach((style) => {
          if (style?.includes('CALCULATE')) {
            newEeditorState = changeOriginalStyleToNeweStyle({
              editorState,
              blockKey,
              originalStyle: style as StyleKeyType,
              originalOffset: end,
              startOffset,
              endOffset: end,
            });
          }
        });

        if (newEeditorState != null) {
          setEditorState(newEeditorState);
          return true;
        }
      }
      return false;
    });
  }, [editorState]);

  return <>{children}</>;
}
