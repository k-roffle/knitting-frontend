import {
  FormLabel,
  InputWithLabel,
  RequiredMark,
  RequiredSelect,
} from 'knitting/dumbs';
import { renderDesign, renderPattern } from 'knitting/utils/renderText';

import { InfoOutlined } from '@mui/icons-material';
import {
  Grid,
  InputAdornment,
  ListSubheader,
  MenuItem,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { OutlineInput, outlineInputAtom, stepValidationsAtom } from '../atom';
import { Row } from '../common.css';
import Footer from '../components/Footer';
import { useStepController } from '../components/Footer/hooks/useStepController';
import OptionalOutline from '../components/OptionalOutline';
import { DESIGN, PAGE, PATTERN } from '../types';
import { checkInvalid } from '../utils';

import { InfoBox } from './Outline.css';

const Outline = (): React.ReactElement => {
  const { SWEATER } = DESIGN;
  const { TEXT, IMAGE, VIDEO } = PATTERN;

  const [outlineInput, setOutlineInput] = useRecoilState(outlineInputAtom);
  const stepValidations = useRecoilValue(stepValidationsAtom);
  const { onPreviousClick, onNextClick, changeValidation } =
    useStepController();

  const { price, designType, patternType, stitches, rows, needle } =
    outlineInput;

  const showValidation = stepValidations[PAGE.OUTLINE] === false;
  const showOptionalOutline = [price, stitches, rows, needle].every(
    (value) => !checkInvalid(value),
  );

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
    { target }: SelectChangeEvent<unknown>,
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

  const handleNextClick = (): void => {
    if (stepValidations[PAGE.OUTLINE] == null) {
      changeValidation([price, stitches, rows, needle]);
    }
    if (stepValidations[PAGE.OUTLINE] != null) {
      onNextClick();
    }
  };

  useEffect(() => {
    if (stepValidations[PAGE.OUTLINE] != null) {
      changeValidation([price, stitches, rows, needle]);
    }
  }, [outlineInput, stepValidations[PAGE.OUTLINE]]);

  return (
    <>
      <Grid container>
        <Row item xs={12}>
          <InputWithLabel
            id="price"
            type="number"
            variant="h5"
            label="도안 가격"
            value={price}
            onChange={(event) => handleInputChange(event, 'price', true)}
            isRequired
            showValidation={showValidation}
          />
        </Row>
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
            <InfoOutlined />
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
              showValidation={showValidation}
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
              showValidation={showValidation}
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
            showValidation={showValidation}
          />
        </Row>
        {showOptionalOutline && (
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
      <Footer
        previousLabel="이전"
        nextLabel="다음"
        onPreviousClick={onPreviousClick}
        onNextClick={handleNextClick}
      />
    </>
  );
};

export default Outline;
