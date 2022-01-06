import {
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { FormLabel, InputWithLabel } from 'knitting/dumbs';
import {
  OptionalOutlineInput,
  optionalOutlineInputAtom,
} from 'knitting/pages/CreateDesign/atom';
import { FullWidthInput, Row } from 'knitting/pages/CreateDesign/common.css';
import { DesignSize, LevelKind } from 'knitting/pages/CreateDesign/types';
import { SnakeToCamelCase } from 'knitting/utils/types';
import React from 'react';
import { useRecoilState } from 'recoil';

import DesignSizeImage from '../DesignSizeImage';

import { LevelLabel } from './OptionalOutline.css';

type DesignSizeKey = keyof SnakeToCamelCase<DesignSize>;

const OptionalOutline = (): React.ReactElement => {
  const [optionalOutlineInput, setOptionalOutlineInput] = useRecoilState(
    optionalOutlineInputAtom,
  );

  const { techniques, targetLevel, yarn, extra, size } = optionalOutlineInput;
  const {
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
  } = size;

  const getNumberToChange = (value: string) => {
    const valueToNumber = Number(value);

    return isNaN(valueToNumber) ? 0 : valueToNumber;
  };

  const handleInputChange = (
    {
      currentTarget,
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: keyof OptionalOutlineInput,
  ): void => {
    setOptionalOutlineInput({
      ...optionalOutlineInput,
      [type]: currentTarget.value,
    });
  };

  const handleSizeChange = (
    {
      currentTarget,
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: DesignSizeKey,
  ): void => {
    setOptionalOutlineInput({
      ...optionalOutlineInput,
      size: {
        ...size,
        [type]: getNumberToChange(currentTarget.value),
      },
    });
  };

  return (
    <Grid container>
      <Row item xs={12}>
        <FormLabel variant="h5">뜨개 기법</FormLabel>
        <FullWidthInput
          id="techniques"
          aria-describedby="techniques"
          placeholder="예) 겉뜨기, 안뜨기, 원통뜨기"
          value={techniques}
          onChange={(event) => handleInputChange(event, 'techniques')}
        />
      </Row>
      <Row item xs={12}>
        <FormLabel variant="h5">난이도</FormLabel>
        <RadioGroup
          value={targetLevel}
          onChange={(event) => handleInputChange(event, 'targetLevel')}
        >
          {LevelKind.map(({ value, label, description: levelDescription }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio color="primary" />}
              label={
                <LevelLabel>
                  <span>{label}</span>
                  <Typography variant="subtitle2">
                    {levelDescription}
                  </Typography>
                </LevelLabel>
              }
            />
          ))}
        </RadioGroup>
      </Row>
      <Row item xs={12}>
        <InputWithLabel
          id="yarn"
          variant="h5"
          label="사용한 실"
          placeholder="예) 티파니 100g 4볼"
          value={yarn}
          onChange={(event) => handleInputChange(event, 'yarn')}
        />
      </Row>
      <Row item xs={12}>
        <FormLabel variant="h5">추가 재료</FormLabel>
        <FullWidthInput
          id="extra"
          aria-describedby="extra"
          placeholder="예) 18mm 단추 3개, 돗바늘, 지퍼 10개, 마커 10개"
          value={extra}
          onChange={(event) => handleInputChange(event, 'extra')}
        />
      </Row>
      <Row container>
        <FormLabel variant="h5">사이즈</FormLabel>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <DesignSizeImage />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid>
              <InputWithLabel
                id="total-length"
                type="number"
                variant="h6"
                label="총기장"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                value={totalLength}
                onChange={(event) => handleSizeChange(event, 'totalLength')}
              />
            </Grid>
            <Grid>
              <InputWithLabel
                id="sleeve-width"
                type="number"
                variant="h6"
                label="소매 기장"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                value={sleeveLength}
                onChange={(event) => handleSizeChange(event, 'sleeveLength')}
              />
            </Grid>
            <Grid>
              <InputWithLabel
                id="shoulder-width"
                type="number"
                variant="h6"
                label="어깨 너비"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                value={shoulderWidth}
                onChange={(event) => handleSizeChange(event, 'shoulderWidth')}
              />
            </Grid>
            <Grid>
              <InputWithLabel
                id="bottom-width"
                type="number"
                variant="h6"
                label="밑단 너비"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                value={bottomWidth}
                onChange={(event) => handleSizeChange(event, 'bottomWidth')}
              />
            </Grid>
            <Grid>
              <InputWithLabel
                id="armhole-depth"
                type="number"
                variant="h6"
                label="팔폭"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                value={armholeDepth}
                onChange={(event) => handleSizeChange(event, 'armholeDepth')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Row>
    </Grid>
  );
};

export default OptionalOutline;
