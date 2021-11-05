import {
  Grid,
  InputAdornment,
  InputProps,
  ListSubheader,
  MenuItem,
  SelectProps,
  Tooltip,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { FormLabel, InputWithLabel, RequiredMark, RequiredSelect } from 'dumbs';
import { InfoBox } from 'pages/CreateDesign/Outline/Outline.css';
import useInvalidOutline from 'pages/CreateDesign/hooks/useInvalidOutline';
import { currentOutlineInputAtom } from 'pages/CreateDesign/recoils';
import {
  DESIGN,
  DESIGN_TYPE,
  PATTERN,
  PATTERN_TYPE,
} from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilState } from 'recoil';
import { renderDesign, renderPattern } from 'utils/renderText';

import OptionalOutline from '../components/OptionalOutline';

const Outline = (): React.ReactElement => {
  const { SWEATER } = DESIGN;
  const { TEXT, IMAGE, VIDEO } = PATTERN;

  const [currentOutlineInput, setCurrentOutlineInput] = useRecoilState(
    currentOutlineInputAtom,
  );

  const {
    designType,
    patternType,
    stitches,
    rows,
    needle,
  } = currentOutlineInput;

  const isInvalidOutlineValue = useInvalidOutline();

  const checkNotPositiveNumber = ({
    value,
  }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    return value.length >= 1 && Number(value) < 1;
  };

  const getNumberToChange = ({
    value,
  }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    const valueToNumber = Number(value);

    return isNaN(valueToNumber) ? 0 : valueToNumber;
  };

  const onChangeDesignType: SelectProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentOutlineInput({
      ...currentOutlineInput,
      designType: currentTarget.value as DESIGN_TYPE,
    });
  };

  const onChangePatternType: SelectProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentOutlineInput({
      ...currentOutlineInput,
      patternType: currentTarget.value as PATTERN_TYPE,
    });
  };

  const onChangeStitches: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentOutlineInput({
      ...currentOutlineInput,
      stitches: getNumberToChange(currentTarget),
    });
  };

  const onChangeRows: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentOutlineInput({
      ...currentOutlineInput,
      rows: getNumberToChange(currentTarget),
    });
  };

  const onChangeNeedle: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentOutlineInput({
      ...currentOutlineInput,
      needle: currentTarget.value,
    });
  };

  return (
    <Grid container>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <RequiredSelect
            id="design-type"
            variant="h5"
            label="편물 종류"
            placeholder="종류 선택"
            defaultValue={SWEATER}
            value={designType}
            onChange={onChangeDesignType}
          >
            <ListSubheader>상의</ListSubheader>
            <MenuItem value={SWEATER}>{renderDesign(SWEATER)}</MenuItem>
          </RequiredSelect>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RequiredSelect
            id="pattern-type"
            variant="h5"
            label="도안 종류"
            placeholder="종류 선택"
            defaultValue={TEXT}
            value={patternType}
            onChange={onChangePatternType}
          >
            <MenuItem value={TEXT}>{renderPattern(TEXT)}</MenuItem>
            <MenuItem value={IMAGE}>{renderPattern(IMAGE)}</MenuItem>
            <MenuItem value={VIDEO}>{renderPattern(VIDEO)}</MenuItem>
          </RequiredSelect>
        </Grid>
      </Grid>
      <FormLabel variant="h5">
        게이지
        <RequiredMark />
        <Tooltip
          title="10 x 10(cm) 편물의 코와 단을 공유해주세요."
          placement="right"
        >
          <InfoOutlinedIcon />
        </Tooltip>
      </FormLabel>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <InputWithLabel
            id="stitches"
            type="number"
            variant="h6"
            label="코"
            endAdornment={<InputAdornment position="end">코</InputAdornment>}
            value={stitches}
            onChange={onChangeStitches}
            isRequired
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputWithLabel
            id="rows"
            type="number"
            variant="h6"
            label="단"
            endAdornment={<InputAdornment position="end">단</InputAdornment>}
            value={rows}
            onChange={onChangeRows}
            isRequired
          />
        </Grid>
      </Grid>
      <InputWithLabel
        id="needle"
        variant="h5"
        label="사용한 바늘"
        placeholder="예) 5.0mm 80cm 둘레 바늘, 4.5mm 40cm 둘레 바늘"
        value={needle}
        onChange={onChangeNeedle}
        isRequired
      />
      {!isInvalidOutlineValue && (
        <>
          <InfoBox mt={3} py={2} textAlign="center">
            필수값을 모두 입력하였어요.
            <br /> 많은 양의 정보를 입력하고 니터들에게 관심을 받아봐요. 🥰
          </InfoBox>
          <OptionalOutline />
        </>
      )}
    </Grid>
  );
};

export default Outline;
