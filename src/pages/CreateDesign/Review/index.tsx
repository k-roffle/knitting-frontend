import Editor from '@draft-js-plugins/editor';
import { Grid } from '@material-ui/core';
import { customInlineStylesMap } from 'knitting/libs/draftjs-utils/inline';
import React from 'react';
import { useRecoilValue } from 'recoil';

import {
  coverInputAtom,
  outlineInputAtom,
  editorStateAtom,
  optionalOutlineInputAtom,
} from '../atom';
import DesignSizeImage from '../components/DesignSizeImage';
import { PATTERN, PATTERN_TYPE } from '../types';

import { Title, Contents, Row, Label } from './Review.css';

const Review = (): React.ReactElement => {
  const { name } = useRecoilValue(coverInputAtom);
  const { designType, patternType, stitches, rows, needle } = useRecoilValue(
    outlineInputAtom,
  );
  const { size, yarn, extra } = useRecoilValue(optionalOutlineInputAtom);
  const {
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
  } = size;
  const editorState = useRecoilValue(editorStateAtom);

  const { TEXT, IMAGE, VIDEO } = PATTERN;

  const renderPattern = (pattern: PATTERN_TYPE): string => {
    switch (pattern) {
      case TEXT:
        return '서술형 도안';
      case IMAGE:
        return '그림 도안';
      case VIDEO:
        return '영상 도안';
      default:
        return '서술형 도안';
    }
  };

  return (
    <>
      <Grid container>
        <Row item xs={12}>
          <Title variant="h3">{name}</Title>
        </Row>
        <Row container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Label variant="h4">편물 종류</Label>
            <Contents>{designType && '스웨터'}</Contents>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Label variant="h4">도안 종류</Label>
            <Contents>{renderPattern(patternType)}</Contents>
          </Grid>
        </Row>
        <Row container>
          <Label variant="h4">게이지</Label>
          <Contents>
            {stitches}코 {rows}단
          </Contents>
        </Row>
        <Row container>
          <Label variant="h4">사이즈</Label>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <DesignSizeImage />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Row>
                <Label variant="h5">총기장</Label>
                <Contents>{totalLength}cm</Contents>
              </Row>
              <Row>
                <Label variant="h5">소매 기장</Label>
                <Contents>{sleeveLength}cm</Contents>
              </Row>
              <Row>
                <Label variant="h5">어깨 너비</Label>
                <Contents>{shoulderWidth}cm</Contents>
              </Row>
              <Row>
                <Label variant="h5">밑단 너비</Label>
                <Contents>{bottomWidth}cm</Contents>
              </Row>
              <Row>
                <Label variant="h5">팔폭</Label>
                <Contents>{armholeDepth}cm</Contents>
              </Row>
            </Grid>
          </Grid>
        </Row>
        <Row item xs={12}>
          <Label variant="h4">사용한 실</Label>
          <Contents>{yarn}</Contents>
        </Row>
        <Row item xs={12}>
          <Label variant="h4">사용한 바늘</Label>
          <Contents>{needle}</Contents>
        </Row>
        <Row item xs={12}>
          <Label variant="h4">추가 재료</Label>
          <Contents>{extra}</Contents>
        </Row>
        <Row item xs={12}>
          <Label variant="h4">도안</Label>
          <Contents>
            <Editor
              customStyleMap={customInlineStylesMap}
              editorState={editorState}
              readOnly={true}
            />
          </Contents>
        </Row>
      </Grid>
    </>
  );
};

export default Review;
