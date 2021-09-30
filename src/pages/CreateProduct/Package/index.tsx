import DateFnsUtils from '@date-io/date-fns';
import {
  Grid,
  Input,
  InputAdornment,
  InputProps,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePickerProps,
} from '@material-ui/pickers';
import dayjs from 'dayjs';
import { FormLabel, RequiredInput, RequiredMark } from 'dumbs';
import InlineInput from 'dumbs/InlineInput';
import React, { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { formatDate } from 'utils/format';

import { currentProductInputAtom } from '../recoils';

const Row = styled(Grid)`
  margin-top: ${theme.spacing(2)};
`;

const FullWidthInput = styled(Input)`
  width: 100%;
`;

const Rate = styled.span`
  color: ${theme.palette.primary.main};
  margin-left: ${theme.spacing(2)};
  font-size: ${theme.spacing(1.75)};
`;

const SalesDateInfo = styled(Typography)<{ fontcolor?: string }>`
  margin-top: ${theme.spacing(1)};
  color: ${({ fontcolor }) => fontcolor};
`;

const Wave = styled.span`
  margin: 0 ${theme.spacing(1)};
`;

const Package = (): React.ReactElement => {
  const [currentProductInput, setCurrentProductInput] = useRecoilState(
    currentProductInputAtom,
  );
  const {
    name,
    fullPrice,
    discountPrice,
    representativeImageUrl,
    specifiedSalesStartDate,
    specifiedSalesEndDate,
    tags,
  } = currentProductInput;

  const getRate = (): string => {
    const rate = Math.round(
      (currentProductInput.discountPrice / currentProductInput.fullPrice) * 100,
    );

    return isNaN(rate) ? '' : rate.toString();
  };

  const getSalePrice = (): number => {
    return currentProductInput.fullPrice - currentProductInput.discountPrice;
  };

  const renderSalesDateInfoMessage = (): ReactNode => {
    let fontColor = '#808080';
    let message = '상품이 등록된 이후부터 계속해서 판매됩니다.';

    if (specifiedSalesStartDate && specifiedSalesEndDate) {
      if (
        dayjs(specifiedSalesStartDate).valueOf() >
        dayjs(specifiedSalesEndDate).valueOf()
      ) {
        fontColor = '#ff0000';
        message = '종료일은 시작일보다 커야 합니다.';
      } else {
        message = `
          ${formatDate(specifiedSalesStartDate)} 이후부터
          ${formatDate(specifiedSalesEndDate)}까지 판매됩니다.
        `;
      }
    } else if (specifiedSalesStartDate) {
      message = `${formatDate(
        specifiedSalesStartDate,
      )} 이후부터 계속해서 판매됩니다.`;
    } else if (specifiedSalesEndDate) {
      message = `상품이 등록된 이후부터 ${formatDate(
        specifiedSalesEndDate,
      )} 까지
          판매됩니다.`;
    }

    return (
      <SalesDateInfo variant="h5" fontcolor={fontColor}>
        {message}
      </SalesDateInfo>
    );
  };

  const onChangeName: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentProductInput({
      ...currentProductInput,
      name: currentTarget.value,
    });
  };

  const onChangeFullPrice: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentProductInput({
      ...currentProductInput,
      fullPrice: Number(currentTarget.value),
    });
  };

  const onChangeDiscountPrice: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentProductInput({
      ...currentProductInput,
      discountPrice: Number(currentTarget.value),
    });
  };

  const onChangeTags: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentProductInput({
      ...currentProductInput,
      tags: currentTarget.value,
    });
  };

  const onChangeSpecifiedSalesStartDate: DatePickerProps['onChange'] = (
    date,
  ) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesStartDate: date?.toISOString(),
    });
  };

  const onChangeSpecifiedSalesEndDate: DatePickerProps['onChange'] = (date) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesEndDate: date?.toISOString(),
    });
  };

  return (
    <form>
      <Grid container>
        <Row item xs={12}>
          <RequiredInput
            id="name"
            variant="h5"
            label="상품명"
            placeholder="예) 이름이 아주 길고 기다란 엄청 길고 긴 무척이나 길고 길었던 도안 외 1종"
            value={name}
            onChange={onChangeName}
          />
        </Row>
        <Row item xs={12}>
          <FormLabel variant="h5">
            판매가
            <RequiredMark />
          </FormLabel>
          <InlineInput
            id="fullPrice"
            type="number"
            label="정가"
            variant="h6"
            value={fullPrice}
            aria-describedby="fullPrice"
            endAdornment={<InputAdornment position="end">원</InputAdornment>}
            onChange={onChangeFullPrice}
          />
          <Row container>
            <InlineInput
              id="discountPrice"
              type="number"
              label="할인"
              variant="h6"
              value={discountPrice}
              aria-describedby="discountPrice"
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
              onChange={onChangeDiscountPrice}
            />
            {getRate() && (
              <Rate>
                <b>{getRate()}%</b> 할인
              </Rate>
            )}
          </Row>
          <Row alignItems="center" container item>
            <Grid item>
              <FormLabel variant="h6">판매가</FormLabel>
            </Grid>
            <Grid item>{getSalePrice()}원</Grid>
          </Row>
        </Row>
        <Row item xs={12}>
          <FormLabel variant="h5">
            대표 이미지
            <RequiredMark />
          </FormLabel>
          <img src={representativeImageUrl} loading="lazy" alt="대표 이미지" />
        </Row>
        <Row item xs={12}>
          <FormLabel variant="h5">판매 기간</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid alignItems="center" container>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                id="date-picker-inline"
                value={specifiedSalesStartDate}
                onChange={onChangeSpecifiedSalesStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                invalidDateMessage=""
              />
              <Wave>~</Wave>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                id="date-picker-inline"
                value={specifiedSalesEndDate}
                onChange={onChangeSpecifiedSalesEndDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                invalidDateMessage=""
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Row>
        <Grid item xs={12}>
          {renderSalesDateInfoMessage()}
        </Grid>
        <Row item xs={12}>
          <FormLabel variant="h5">검색 태그</FormLabel>
          <FullWidthInput
            id="tags"
            placeholder="예) #앙고라니트 #터틀넥니트"
            value={tags}
            onChange={onChangeTags}
          />
        </Row>
      </Grid>
    </form>
  );
};

export default Package;

// "id": null,
//   "name": "대충 살자",
//   "full_price": 10000,
//   "discount_price": 1000,
//   "representative_image_url": "https://t1.daumcdn.net/cfile/tistory/9904134E5CA5480229",
//   "specified_sales_start_date": null,
//   "specified_sales_end_date": null,
//   "tags": ["서술형 도안"],
//   "design_ids": [1, 2, 3]
