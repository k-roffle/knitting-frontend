/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from '@material-ui/core';
import { ContentState, EditorState } from 'draft-js';
import {
  changeOriginalStyleToNeweStyle,
  StyleKeyType,
} from 'pages/libs/draftjs-utils/inline';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
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

interface TooltipMenuProps {
  isSelectedCalculateKey: boolean;
}

const APPROXIMATION = {
  ROUND_DOWN: 'ROUND_DOWN',
  ROUND: 'ROUND',
  ROUND_UP: 'ROUND_UP',
  NOT_CALCULATE: 'NOT_CALCULATE',
} as const;

const DISPLAY_APPROXIMATION = {
  ROUND_DOWN: '내림',
  ROUND: '반올림',
  ROUND_UP: '올림',
  NOT_CALCULATE: '계산 안함',
} as const;

type APPROXIMATION_TYPE = typeof APPROXIMATION[keyof typeof APPROXIMATION];

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

const ToolTipWrapper = styled.div`
  display: inline-block;
  position: relative;

  > div {
    pointer-events: auto;
  }
`;

const TooltipMenuContainer = styled.div`
  display: flex;
`;

const TooltipMenu = styled.span<TooltipMenuProps>`
  padding: ${theme.spacing(0.8)};
  margin: ${theme.spacing(0.2)};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${palette.action.hover};
  }

  ${({ isSelectedCalculateKey }) =>
    isSelectedCalculateKey &&
    css`
      background-color: ${palette.action.selected};
    `}
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

  const [showToolbar, setShowToolbar] = useState(false);
  const [
    currentCalculateKey,
    setCurrentCalculateKey,
  ] = useState<APPROXIMATION_TYPE>('ROUND');

  const editorState = getEditorState();
  const calculateKey = unit === '코' ? 'STITCH_CALCULATE' : 'ROW_CALCULATE';

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
      !decoratorStyle.has('NOT_CALCULATE') &&
      !decoratorStyle.some((style) => style?.includes(calculateKey) ?? false);

    if (canCalculate) {
      const newEeditorState = changeOriginalStyleToNeweStyle({
        editorState,
        blockKey,
        originalStyle: `${calculateKey}_ROUND` as StyleKeyType,
        startOffset: start,
        endOffset: end,
      });

      setEditorState(newEeditorState);
    }
  }, [editorState]);

  const handleClick = (approximation: APPROXIMATION_TYPE): void => {
    if (approximation === currentCalculateKey) {
      return;
    }

    const decoratorStyle = editorState.getCurrentInlineStyle();
    let originalStyle = `${calculateKey}_ROUND`;
    const newStyle = (approximation === 'NOT_CALCULATE'
      ? 'NOT_CALCULATE'
      : `${calculateKey}_${approximation}`) as StyleKeyType;

    decoratorStyle.forEach((style) => {
      if (
        style != null &&
        (style.includes(calculateKey) || style.includes('NOT_CALCULATE'))
      ) {
        originalStyle = style;
      }
    });

    const newEeditorState = changeOriginalStyleToNeweStyle({
      editorState: getEditorState(),
      blockKey,
      originalStyle: originalStyle as StyleKeyType,
      newStyle,
      startOffset: start,
      endOffset: end,
    });

    setEditorState(newEeditorState);
    setShowToolbar(false);
    setCurrentCalculateKey(approximation);
  };

  useEffect(() => {
    const handleShowToolbar = (): void => {
      setShowToolbar(false);
    };

    const timeoutID = setTimeout(() => {
      if (showToolbar) {
        document.addEventListener('click', handleShowToolbar);
      }
    }, 0);

    return (): void => {
      document.removeEventListener('click', handleShowToolbar);
      clearTimeout(timeoutID);
    };
  }, [showToolbar]);

  const renderTooltipMenu = (): React.ReactElement => (
    <TooltipMenuContainer>
      {Object.values(DISPLAY_APPROXIMATION).map(
        (displayApproximatio, index): React.ReactElement => {
          const menuKey =
            APPROXIMATION[
              Object.keys(DISPLAY_APPROXIMATION)[index] as APPROXIMATION_TYPE
            ];

          return (
            <TooltipMenu
              key={menuKey}
              onClick={(): void => handleClick(menuKey)}
              isSelectedCalculateKey={currentCalculateKey === menuKey}
            >
              {displayApproximatio}
            </TooltipMenu>
          );
        },
      )}
    </TooltipMenuContainer>
  );

  return (
    <ToolTipWrapper>
      <Tooltip
        arrow
        open={showToolbar}
        placement="top"
        PopperProps={{
          disablePortal: true,
        }}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={renderTooltipMenu()}
      >
        <DecoratorWrapper
          {...otherProps}
          className={className}
          onClick={(): void => setShowToolbar(!showToolbar)}
        >
          {children}
        </DecoratorWrapper>
      </Tooltip>
    </ToolTipWrapper>
  );
}
