import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palatte';

interface EditorWrapperProps {
  isFocused: boolean;
}

const EditorWrapper = styled.div<EditorWrapperProps>`
  min-height: 50%;
  padding: ${theme.spacing(1.5)};
  margin: ${theme.spacing(4, 1.5)};
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

const Pattern = (): React.ReactElement => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );
  const [isFocused, setIsFocused] = useState(false);
  const editor = useRef<Editor | null>(null);

  const focusEditor = (): void => {
    editor?.current?.focus();
  };

  return (
    <EditorWrapper onClick={focusEditor} isFocused={isFocused}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        onFocus={(): void => setIsFocused(true)}
        onBlur={(): void => setIsFocused(false)}
        placeholder="도안을 입력하세요"
      />
    </EditorWrapper>
  );
};

export default Pattern;
