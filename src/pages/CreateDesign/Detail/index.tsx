import {
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputProps,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  SelectProps,
  Typography,
} from '@material-ui/core';
import FileUploader from 'components/ImageFileUploader';
import { RequiredSelect, RequiredInput, FormLabel } from 'dumbs';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { flexVerticalAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';
import { renderDesign, renderPattern } from 'utils/renderText';

import DesignSizeImage from '../components/DesignSizeImage';
import { currentDesignInputAtom, localCoverImageAtom } from '../recoils';
import {
  DESIGN,
  DESIGN_TYPE,
  LevelKind,
  LEVEL_TYPE,
  PATTERN,
  PATTERN_TYPE,
} from '../types';

const FullWithInput = styled(Input)`
  width: 100%;
`;

const Row = styled(Grid)`
  padding: ${theme.spacing(1.5)};
`;

const LevelLabel = styled.div`
  ${flexVerticalAlign}

  span {
    margin-right: ${theme.spacing(1.5)};
  }

  h6 {
    font-weight: 400;
    color: ${palette.text.secondary};
  }
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
    designType,
    patternType,
    description,
    techniques,
    targetLevel,
  } = currentDesignInput;

  const [localCoverImage, setLocalCoverImage] = useRecoilState(
    localCoverImageAtom,
  );

  const { SWEATER } = DESIGN;
  const { TEXT, IMAGE, VIDEO } = PATTERN;

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

  const onChangeName: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      name: currentTarget.value,
    });
  };
  const onChangeStitches: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      stitches: getNumberToChange(currentTarget),
    });
  };
  const onChangeRows: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      rows: getNumberToChange(currentTarget),
    });
  };
  const onChangeTotalLength: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      totalLength: getNumberToChange(currentTarget),
    });
  };
  const onChangeSleeveLength: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      sleeveLength: getNumberToChange(currentTarget),
    });
  };
  const onChangeShoulderWidth: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      shoulderWidth: getNumberToChange(currentTarget),
    });
  };
  const onChangeBottomWidth: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      bottomWidth: getNumberToChange(currentTarget),
    });
  };
  const onChangeArmholeDepth: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      armholeDepth: getNumberToChange(currentTarget),
    });
  };
  const onChangeNeedle: InputProps['onChange'] = ({ currentTarget }) => {
    if (checkNotPositiveNumber(currentTarget)) return;
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

  const onChangeDescription: InputProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      description: currentTarget.value,
    });
  };

  const onChangeTechniques: InputProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      techniques: currentTarget.value,
    });
  };

  const onChangeLevelType: SelectProps['onChange'] = ({ currentTarget }) => {
    if (currentTarget == null) return;
    setCurrentDesignInputAtom({
      ...currentDesignInput,
      targetLevel: currentTarget.value as LEVEL_TYPE,
    });
  };

  return (
    <>
      <form autoComplete="false">
        <Grid container>
          <Row item xs={12}>
            <RequiredInput
              id="name"
              variant="h5"
              label="이름"
              placeholder="예) 토니 캔디 라운드넥 니트"
              value={name}
              onChange={onChangeName}
            />
          </Row>
          <Row item xs={12}>
            <FileUploader
              selectedFiles={localCoverImage}
              onChange={setLocalCoverImage}
            />
          </Row>
          <Row container spacing={6}>
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
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h5">도안 한 줄 소개</FormLabel>
            <FullWithInput
              id="description"
              aria-describedby="description"
              placeholder="예) 어디서나 잘 어울리는 기본 니트 도안"
              value={description}
              onChange={onChangeDescription}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h5">뜨개 기법</FormLabel>
            <FullWithInput
              id="techniques"
              aria-describedby="techniques"
              placeholder="예) 겉뜨기, 안뜨기, 원통뜨기"
              value={techniques}
              onChange={onChangeTechniques}
            />
          </Row>
          <Row item xs={12}>
            <FormLabel variant="h5">난이도</FormLabel>
            <RadioGroup value={targetLevel} onChange={onChangeLevelType}>
              {LevelKind.map(
                ({ value, label, description: levelDescription }) => (
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
                ),
              )}
            </RadioGroup>
          </Row>
          <Row container>
            <FormLabel variant="h5">게이지</FormLabel>
            <FormLabel>10 x 10(cm) 편물의 코와 단을 공유해주세요.</FormLabel>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <RequiredInput
                  id="stitches"
                  type="number"
                  variant="h6"
                  label="코"
                  endAdornment={
                    <InputAdornment position="end">코</InputAdornment>
                  }
                  value={stitches}
                  onChange={onChangeStitches}
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RequiredInput
                  id="rows"
                  type="number"
                  variant="h6"
                  label="단"
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
                  <RequiredInput
                    id="total-length"
                    type="number"
                    variant="h6"
                    label="총기장"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={totalLength}
                    onChange={onChangeTotalLength}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <RequiredInput
                    id="sleeve-width"
                    type="number"
                    variant="h6"
                    label="소매 기장"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={sleeveLength}
                    onChange={onChangeSleeveLength}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <RequiredInput
                    id="shoulder-width"
                    type="number"
                    variant="h6"
                    label="어깨 너비"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={shoulderWidth}
                    onChange={onChangeShoulderWidth}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <RequiredInput
                    id="bottom-width"
                    type="number"
                    variant="h6"
                    label="밑단 너비"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={bottomWidth}
                    onChange={onChangeBottomWidth}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid>
                  <RequiredInput
                    id="armhole-depth"
                    type="number"
                    variant="h6"
                    label="팔폭"
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
            <RequiredInput
              id="needle"
              variant="h5"
              label="사용한 바늘"
              placeholder="예) 5.0mm 80cm 둘레 바늘, 4.5mm 40cm 둘레 바늘"
              value={needle}
              onChange={onChangeNeedle}
            />
          </Row>
          <Row item xs={12}>
            <RequiredInput
              id="yarn"
              variant="h5"
              label="사용한 실"
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
        </Grid>
      </form>
    </>
  );
};

export default Detail;
