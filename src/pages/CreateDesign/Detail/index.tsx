import {
  Grid,
  Input,
  InputAdornment,
  InputProps,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import KnitDesign from 'assets/designs/knit.png';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { currentDetailInputsAtom } from '../recoils';
import { DESIGN, PATTERN, PATTERN_TYPE } from '../types';

const fullWidth = css`
  width: 100%;
`;

const FullWithSelect = styled(Select)`
  ${fullWidth}
`;

const FullWithInput = styled(Input)`
  ${fullWidth}
`;

const NumberInput = styled(Input)`
  ${fullWidth}
  input {
    text-align: right;
  }
`;

const FormLabel = styled(Typography)`
  ${fullWidth}
  padding: 8px;
`;

const Row = styled(Grid)`
  padding: 12px;
`;

const DesignImageWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 400px;
    margin-top: 8px;
  }
`;

const Detail = (): React.ReactElement => {
  const [currentDetailInputs, setCurrentDetailInputsAtom] = useRecoilState(
    currentDetailInputsAtom,
  );

  const renderPattern = (pattern: PATTERN_TYPE): string => {
    switch (pattern) {
      case PATTERN.TEXT:
        return '서술형 도안';
      case PATTERN.IMAGE:
        return '그림 도안';
      case PATTERN.VIDEO:
        return '영상 도안';
      default:
        return '서술형 도안';
    }
  };

  const onChangeName: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      name: event.target?.value,
    });
  };
  const onChangeStitches: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      stitches: Number(event.target?.value),
    });
  };
  const onChangeRows: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      rows: Number(event.target?.value),
    });
  };
  const onChangeTotalLength: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      totalLength: Number(event.target?.value),
    });
  };
  const onChangeRetailLength: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      retailLength: Number(event.target?.value),
    });
  };
  const onChangeShoulderLength: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      shoulderLength: Number(event.target?.value),
    });
  };
  const onChangeBottomLength: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      bottomLength: Number(event.target?.value),
    });
  };
  const onChangeArmLength: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      armLength: Number(event.target?.value),
    });
  };
  const onChangeNeedle: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      needle: event.target?.value,
    });
  };
  const onChangeYarn: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      yarn: event.target?.value,
    });
  };
  const onChangeExtra: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      extra: event.target?.value,
    });
  };
  const onChangePrice: InputProps['onChange'] = (event) => {
    setCurrentDetailInputsAtom({
      ...currentDetailInputs,
      price: Number(event.target?.value),
    });
  };

  return (
    <>
      <form autoComplete="false">
        <Grid container>
          <Row item xs={12}>
            <FormLabel variant="h2">이름</FormLabel>
            <FullWithInput
              id="name"
              aria-describedby="name"
              placeholder="예) 토니 캔디 라운드넥 니트"
              value={currentDetailInputs.name}
              onChange={onChangeName}
              required
            />
          </Row>
          <Row container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormLabel variant="h2">편물 종류</FormLabel>
              <FullWithSelect
                id="design-type"
                placeholder="종류 선택"
                required
                defaultValue={1}
              >
                <ListSubheader>상의</ListSubheader>
                <MenuItem value={DESIGN.SWEATER}>니트</MenuItem>
              </FullWithSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel variant="h2">도안 종류</FormLabel>
              <FullWithSelect id="pattern-type" required defaultValue={1}>
                <MenuItem value={PATTERN.TEXT}>
                  {renderPattern(PATTERN.TEXT)}
                </MenuItem>
                <MenuItem value={PATTERN.IMAGE}>
                  {renderPattern(PATTERN.IMAGE)}
                </MenuItem>
                <MenuItem value={PATTERN.VIDEO}>
                  {renderPattern(PATTERN.VIDEO)}
                </MenuItem>
              </FullWithSelect>
            </Grid>
          </Row>
          <Row container>
            <FormLabel variant="h2">게이지</FormLabel>
            <FormLabel>10 x 10(cm) 편물의 코와 단을 공유해주세요.</FormLabel>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormLabel variant="h6">코</FormLabel>
                <NumberInput
                  id="stitches"
                  type="number"
                  aria-describedby="stitches"
                  required
                  endAdornment={
                    <InputAdornment position="end">코</InputAdornment>
                  }
                  value={currentDetailInputs.stitches}
                  onChange={onChangeStitches}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel variant="h6">단</FormLabel>
                <NumberInput
                  id="rows"
                  type="number"
                  aria-describedby="rows"
                  required
                  endAdornment={
                    <InputAdornment position="end">단</InputAdornment>
                  }
                  value={currentDetailInputs.rows}
                  onChange={onChangeRows}
                />
              </Grid>
            </Grid>
          </Row>
          <Row container>
            <FormLabel variant="h2">사이즈</FormLabel>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <DesignImageWrapper>
                  <img src={KnitDesign} />
                </DesignImageWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid>
                  <FormLabel variant="h6">총기장</FormLabel>
                  <NumberInput
                    id="total-length"
                    type="number"
                    aria-describedby="total-lengt"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={currentDetailInputs.totalLength}
                    onChange={onChangeTotalLength}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">소매 기장</FormLabel>
                  <NumberInput
                    id="retail-length"
                    type="number"
                    aria-describedby="retail-length"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={currentDetailInputs.retailLength}
                    onChange={onChangeRetailLength}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">어깨 너비</FormLabel>
                  <NumberInput
                    id="shoulder-length"
                    type="number"
                    aria-describedby="shoulder-length"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={currentDetailInputs.shoulderLength}
                    onChange={onChangeShoulderLength}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">밑단 너비</FormLabel>
                  <NumberInput
                    id="bottom-length"
                    type="number"
                    aria-describedby="bottom-length"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={currentDetailInputs.bottomLength}
                    onChange={onChangeBottomLength}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">팔폭</FormLabel>
                  <NumberInput
                    id="arm-width"
                    type="number"
                    aria-describedby="arm-width"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={currentDetailInputs.armLength}
                    onChange={onChangeArmLength}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h2">사용한 실</FormLabel>
            <FullWithInput
              id="yarn"
              aria-describedby="yarn"
              placeholder="예) 티파니 100g 4볼"
              value={currentDetailInputs.yarn}
              onChange={onChangeYarn}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h2">사용한 바늘</FormLabel>
            <FullWithInput
              id="needle"
              aria-describedby="needle"
              required
              placeholder="예) 5.0mm 80cm 둘레 바늘, 4.5mm 40cm 둘레 바늘"
              value={currentDetailInputs.needle}
              onChange={onChangeNeedle}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h2">추가 재료</FormLabel>
            <FullWithInput
              id="extra"
              aria-describedby="extra"
              placeholder="예) 18mm 단추 3개, 돗바늘, 지퍼 10개, 마커 10개"
              value={currentDetailInputs.extra}
              onChange={onChangeExtra}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h2">판매 가격</FormLabel>
            <NumberInput
              id="price"
              type="number"
              aria-describedby="price"
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
              value={currentDetailInputs.price}
              onChange={onChangePrice}
            />
          </Row>
        </Grid>
      </form>
    </>
  );
};

export default Detail;
