import Modal from 'knitting/dumbs/Modal';
import { customInlineStylesMap } from 'knitting/libs/draftjs-utils/inline';

import Editor from '@draft-js-plugins/editor';
import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  coverInputAtom,
  outlineInputAtom,
  editorStateAtom,
  optionalOutlineInputAtom,
  stepValidationsAtom,
  showSaveModal,
  showInfoModal,
} from '../atom';
import DesignSizeImage from '../components/DesignSizeImage';
import Footer from '../components/Footer';
import { useStepController } from '../components/Footer/hooks/useStepController';
import { PATTERN, PATTERN_TYPE } from '../types';

import { Title, Contents, Row, Label } from './Review.css';

const Review = (): React.ReactElement => {
  const { name } = useRecoilValue(coverInputAtom);
  const { designType, patternType, stitches, rows, needle } =
    useRecoilValue(outlineInputAtom);
  const { size, yarn, extra } = useRecoilValue(optionalOutlineInputAtom);
  const {
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
  } = size;
  const editorState = useRecoilValue(editorStateAtom);
  const stepValidations = useRecoilValue(stepValidationsAtom);
  const [isShowInfoModal, setIsShowInfoModal] = useRecoilState(showInfoModal);
  const [isShowSaveModal, setIsShowSaveModal] = useRecoilState(showSaveModal);
  const navigate = useNavigate();

  const { onPreviousClick, onNextClick } = useStepController();

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

  const handleClose = () => {
    setIsShowInfoModal(false);
  };

  const handleConfirm = () => {
    setIsShowInfoModal(false);
    onNextClick();
    setIsShowSaveModal(true);
  };

  const navigatePath = (path: string) => {
    navigate(path);
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
      <Footer
        previousLabel="이전"
        nextLabel="저장"
        onPreviousClick={onPreviousClick}
        onNextClick={() => setIsShowInfoModal(true)}
        invalidMessage={
          stepValidations.some((validation) => validation === false)
            ? '저장이 불가능한 페이지가 있어요'
            : undefined
        }
      />
      <Modal
        isShow={isShowInfoModal}
        title="도안 등록 전 Check📝"
        description="도안명과 표지 이미지, 가격은 입력 후 수정할 수 없어요. <br />
            입력한 정보로 등록할까요?"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
      <Modal
        isShow={isShowSaveModal}
        title="도안 저장 완료 🐣"
        description="도안을 다른 니터들에게 판매해보는 것은 어떠신가요? <br />
            도안을 상품으로 등록해보세요!"
        closeButtonText="다음에 등록할게요"
        confirmButtonText="상품을 등록할게요!"
        handleClose={() => navigatePath('/my')}
        handleConfirm={() => navigatePath('/my/products/create')}
      />
    </>
  );
};

export default Review;
