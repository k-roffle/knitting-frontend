/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentState, EditorState, RichUtils } from 'draft-js';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palatte';

import { CustomInline } from './types';

export interface UnitDecoratorProps {
  className?: string;
  children?: ReactNode;

  unit?: string;
  decoratedText?: string;
  dir?: null;
  entityKey?: string | null;
  offsetKey?: string;
  contentState?: ContentState;
  blockKey?: string;
  start?: number;
  end?: number;

  setEditorState?(editorState: EditorState): void;
  getEditorState?(): EditorState;
}

const DecoratorWrapper = styled.span`
  > span {
    background: ${palette.grey[400]};
    margin: ${theme.spacing(0, 0.5)};
    padding: ${theme.spacing(0.5, 1)};
    border-radius: ${theme.spacing(1)};
    cursor: pointer;
  }
`;

export default function UnitDecorator(props: UnitDecoratorProps): ReactElement {
  const {
    className,
    children,
    unit,
    decoratedText,
    dir,
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

  const handleClick = (): void => {
    const editorState = getEditorState?.();

    if (editorState != null && children != null && setEditorState != null) {
      const selectionState = editorState.getSelection();
      const newSelection = selectionState.merge({
        anchorOffset: start,
        focusOffset: end,
      });

      const editorStateWithNewSelection = EditorState.forceSelection(
        editorState,
        newSelection,
      );
      const editorStateWithStyles = RichUtils.toggleInlineStyle(
        editorStateWithNewSelection,
        CustomInline.NOT_CALCULATE,
      );
      const editorStateWithStylesAndPreviousSelection = EditorState.forceSelection(
        editorStateWithStyles,
        selectionState,
      );

      setEditorState(editorStateWithStylesAndPreviousSelection);
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
