import { Tooltip } from '@material-ui/core';
import { ContentState, EditorState } from 'draft-js';
import { changeOriginalStyleToNeweStyle } from 'pages/libs/draftjs-utils/inline';
import { StyleKeyType } from 'pages/libs/draftjs-utils/types';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'themes';

import { DetailTooltipMenu } from './components/DetailTooltipMenu';
import { RepeatTooltipMenu } from './components/RepeatTooltipMenu';
import {
  REPEAT_APPROXIMATION,
  REPEAT_APPROXIMATION_TYPE,
  UNIT_APPROXIMATION_TYPE,
  UNIT_TYPE,
} from './types';
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
  const [showRepeatDetailToolbar, setShowRepeatDetailToolbar] = useState<
    Exclude<UNIT_TYPE, '번'> | undefined
  >();

  const [currentCalculateKey, setCurrentCalculateKey] = useState<
    UNIT_APPROXIMATION_TYPE | undefined
  >(getOriginalStyle(unit));

  const editorState = getEditorState();
  const calculateKey = getCalculateKey(unit);
  const originalStyle = getOriginalStyle(unit);

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
    const canCalculate =
      !decoratorStyle.has('NOT_CALCULATE') &&
      !decoratorStyle.some((style) => style?.includes(calculateKey) ?? false);

    if (canCalculate) {
      const newEeditorState = changeOriginalStyleToNeweStyle({
        editorState,
        originalStyle: originalStyle as StyleKeyType,
        newSelection,
      });

      setEditorState(newEeditorState);
    }
  }, [editorState]);

  const handleClick = (approximation: UNIT_APPROXIMATION_TYPE): void => {
    if (approximation === currentCalculateKey) {
      return;
    }

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
      editorState,
      originalStyle: currentOriginalStyle as StyleKeyType,
      newStyle: approximation,
      newSelection,
    });

    setEditorState(newEeditorState);
    setShowToolbar(false);
    setCurrentCalculateKey(approximation);
  };

  useEffect(() => {
    setShowRepeatDetailToolbar(undefined);
  }, [showToolbar]);

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

  const stopClickEvent = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRepeatToolbarClick = (
    event: React.MouseEvent,
    key: REPEAT_APPROXIMATION_TYPE,
    // eslint-disable-next-line consistent-return
  ): void => {
    const { STITCH_REPEAT, ROW_REPEAT, NOT_CALCULATE } = REPEAT_APPROXIMATION;

    switch (key) {
      case STITCH_REPEAT:
        stopClickEvent(event);
        return setShowRepeatDetailToolbar('코');
      case ROW_REPEAT:
        stopClickEvent(event);
        return setShowRepeatDetailToolbar('단');
      case NOT_CALCULATE:
        return handleClick(key as UNIT_APPROXIMATION_TYPE);
      default:
    }
  };

  const renderTooltipMenu = (): React.ReactElement => {
    const displayedApproximations = getDisplayedApproximations(
      unit,
      showRepeatDetailToolbar,
    );

    return showRepeatDetailToolbar == null ? (
      <RepeatTooltipMenu
        currentCalculateKey={currentCalculateKey}
        displayedApproximations={displayedApproximations}
        onClick={handleRepeatToolbarClick}
      />
    ) : (
      <DetailTooltipMenu
        currentCalculateKey={currentCalculateKey}
        displayedApproximations={displayedApproximations}
        onClick={handleClick}
      />
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
