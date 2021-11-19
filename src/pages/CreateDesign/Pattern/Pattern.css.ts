import { Typography } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';

interface EditorWrapperProps {
  isFocused: boolean;
}

export const PatternContainer = styled.div`
  margin: ${theme.spacing(1.5)};
`;

export const EditorWrapper = styled.div<EditorWrapperProps>`
  min-height: 40vh;
  padding: ${theme.spacing(1.5)};
  margin-top: ${theme.spacing(1)};
  border: 1.5px solid transparent;
  border-radius: ${theme.spacing(1)};
  background: ${palette.grey[200]};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 1.5px solid ${palette.grey[400]};
    `}

  .public-DraftEditorPlaceholder-root {
    display: inline;
    div {
      display: inline;
    }
    color: ${palette.action.active};
  }

  .DraftEditor-editorContainer {
    display: inline-block;
  }
`;

export const ToolbarContentWrapper = styled.div`
  display: flex;
  margin-top: ${theme.spacing(4)};
  padding: ${theme.spacing(0.5)};
  background: ${palette.grey[200]};
  border-radius: ${theme.spacing(1)};

  button {
    height: 100%;
    background: transparent;
    border-radius: ${theme.spacing(0.5)};
    border: none;
    cursor: pointer;

    &:hover {
      background: ${palette.grey[300]};
    }
  }
`;

export const CurrentLengthInfo = styled(Typography)`
  display: block;
  margin: ${theme.spacing(1, 0)};
  text-align: right;
  color: ${palette.text.secondary};
`;
