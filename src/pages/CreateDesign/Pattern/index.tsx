import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/static-toolbar';
import { DraftStyleMap, EditorState } from 'draft-js';
import createUnitDecoratorPlugin from 'plugins/unitDecorator';
import { UnitDecoratorStyleMap } from 'plugins/unitDecorator/types';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palatte';

import { FontSize } from '../components/FontSize';

import { defaultFontSize } from './types';
import { getCurrentFontSize } from './utils';

const stitcheDecoratorPlugin = createUnitDecoratorPlugin({ unit: '코' });
const rowDecoratorPlugin = createUnitDecoratorPlugin({ unit: '단' });
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

interface EditorWrapperProps {
  isFocused: boolean;
}

const EditorWrapper = styled.div<EditorWrapperProps>`
  min-height: 50%;
  padding: ${theme.spacing(1.5)};
  margin: ${theme.spacing(1, 1.5, 4, 1.5)};
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

const ToolbarContentWrapper = styled.div`
  display: flex;
  margin: ${theme.spacing(4, 1.5, 0, 1.5)};
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

const Pattern = (): React.ReactElement => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );

  const [customStyleMap, setCustomStyleMap] = useState<DraftStyleMap>({
    CODE: {
      fontFamily: 'monospace',
      wordWrap: 'break-word',
      background: palette.grey[300],
      color: palette.primary.main,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(0.3, 0.7),
    },
    ...UnitDecoratorStyleMap,
  });

  const [currentFontSize, setCurrentFontSize] = useState(
    getCurrentFontSize(editorState, customStyleMap),
  );
  const [isFocused, setIsFocused] = useState(false);
  const editor = useRef<Editor | null>(null);

  const plugins = [stitcheDecoratorPlugin, rowDecoratorPlugin, toolbarPlugin];

  const focusEditor = (): void => {
    editor?.current?.focus();
  };

  const changeFontSize = (newCustomStyleMap: DraftStyleMap): void => {
    setCurrentFontSize(getCurrentFontSize(editorState, newCustomStyleMap));
    setCustomStyleMap(newCustomStyleMap);
  };

  return (
    <>
      <Toolbar>
        {(externalProps) => (
          <ToolbarContentWrapper>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <Separator />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
            <Separator />
            <FontSize
              defaultFontSize={defaultFontSize}
              fontSize={currentFontSize}
              editorState={editorState}
              onChange={setEditorState}
              onChageCustomStyleMap={changeFontSize}
            />
          </ToolbarContentWrapper>
        )}
      </Toolbar>
      <EditorWrapper onClick={focusEditor} isFocused={isFocused}>
        <Editor
          ref={editor}
          editorState={editorState}
          plugins={plugins}
          customStyleMap={customStyleMap}
          onChange={setEditorState}
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
          placeholder="도안을 입력하세요"
        />
      </EditorWrapper>
    </>
  );
};

export default Pattern;
