/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentState, convertToRaw, EditorState, RichUtils } from 'draft-js';
import { changeOriginalStyleToNeweStyle } from 'pages/libs/draftjs-utils/inline';
import { ReactElement, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palatte';

export interface UnitDecoratorProps {
  className?: string;
  children?: ReactNode;

  unit?: string;
  decoratedText?: string;
  entityKey?: string;
  offsetKey?: string;
  contentState?: ContentState;
  blockKey?: string;
  start?: number;
  end?: number;

  setEditorState?(editorState: EditorState): void;
  getEditorState(): EditorState;
}

const DecoratorWrapper = styled.span`
  > span {
    background: ${palette.primary.main};
    margin: ${theme.spacing(0, 0.5)};
    padding: ${theme.spacing(0.5, 1)};
    border-radius: ${theme.spacing(0.5)};
    color: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[2]};
    cursor: pointer;

    &:hover {
      box-shadow: ${theme.shadows[4]};
    }
  }
`;

export default function UnitDecorator(props: UnitDecoratorProps): ReactElement {
  const {
    className,
    children,
    unit,
    decoratedText,
    entityKey,
    getEditorState,
    offsetKey,
    setEditorState,
    contentState,
    blockKey,
    start,
    end,
    ...otherProps
  } = props;

  const editorState = getEditorState?.();

  const selectionState = editorState.getSelection();
  const newSelection = selectionState.merge({
    anchorOffset: start,
    focusOffset: end,
  });

  const editorStateWithNewSelection = EditorState.forceSelection(
    editorState,
    newSelection,
  );

  const currentStyle = editorStateWithNewSelection.getCurrentInlineStyle();
  const canCalculate =
    !currentStyle.has('NOT_CALCULATE') && !currentStyle.has('CALCULATE');

  useEffect(() => {
    if (setEditorState != null) {
      if (canCalculate) {
        const newEeditorState = changeOriginalStyleToNeweStyle({
          editorState,
          originalStyle: 'CALCULATE',
          startOffset: start,
          endOffset: end,
        });

        setEditorState(newEeditorState);
      }
    }
  }, [canCalculate]);

  const handleClick = (): void => {
    if (editorState != null && children != null && setEditorState != null) {
      const newEeditorState = changeOriginalStyleToNeweStyle({
        editorState,
        originalStyle: 'CALCULATE',
        newStyle: 'NOT_CALCULATE',
        startOffset: start,
        endOffset: end,
      });

      setEditorState(newEeditorState);
    }
  };

  return (
    <DecoratorWrapper
      {...otherProps}
      className={className}
      onClick={handleClick}
    >
      {children}
    </DecoratorWrapper>
  );
}
