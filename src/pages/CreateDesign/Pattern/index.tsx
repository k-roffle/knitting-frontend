import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
import { useRef, useState } from 'react';

const Pattern = (): React.ReactElement => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );
  const editor = useRef<Editor | null>(null);

  const focusEditor = (): void => {
    editor?.current?.focus();
  };

  return (
    <div>
      <div onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="도안을 입력하세요"
        />
      </div>
    </div>
  );
};

export default Pattern;
