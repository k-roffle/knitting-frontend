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
  entityKey?: string;
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
