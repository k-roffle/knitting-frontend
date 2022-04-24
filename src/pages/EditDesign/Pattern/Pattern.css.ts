import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

interface EditorWrapperProps {
  isFocused: boolean;
}

export const PatternContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(1.5)};
`;

export const EditorWrapper = styled.div<EditorWrapperProps>`
  min-height: 40vh;
  border: 1.5px solid transparent;
  ${({ theme }) => css`
    padding: ${theme.spacing(1.5)};
    margin-top: ${theme.spacing(1)};
    border-radius: ${theme.spacing(1)};
    background: ${theme.palette.grey[200]};
  `};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border: 1.5px solid ${theme.palette.grey[400]};
    `}

  .public-DraftEditorPlaceholder-root {
    display: inline;
    div {
      display: inline;
    }
    color: ${({ theme }) => theme.palette.action.active};
  }

  .DraftEditor-editorContainer {
    display: inline-block;
  }
`;

export const ToolbarContentWrapper = styled.div`
  display: flex;
  ${({ theme }) => css`
    margin-top: ${theme.spacing(4)};
    padding: ${theme.spacing(0.5)};
    background: ${theme.palette.grey[200]};
    border-radius: ${theme.spacing(1)};
  `}

  button {
    height: 100%;
    background: transparent;
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    border: none;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.palette.grey[300]};
    }
  }
`;

export const CurrentLengthInfo = styled(Typography)`
  display: block;
  text-align: right;
  ${({ theme }) => css`
    margin: ${theme.spacing(1, 0)};
    color: ${theme.palette.text.secondary};
  `}
`;
