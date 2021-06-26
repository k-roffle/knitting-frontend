import {
  Grid,
  Input,
  InputAdornment,
  InputProps,
  ListSubheader,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { palette } from 'themes/palette';

import DesignSizeImage from '../components/DesignSizeImage';
import { currentDesignInputAtom } from '../recoils';
import { DESIGN, DESIGN_TYPE, PATTERN, PATTERN_TYPE } from '../types';

const Required = styled(Typography)`
  display: inline;
  font-weight: normal;
  color: ${palette.primary.main};
`;

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

const Detail = (): React.ReactElement => {
  const [currentDesignInput, setCurrentDesignInputAtom] = useRecoilState(
    currentDesignInputAtom,
  );
  const {
    name,
    stitches,
    rows,
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
    needle,
    yarn,
    extra,
    price,
    designType,
    patternType,
  } = currentDesignInput;

  const { SWEATER } = DESIGN;
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

  const checkPositiveNumber = ({
    value,
  }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    return value.length > 1 && Number(value) < 1;
  };

  const getNumberToChange = ({
    value,
  }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    const valueToNumber = Number(value);

    return isNaN(valueToNumber) ? 0 : valueToNumber;
  };

  const onChangeName: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      name: currentTarget.value,
    });
  };
  const onChangeStitches: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      stitches: getNumberToChange(currentTarget),
    });
  };
  const onChangeRows: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      rows: getNumberToChange(currentTarget),
    });
  };
  const onChangeTotalLength: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      totalLength: getNumberToChange(currentTarget),
    });
  };
  const onChangeSleeveLength: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      sleeveLength: getNumberToChange(currentTarget),
    });
  };
  const onChangeShoulderWidth: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      shoulderWidth: getNumberToChange(currentTarget),
    });
  };
  const onChangeBottomWidth: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      bottomWidth: getNumberToChange(currentTarget),
    });
  };
  const onChangeArmholeDepth: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      armholeDepth: getNumberToChange(currentTarget),
    });
  };
  const onChangeNeedle: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      needle: currentTarget.value,
    });
  };
  const onChangeYarn: InputProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      yarn: currentTarget.value,
    });
  };
  const onChangeExtra: InputProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      extra: currentTarget.value,
    });
  };
  const onChangePrice: InputProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      price: getNumberToChange(currentTarget),
    });
  };
  const onChangeDesignType: SelectProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      designType: currentTarget.value as DESIGN_TYPE,
    });
  };
  const onChangePatternType: SelectProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      patternType: currentTarget.value as PATTERN_TYPE,
    });
  };

  const RequiredChar = (): React.ReactElement => (
    <Required variant="h4"> *</Required>
  );

  return (
    <>
      <form autoComplete="false">
        <Grid container>
          <Row item xs={12}>
            <FormLabel variant="h5">
              이름
              <RequiredChar />
            </FormLabel>
            <FullWithInput
              id="name"
              aria-describedby="name"
              placeholder="예) 토니 캔디 라운드넥 니트"
              value={name}
              onChange={onChangeName}
              required={true}
            />
          </Row>
          <Row container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormLabel variant="h5">
                편물 종류 <RequiredChar />
              </FormLabel>
              <FullWithSelect
                id="design-type"
                placeholder="종류 선택"
                required
                defaultValue={SWEATER}
                value={designType}
                onChange={onChangeDesignType}
              >
                <ListSubheader>상의</ListSubheader>
                <MenuItem value={SWEATER}>니트</MenuItem>
              </FullWithSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel variant="h5">
                도안 종류 <RequiredChar />
              </FormLabel>
              <FullWithSelect
                id="pattern-type"
                required
                defaultValue={TEXT}
                value={patternType}
                onChange={onChangePatternType}
              >
                <MenuItem value={TEXT}>{renderPattern(TEXT)}</MenuItem>
                <MenuItem value={IMAGE}>{renderPattern(IMAGE)}</MenuItem>
                <MenuItem value={VIDEO}>{renderPattern(VIDEO)}</MenuItem>
              </FullWithSelect>
            </Grid>
          </Row>
          <Row container>
            <FormLabel variant="h5">게이지</FormLabel>
            <FormLabel>10 x 10(cm) 편물의 코와 단을 공유해주세요.</FormLabel>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormLabel variant="h6">
                  코 <RequiredChar />
                </FormLabel>
                <NumberInput
                  id="stitches"
                  type="number"
                  aria-describedby="stitches"
                  required
                  endAdornment={
                    <InputAdornment position="end">코</InputAdornment>
                  }
                  value={stitches}
                  onChange={onChangeStitches}
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel variant="h6">
                  단 <RequiredChar />
                </FormLabel>
                <NumberInput
                  id="rows"
                  type="number"
                  aria-describedby="rows"
                  required
                  endAdornment={
                    <InputAdornment position="end">단</InputAdornment>
                  }
                  value={rows}
                  onChange={onChangeRows}
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>
          </Row>
          <Row container>
            <FormLabel variant="h5">사이즈</FormLabel>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <DesignSizeImage />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid>
                  <FormLabel variant="h6">
                    총기장 <RequiredChar />
                  </FormLabel>
                  <NumberInput
                    id="total-length"
                    type="number"
                    aria-describedby="total-length"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={totalLength}
                    onChange={onChangeTotalLength}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">
                    소매 기장 <RequiredChar />
                  </FormLabel>
                  <NumberInput
                    id="sleeve-length"
                    type="number"
                    aria-describedby="sleeve-length"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={sleeveLength}
                    onChange={onChangeSleeveLength}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">
                    어깨 너비 <RequiredChar />
                  </FormLabel>
                  <NumberInput
                    id="shoulder-width"
                    type="number"
                    aria-describedby="shoulder-width"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={shoulderWidth}
                    onChange={onChangeShoulderWidth}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">
                    밑단 너비 <RequiredChar />
                  </FormLabel>
                  <NumberInput
                    id="bottom-width"
                    type="number"
                    aria-describedby="bottom-width"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={bottomWidth}
                    onChange={onChangeBottomWidth}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <FormLabel variant="h6">
                    팔폭 <RequiredChar />
                  </FormLabel>
                  <NumberInput
                    id="armhole-depth"
                    type="number"
                    aria-describedby="armhole-depth"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={armholeDepth}
                    onChange={onChangeArmholeDepth}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h5">
              사용한 바늘 <RequiredChar />
            </FormLabel>
            <FullWithInput
              id="needle"
              aria-describedby="needle"
              required
              placeholder="예) 5.0mm 80cm 둘레 바늘, 4.5mm 40cm 둘레 바늘"
              value={needle}
              onChange={onChangeNeedle}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h5">사용한 실</FormLabel>
            <FullWithInput
              id="yarn"
              aria-describedby="yarn"
              placeholder="예) 티파니 100g 4볼"
              value={yarn}
              onChange={onChangeYarn}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h5">추가 재료</FormLabel>
            <FullWithInput
              id="extra"
              aria-describedby="extra"
              placeholder="예) 18mm 단추 3개, 돗바늘, 지퍼 10개, 마커 10개"
              value={extra}
              onChange={onChangeExtra}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h5">판매 가격</FormLabel>
            <NumberInput
              id="price"
              type="number"
              aria-describedby="price"
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
              value={price}
              onChange={onChangePrice}
              inputProps={{ min: 0 }}
            />
          </Row>
        </Grid>
      </form>
    </>
  );
};

export default Detail;
