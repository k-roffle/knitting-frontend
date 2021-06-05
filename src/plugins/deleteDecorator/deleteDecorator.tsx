import { EditorState } from 'draft-js';
import {
  changeOriginalStyleToNeweStyle,
  StyleKeyType,
} from 'pages/libs/draftjs-utils/inline';
import { ReactElement, useEffect } from 'react';

import { UnitDecoratorProps } from '../unitDecorator';

export default function DeleteDecorator(
  props: UnitDecoratorProps,
): ReactElement {
  const {
    children,
    getEditorState,
    setEditorState,
    blockKey,
    start,
    end,
  } = props;

  const editorState = getEditorState();
  const selectionState = editorState.getSelection();
  const newSelection = selectionState.merge({
    anchorKey: blockKey,
    focusKey: blockKey,
    anchorOffset: start,
    focusOffset: end,
  });
  const editorStateWithDecoratorSelection = EditorState.forceSelection(
    editorState,
    newSelection,
  );
  const decoratorStyle = editorStateWithDecoratorSelection.getCurrentInlineStyle();

  useEffect(() => {
    if (start == null) {
      return;
    }

    let newEeditorState;

    decoratorStyle.forEach((style) => {
      if (style?.includes('CALCULATE')) {
        newEeditorState = changeOriginalStyleToNeweStyle({
          editorState,
          originalStyle: style as StyleKeyType,
          newSelection,
        });
      }
    });

    if (newEeditorState != null) {
      setEditorState(newEeditorState);
    }
  }, []);

  return <>{children}</>;
}
