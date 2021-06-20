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
import { DraftHandleValue, DraftStyleMap, EditorState } from 'draft-js';
import Snackbar from 'dumbs/Snackbar';
import { customInlineStylesMap } from 'pages/libs/draftjs-utils/inline';
import createDeleteDecoratorPlugin from 'plugins/deleteDecorator';
import createUnitDecoratorPlugin from 'plugins/unitDecorator';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';
import { FAILED_TO_PASTE_MORE_THAN_MAXIMUM_LENGTH } from 'utils/errors';

import { FontSize } from '../components/FontSize';
import { editorStateAtom } from '../recoils';

import { defaultFontSize, MAX_PATTERN_LENGTH } from './types';
import { getCurrentFontSize } from './utils';

const stitchDecoratorPlugin = createUnitDecoratorPlugin({ unit: '코' });
const rowDecoratorPlugin = createUnitDecoratorPlugin({ unit: '단' });
const repeatDecoratorPlugin = createUnitDecoratorPlugin({ unit: '번' });

const deleteDecoratorPlugin = createDeleteDecoratorPlugin({
  units: ['코', '단', '번'],
});

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
  const [editorState, setEditorState] = useRecoilState(editorStateAtom);

  const [customStyleMap, setCustomStyleMap] = useState<DraftStyleMap>(
    customInlineStylesMap,
  );

  const [currentFontSize, setCurrentFontSize] = useState(
    getCurrentFontSize(editorState, customStyleMap),
  );
  const [isFocused, setIsFocused] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const editor = useRef<Editor | null>(null);

  stitchDecoratorPlugin.onChange = (editState: EditorState): EditorState => {
    setEditorState(editState);
    return editState;
  };

  const plugins = [
    stitchDecoratorPlugin,
    rowDecoratorPlugin,
    repeatDecoratorPlugin,
    deleteDecoratorPlugin,
    toolbarPlugin,
  ];

  const currentPatternLength = editorState.getCurrentContent().getPlainText('')
    .length;

  const handleBeforeInput = (
    _chars: string,
    newEditorState: EditorState,
  ): DraftHandleValue => {
    const currentContent = newEditorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength > MAX_PATTERN_LENGTH - 1) {
      return 'handled';
    }

    return 'not-handled';
  };

  const handlePastedText = (
    pastedText: string,
    _html: string | undefined,
    newEditorState: EditorState,
  ): DraftHandleValue => {
    const currentContent = newEditorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength + pastedText.length > MAX_PATTERN_LENGTH) {
      setOpenErrorSnackbar(true);
      return 'handled';
    }

    return 'not-handled';
  };

  const handleSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

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
              onChangeCustomStyleMap={changeFontSize}
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
          handleBeforeInput={handleBeforeInput}
          handlePastedText={handlePastedText}
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
          placeholder="도안을 입력하세요"
        />
      </EditorWrapper>
      <span>
        {currentPatternLength} / {MAX_PATTERN_LENGTH}
      </span>
      <Snackbar
        label={FAILED_TO_PASTE_MORE_THAN_MAXIMUM_LENGTH}
        onClose={handleSnackbarClose}
        open={openErrorSnackbar}
        severity="error"
      />
    </>
  );
};

export default Pattern;
