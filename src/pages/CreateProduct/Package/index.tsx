import { FormLabel, InputWithLabel, RequiredMark } from 'knitting/dumbs';
import Accordion from 'knitting/dumbs/Accordion';
import InlineInput, { FormLabel as Label } from 'knitting/dumbs/InlineInput';
import { formatDate } from 'knitting/utils/format';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Grid,
  InputProps,
  InputAdornment,
  TextField,
  TextFieldProps,
  Input,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { ChangeEvent, ReactNode, useState } from 'react';
import { useRecoilState } from 'recoil';

import { DesignItemResponse } from '../../MyInformation/hooks/types';
import { currentProductInputAtom } from '../recoils';

import {
  AccordionDetail,
  FullWidthInput,
  Name,
  Price,
  Rate,
  Row,
  SalesDateInfo,
  Wave,
} from './Package.css';

const Package = (): React.ReactElement => {
  const [discount, setDiscount] = useState<number>(0);
  const [currentProductInput, setCurrentProductInput] = useRecoilState(
    currentProductInputAtom,
  );
  const {
    name,
    fullPrice,
    specifiedSalesStartedAt,
    specifiedSalesEndedAt,
    tags,
    designs,
  } = currentProductInput;
  const [invalidPrice, setInvalidPrice] = React.useState<boolean>(false);

  const getRate = (): string => {
    const rate = Math.round((discount / currentProductInput.fullPrice) * 100);

    return isNaN(rate) ? '' : rate.toString();
  };

  const rate = getRate();

  const getSalePrice = (): number => {
    return currentProductInput.fullPrice - discount;
  };

  React.useEffect(() => {
    if (fullPrice < discount) {
      setInvalidPrice(true);
    }
  }, [fullPrice, discount]);

  const renderSalesDateInfoMessage = (): ReactNode => {
    const invalidDateRange =
      dayjs(specifiedSalesStartedAt).valueOf() >
      dayjs(specifiedSalesEndedAt).valueOf();

    let invalid = false;
    let message = '상품이 등록된 이후부터 계속해서 판매됩니다.';

    if (specifiedSalesStartedAt || specifiedSalesEndedAt) {
      if (specifiedSalesStartedAt) {
        message = `${formatDate(
          specifiedSalesStartedAt,
        )} 이후부터 계속해서 판매됩니다.`;
      }
      if (specifiedSalesEndedAt) {
        message = `상품이 등록된 이후부터 ${formatDate(
          specifiedSalesEndedAt,
        )} 까지
          판매됩니다.`;
      }
      if (specifiedSalesStartedAt && specifiedSalesEndedAt) {
        if (invalidDateRange) {
          invalid = true;
          message = '종료일은 시작일보다 커야 합니다.';
        } else {
          message = `
          ${formatDate(specifiedSalesStartedAt)} 이후부터
          ${formatDate(specifiedSalesEndedAt)}까지 판매됩니다.
        `;
        }
      }
    }

    return (
      <SalesDateInfo variant="h5" invalid={invalid || undefined}>
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

  const onChangeDiscount: InputProps['onChange'] = ({ currentTarget }) => {
    setDiscount(Number(currentTarget.value));
    setCurrentProductInput({
      ...currentProductInput,
      discountPrice:
        currentProductInput.fullPrice - Number(currentTarget.value),
    });
  };

  const onChangeTags: InputProps['onChange'] = ({ currentTarget }) => {
    setCurrentProductInput({
      ...currentProductInput,
      tags: currentTarget.value,
    });
  };

  const onChangespecifiedSalesStartedAt = (date: Date | null) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesStartedAt: date?.toISOString() ?? null,
    });
  };

  const onChangespecifiedSalesEndedAt = (date: Date | null) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesEndedAt: date?.toISOString() ?? null,
    });
  };

  const onChangeImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentProductInput({
      ...currentProductInput,
      representativeImageUrl: target.value,
    });
  };

  const renderDetailElements = () => {
    return designs.map((design: DesignItemResponse) => (
      <AccordionDetail key={design.id}>
        <Name>{design.name}</Name>
        <Price>+ {design.price.toLocaleString()} 원</Price>
      </AccordionDetail>
    ));
  };

  return (
    <form>
      <Grid container>
        <Row item xs={12}>
          <InputWithLabel
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
          <Row container alignItems="center">
            <Grid>
              <Label variant="h6">정가</Label>
            </Grid>
            <Accordion
              summary={`${fullPrice.toLocaleString()} 원`}
              detailElements={renderDetailElements()}
            />
          </Row>
          <Row container>
            <InlineInput
              id="discount"
              type="number"
              label="할인"
              variant="h6"
              value={discount}
              aria-describedby="discount"
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
              onChange={onChangeDiscount}
              error={invalidPrice}
              message="할인가는 정가보다 클 수 없습니다."
            />
            {rate && (
              <Rate>
                <b>{rate}%</b> 할인
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
          <Input type="file" onChange={onChangeImage} />
        </Row>
        <Row item xs={12}>
          <FormLabel variant="h5">판매 기간</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid alignItems="center" container>
              <DatePicker
                disableFuture
                openTo="day"
                views={['year', 'month', 'day']}
                value={specifiedSalesStartedAt}
                onChange={onChangespecifiedSalesStartedAt}
                renderInput={(params: TextFieldProps) => (
                  <TextField {...params} />
                )}
              />
              <Wave>~</Wave>
              <DatePicker
                disableFuture
                openTo="day"
                views={['year', 'month', 'day']}
                value={specifiedSalesEndedAt}
                onChange={onChangespecifiedSalesEndedAt}
                renderInput={(params: TextFieldProps) => (
                  <TextField {...params} />
                )}
              />
            </Grid>
          </LocalizationProvider>
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
