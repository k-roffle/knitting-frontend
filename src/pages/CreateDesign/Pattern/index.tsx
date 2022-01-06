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
import { FAILED_TO_PASTE_MORE_THAN_MAXIMUM_LENGTH } from 'knitting/constants/errors';
import { Snackbar } from 'knitting/dumbs';
import { customInlineStylesMap } from 'knitting/libs/draftjs-utils/inline';
import createDeleteDecoratorPlugin from 'knitting/plugins/deleteDecorator';
import createUnitDecoratorPlugin from 'knitting/plugins/unitDecorator';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { editorStateAtom } from '../atom';
import { FontSize } from '../components/FontSize';

import {
  PatternContainer,
  ToolbarContentWrapper,
  EditorWrapper,
  CurrentLengthInfo,
} from './Pattern.css';
import { DEFAULT_FONT_SIZE, MAX_PATTERN_LENGTH } from './constants';
import { getCurrentFontSize } from './utils';

const stitchDecoratorPlugin = createUnitDecoratorPlugin({ unit: '코' });
const rowDecoratorPlugin = createUnitDecoratorPlugin({ unit: '단' });
const repeatDecoratorPlugin = createUnitDecoratorPlugin({ unit: '번' });

const deleteDecoratorPlugin = createDeleteDecoratorPlugin({
  units: ['코', '단', '번'],
});

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

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
    <PatternContainer>
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
              defaultFontSize={DEFAULT_FONT_SIZE}
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
      <CurrentLengthInfo variant="caption">
        {currentPatternLength} / {MAX_PATTERN_LENGTH}
      </CurrentLengthInfo>
      <Snackbar
        label={FAILED_TO_PASTE_MORE_THAN_MAXIMUM_LENGTH}
        onClose={handleSnackbarClose}
        open={openErrorSnackbar}
        severity="error"
      />
    </PatternContainer>
  );
};

export default Pattern;
