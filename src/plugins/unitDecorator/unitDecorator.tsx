/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentState, EditorState } from 'draft-js';
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
  contentState: ContentState;
  blockKey?: string;
  start?: number;
  end?: number;

  setEditorState(editorState: EditorState): void;
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
    line-height: 210%;
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

  const editorState = getEditorState();
  const calculateKey =
    unit === '코' ? 'STITCH_CALCULATE_ROUND' : 'ROW_CALCULATE_ROUND';

  useEffect(() => {
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
    const canCalculate =
      !decoratorStyle.has('NOT_CALCULATE') && !decoratorStyle.has(calculateKey);

    if (canCalculate) {
      const newEeditorState = changeOriginalStyleToNeweStyle({
        editorState,
        blockKey,
        originalStyle: calculateKey,
        startOffset: start,
        endOffset: end,
      });

      setEditorState(newEeditorState);
    }
  }, [editorState]);

  const handleClick = (): void => {
    const newEeditorState = changeOriginalStyleToNeweStyle({
      editorState: getEditorState(),
      blockKey,
      originalStyle: calculateKey,
      newStyle: 'NOT_CALCULATE',
      startOffset: start,
      endOffset: end,
    });

    setEditorState(newEeditorState);
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
