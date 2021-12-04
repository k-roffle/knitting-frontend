import DateFnsUtils from '@date-io/date-fns';
import {
  Grid,
  Input,
  InputAdornment,
  InputProps,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePickerProps,
} from '@material-ui/pickers';
import dayjs from 'dayjs';
import { FormLabel, RequiredMark } from 'dumbs';
import InlineInput from 'dumbs/InlineInput';
import React, { ReactNode } from 'react';
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading/dist/typings';
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

const SalesDateInfo = styled(Typography)<{
  isInvalid?: boolean;
}>`
  margin-top: ${theme.spacing(1)};
  color: ${({ isInvalid }) => (isInvalid ? '#ff0000' : '#808080')};
`;

const Wave = styled.span`
  margin: 0 ${theme.spacing(1)};
`;

const ImageWrapper = styled(Grid)`
  margin: ${theme.spacing(-1)};
`;

const ImageItem = styled(Grid)`
  margin: ${theme.spacing(1)};
  position: relative;
`;

const CloseButton = styled(Close)`
  position: absolute;
  top: ${theme.spacing(1)};
  right: ${theme.spacing(1)};
`;

const ImageUploader = styled.button`
  margin: ${theme.spacing(1)};
  border-radius: ${theme.spacing(5)};
  background: none;
  color: inherit;
  border: ${theme.spacing(0.25)} solid ${theme.palette.grey[200]};
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: ${theme.spacing(20)};
  height: ${theme.spacing(20)};
`;

const ImagePreview = styled.img`
  border-radius: ${theme.spacing(5)};
  width: ${theme.spacing(20)};
  height: ${theme.spacing(20)};
`;

const Package = (): React.ReactElement => {
  const [currentProductInput, setCurrentProductInput] = useRecoilState(
    currentProductInputAtom,
  );
  const {
    name,
    fullPrice,
    discountPrice,
    specifiedSalesStartDate,
    specifiedSalesEndDate,
    tags,
  } = currentProductInput;
  const [images, setImages] = React.useState<ImageListType>([]);

  const getRate = (): string => {
    const rate = Math.round(
      (currentProductInput.discountPrice / currentProductInput.fullPrice) * 100,
    );

    return isNaN(rate) ? '' : rate.toString();
  };

  const rate = getRate();

  const getSalePrice = (): number => {
    return currentProductInput.fullPrice - currentProductInput.discountPrice;
  };

  const renderSalesDateInfoMessage = (): ReactNode => {
    const invalidDateRange =
      dayjs(specifiedSalesStartDate).valueOf() >
      dayjs(specifiedSalesEndDate).valueOf();

    let isInvalid = false;
    let message = '상품이 등록된 이후부터 계속해서 판매됩니다.';

    if (specifiedSalesStartDate || specifiedSalesEndDate) {
      if (specifiedSalesStartDate) {
        message = `${formatDate(
          specifiedSalesStartDate,
        )} 이후부터 계속해서 판매됩니다.`;
      }
      if (specifiedSalesEndDate) {
        message = `상품이 등록된 이후부터 ${formatDate(
          specifiedSalesEndDate,
        )} 까지
          판매됩니다.`;
      }
      if (specifiedSalesStartDate && specifiedSalesEndDate) {
        if (invalidDateRange) {
          isInvalid = true;
          message = '종료일은 시작일보다 커야 합니다.';
        } else {
          message = `
          ${formatDate(specifiedSalesStartDate)} 이후부터
          ${formatDate(specifiedSalesEndDate)}까지 판매됩니다.
        `;
        }
      }
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

  const onChangeImages = (imageList: ImageListType) => {
    setImages(imageList);
  };

  return (
    <form>
      <Grid container>
        <Row item xs={12}>
          <InlineInput
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
          <ImageUploading
            multiple
            value={images}
            onChange={onChangeImages}
            maxNumber={3}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemove }) => (
              <ImageWrapper container>
                {imageList.map((image, index) => (
                  <ImageItem key={index} item>
                    <ImagePreview src={image.data_url} alt="" />
                    <CloseButton onClick={() => onImageRemove(index)} />
                  </ImageItem>
                ))}
                <ImageUploader onClick={onImageUpload}>
                  새로 업로드하기
                </ImageUploader>
              </ImageWrapper>
            )}
          </ImageUploading>
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
