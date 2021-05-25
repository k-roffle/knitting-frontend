import { Tooltip } from '@material-ui/core';
import { ContentState, EditorState } from 'draft-js';
import {
  changeOriginalStyleToNeweStyle,
  StyleKeyType,
} from 'pages/libs/draftjs-utils/inline';
import { ReactElement, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palatte';

import { UNIT_APPROXIMATION_TYPE, UNIT_TYPE } from './types';
import {
  getCalculateKey,
  getOriginalStyle,
  getDisplayedApproximations,
} from './utils';

export interface UnitDecoratorProps {
  className?: string;
  children?: ReactElement[];

  unit?: UNIT_TYPE;
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

const DecoratorWrapper = styled.span`
  > span {
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
    getEditorState,
    setEditorState,
    blockKey,
    start,
    end,
    ...otherProps
  } = props;

  const [showToolbar, setShowToolbar] = useState(false);
  const [currentCalculateKey, setCurrentCalculateKey] = useState<
    UNIT_APPROXIMATION_TYPE | undefined
  >(getOriginalStyle(unit));

  const editorState = getEditorState();
  const calculateKey = getCalculateKey(unit);
  const originalStyle = getOriginalStyle(unit);

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
        originalStyle: originalStyle as StyleKeyType,
        startOffset: start,
        endOffset: end,
      });

      setEditorState(newEeditorState);
    }
  }, [editorState]);

  const handleClick = (approximation: UNIT_APPROXIMATION_TYPE): void => {
    if (approximation === currentCalculateKey) {
      return;
    }

    const decoratorStyle = editorState.getCurrentInlineStyle();
    let currentOriginalStyle = getOriginalStyle(unit);

    decoratorStyle.forEach((style) => {
      if (
        style != null &&
        (style.includes(calculateKey) || style.includes('NOT_CALCULATE'))
      ) {
        currentOriginalStyle = style as UNIT_APPROXIMATION_TYPE;
      }
    });

    const newEeditorState = changeOriginalStyleToNeweStyle({
      editorState: getEditorState(),
      blockKey,
      originalStyle: currentOriginalStyle as StyleKeyType,
      newStyle: approximation,
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

  const renderTooltipMenu = (): React.ReactElement => {
    const displayedApproximations = getDisplayedApproximations(unit);

    return (
      <TooltipMenuContainer>
        {Object.values(displayedApproximations).map(
          (displayApproximatio, index): React.ReactElement => {
            const menuKey = Object.keys(displayedApproximations)[
              index
            ] as UNIT_APPROXIMATION_TYPE;

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
  };

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
