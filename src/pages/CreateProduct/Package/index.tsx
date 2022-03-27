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
} from '@mui/material';
import dayjs from 'dayjs';
import React, { ReactNode } from 'react';
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading/dist/typings';
import { useRecoilState } from 'recoil';

import { currentProductInputAtom } from '../recoils';

import {
  AccordionDetail,
  CloseButton,
  FullWidthInput,
  ImageItem,
  ImagePreview,
  ImageUploader,
  ImageWrapper,
  Name,
  Price,
  Rate,
  Row,
  SalesDateInfo,
  Wave,
} from './Package.css';

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
    designs,
  } = currentProductInput;
  const [images, setImages] = React.useState<ImageListType>([]);
  const [invalidPrice, setInvalidPrice] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (fullPrice < discountPrice) {
      setInvalidPrice(true);
    }
  }, [fullPrice, discountPrice]);

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

    let invalid = false;
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
          invalid = true;
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

  const onChangeSpecifiedSalesStartDate = (date: Date | null) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesStartDate: date?.toISOString() ?? null,
    });
  };

  const onChangeSpecifiedSalesEndDate = (date: Date | null) => {
    setCurrentProductInput({
      ...currentProductInput,
      specifiedSalesEndDate: date?.toISOString() ?? null,
    });
  };

  const onChangeImages = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const renderDetailElements = () => {
    return designs.map((design) => (
      <AccordionDetail>
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
              id="discountPrice"
              type="number"
              label="할인"
              variant="h6"
              value={discountPrice}
              aria-describedby="discountPrice"
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
              onChange={onChangeDiscountPrice}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid alignItems="center" container>
              <DatePicker
                disableFuture
                openTo="day"
                views={['year', 'month', 'day']}
                value={specifiedSalesStartDate}
                onChange={onChangeSpecifiedSalesStartDate}
                renderInput={(params: TextFieldProps) => (
                  <TextField {...params} />
                )}
              />
              <Wave>~</Wave>
              <DatePicker
                disableFuture
                openTo="day"
                views={['year', 'month', 'day']}
                value={specifiedSalesEndDate}
                onChange={onChangeSpecifiedSalesEndDate}
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
