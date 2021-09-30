import DateFnsUtils from '@date-io/date-fns';
import {
  Grid,
  Input,
  InputAdornment,
  InputLabel,
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

const FullWidthInput = styled(Input)`
  width: 100%;
`;

const Rate = styled.span`
  color: ${theme.palette.primary.main};
  margin-left: ${theme.spacing(2)};
  font-size: ${theme.spacing(1.75)};
`;

const SalesDateInfo = styled(Typography)<{ isInvalid?: boolean }>`
  color: ${(props) => (props.isInvalid ? '#ff0000' : '#808080')};
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
    designIds,
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
    let isInvalid = false;
    let message = '상품이 등록된 이후부터 계속해서 판매됩니다.';

    if (specifiedSalesStartDate && specifiedSalesEndDate) {
      if (
        dayjs(specifiedSalesStartDate).valueOf() >
        dayjs(specifiedSalesEndDate).valueOf()
      ) {
        isInvalid = true;
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
      <SalesDateInfo variant="h5" isInvalid={isInvalid}>
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
      tags: currentTarget.value.split('#').map((tag) => tag.trim()),
    });
  };

  const onChangeSpecifiedSalesStartDate: DatePickerProps['onChange'] = (
    date,
  ) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesStartDate: date?.toString() || '',
    });
  };

  const onChangeSpecifiedSalesEndDate: DatePickerProps['onChange'] = (date) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesEndDate: date?.toString() || '',
    });
  };

  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <RequiredInput
            id="name"
            variant="h5"
            label="상품명"
            placeholder="예) 이름이 아주 길고 기다란 엄청 길고 긴 무척이나 길고 길었던 도안 외 1종"
            value={name}
            onChange={onChangeName}
          />
        </Grid>
        <Grid item xs={12}>
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
          <Grid container>
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
          </Grid>
          <InputLabel>판매가</InputLabel>
          {getSalePrice()}원
        </Grid>
        <Grid item xs={12}>
          <FormLabel variant="h5">
            대표 이미지
            <RequiredMark />
          </FormLabel>
          <img src="//via.placeholder.com/100x100" loading="lazy" />
        </Grid>
        <Grid item xs={12}>
          <FormLabel variant="h5">판매 기간</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                value={specifiedSalesStartDate}
                onChange={onChangeSpecifiedSalesStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                invalidDateMessage=""
              />
              ~
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
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
        </Grid>
        <Grid item xs={12}>
          {renderSalesDateInfoMessage()}
        </Grid>
        <Grid item xs={12}>
          <FormLabel variant="h5">검색 태그</FormLabel>
          <FullWidthInput
            id="tags"
            placeholder="예) #앙고라니트 #터틀넥니트"
            value={tags}
            onChange={onChangeTags}
          />
        </Grid>
        {/* <Grid item xs={12}>*/}
        {/*  <RequiredInput*/}
        {/*    id="name"*/}
        {/*    variant="h5"*/}
        {/*    label="상품명"*/}
        {/*    placeholder="예) 이름이 아주 길고 기다란 엄청 길고 긴 무척이나 길고 길었던 도안 외 1종"*/}
        {/*    value={name}*/}
        {/*    onChange={onChangeName}*/}
        {/*  />*/}
        {/* </Grid>*/}
        {/* <Grid item xs={12}>*/}
        {/*  <h4>판매가</h4>*/}
        {/*  <RequiredMark />*/}
        {/* </Grid>*/}
        {/* <Grid item xs={12}>*/}
        {/*  <FormLabel>정가</FormLabel>*/}
        {/*  <Input*/}
        {/*    id="fullPrice"*/}
        {/*    type="number"*/}
        {/*    aria-describedby="fullPrice"*/}
        {/*    endAdornment={<InputAdornment position="end">원</InputAdornment>}*/}
        {/*    value={fullPrice}*/}
        {/*    onChange={onChangeFullPrice}*/}
        {/*  />*/}
        {/* </Grid>*/}
        {/* <Grid item xs={12}>*/}
        {/*  <FormLabel>할인</FormLabel>*/}
        {/*  <Input*/}
        {/*    id="discountPrice"*/}
        {/*    type="number"*/}
        {/*    aria-describedby="discountPrice"*/}
        {/*    endAdornment={<InputAdornment position="end">원</InputAdornment>}*/}
        {/*    value={discountPrice}*/}
        {/*    onChange={onChangeFullPrice}*/}
        {/*  />*/}
        {/*  <span>{getRate}%</span>*/}
        {/* </Grid>*/}
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
