import {
  Grid,
  InputAdornment,
  ListSubheader,
  MenuItem,
  SelectProps,
  Tooltip,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {
  FormLabel,
  InputWithLabel,
  RequiredMark,
  RequiredSelect,
} from 'knitting/dumbs';
import { InfoBox } from 'knitting/pages/CreateDesign/Outline/Outline.css';
import {
  OutlineInput,
  outlineInputAtom,
} from 'knitting/pages/CreateDesign/atom';
import useInvalidOutline from 'knitting/pages/CreateDesign/hooks/useInvalidOutline';
import { DESIGN, PATTERN } from 'knitting/pages/CreateDesign/types';
import { renderDesign, renderPattern } from 'knitting/utils/renderText';
import React from 'react';
import { useRecoilState } from 'recoil';

import { Row } from '../common.css';
import OptionalOutline from '../components/OptionalOutline';

const Outline = (): React.ReactElement => {
  const { SWEATER } = DESIGN;
  const { TEXT, IMAGE, VIDEO } = PATTERN;

  const [outlineInput, setOutlineInput] = useRecoilState(outlineInputAtom);

  const { designType, patternType, stitches, rows, needle } = outlineInput;

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

  const handleSelectChange = (
    { target }: React.ChangeEvent<SelectProps>,
    type: keyof OutlineInput,
  ): void => {
    setOutlineInput({
      ...outlineInput,
      [type]: target.value,
    });
  };

  const handleInputChange = (
    {
      currentTarget,
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: keyof OutlineInput,
    isNumber = false,
  ): void => {
    if (checkNotPositiveNumber(currentTarget)) return;

    setOutlineInput({
      ...outlineInput,
      [type]: isNumber ? getNumberToChange(currentTarget) : currentTarget.value,
    });
  };

  return (
    <Grid container>
      <Row item xs={12} sm={6}>
        <RequiredSelect
          id="design-type"
          variant="h5"
          label="편물 종류"
          placeholder="종류 선택"
          defaultValue={SWEATER}
          value={designType}
          onChange={(event) => handleSelectChange(event, 'designType')}
        >
          <ListSubheader>상의</ListSubheader>
          <MenuItem value={SWEATER}>{renderDesign(SWEATER)}</MenuItem>
        </RequiredSelect>
      </Row>
      <Row item xs={12} sm={6}>
        <RequiredSelect
          id="pattern-type"
          variant="h5"
          label="도안 종류"
          placeholder="종류 선택"
          defaultValue={TEXT}
          value={patternType}
          onChange={(event) => handleSelectChange(event, 'patternType')}
        >
          <MenuItem value={TEXT}>{renderPattern(TEXT)}</MenuItem>
          <MenuItem value={IMAGE}>{renderPattern(IMAGE)}</MenuItem>
          <MenuItem value={VIDEO}>{renderPattern(VIDEO)}</MenuItem>
        </RequiredSelect>
      </Row>
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
      <Grid container>
        <Row item xs={12} sm={6}>
          <InputWithLabel
            id="stitches"
            type="number"
            variant="h6"
            label="코"
            endAdornment={<InputAdornment position="end">코</InputAdornment>}
            value={stitches}
            onChange={(event) => handleInputChange(event, 'stitches', true)}
            isRequired
          />
        </Row>
        <Row item xs={12} sm={6}>
          <InputWithLabel
            id="rows"
            type="number"
            variant="h6"
            label="단"
            endAdornment={<InputAdornment position="end">단</InputAdornment>}
            value={rows}
            onChange={(event) => handleInputChange(event, 'rows', true)}
            isRequired
          />
        </Row>
      </Grid>
      <Row item xs={12}>
        <InputWithLabel
          id="needle"
          variant="h5"
          label="사용한 바늘"
          placeholder="예) 5.0mm 80cm 둘레 바늘, 4.5mm 40cm 둘레 바늘"
          value={needle}
          onChange={(event) => handleInputChange(event, 'needle')}
          isRequired
        />
      </Row>
      {!isInvalidOutlineValue && (
        <>
          <Row item xs={12}>
            <InfoBox mt={3} py={2} textAlign="center">
              필수값을 모두 입력하였어요.
              <br /> 많은 양의 정보를 입력하고 니터들에게 관심을 받아봐요. 🥰
            </InfoBox>
          </Row>
          <OptionalOutline />
        </>
      )}
    </Grid>
  );
};

export default Outline;
