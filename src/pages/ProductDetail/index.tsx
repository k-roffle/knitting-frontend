import { FAILED_TO_GET_PRODUCT } from 'constants/errors';

import { Box, Grid, Typography } from '@material-ui/core';
import { Button, Layout } from 'dumbs';
import { useGet } from 'hooks/useGet';
import { Product } from 'pages/ProductDetail/types';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ObjectResponse } from 'utils/requestType';

import MyInformation from '../MyInformation';

import { Row, Profile, Tag, Price, Design } from './ProductDetail.css';

type Props = {
  id: string;
};

const ProductDetail = ({
  match,
}: RouteComponentProps<Props>): React.ReactElement => {
  const { data } = useGet<ObjectResponse<Product>, unknown>({
    pathname: `/product/mine/${match.params.id}`,
    errorMessage: FAILED_TO_GET_PRODUCT,
  });

  if (data == null) {
    return <MyInformation />;
  }

  const {
    name,
    full_price: fullPrice,
    discount_price: discountPrice,
    representative_image_url: representativeImageUrl,
    tags,
    content,
  } = data.payload;

  const getRate = () => {
    return Math.round((fullPrice - discountPrice) / 100);
  };

  return (
    <Layout>
      <Grid container>
        <Row item xs={6}>
          <img src={representativeImageUrl} alt="상품 대표 이미지" />
        </Row>
        <Row item xs={6}>
          <Box display="flex" alignItems="center">
            <Profile src="//via.placeholder.com/35x35" alt="판매자 프로필" />
            <Typography variant="h4">yool</Typography>
          </Box>
          <Box mt={1}>
            <Typography variant="h3">{name}</Typography>
          </Box>
          <Box mt={1} display="flex" justifyContent="end">
            {tags.map((tag: string, index: number) => (
              <Tag key={index}>#{tag}</Tag>
            ))}
          </Box>
          <Box mt={1} display="flex" justifyContent="end">
            <Typography variant="h4" color="primary">
              {getRate()}%
            </Typography>
            <Price variant="h3">{discountPrice.toLocaleString()}원</Price>
          </Box>
          <Box mt={1}>
            <Button label="구매하기" fullWidth />
          </Box>
        </Row>
        {true && (
          <Row item xs={12}>
            <Typography variant="h4">상품에 포함된 도안</Typography>
            <Design display="inline-block">
              <img src="//via.placeholder.com/200x200" alt="도안 이미지" />
              <Box p={2}>
                <Typography variant="h4">유샤샤 뽀샹 니트</Typography>
                <Box display="flex" justifyContent="end">
                  <Tag>상의</Tag>
                  <Tag>서술형 도안</Tag>
                </Box>
              </Box>
            </Design>
          </Row>
        )}
        <Row item xs={12}>
          <Typography variant="h4">작가님의 상품 소개</Typography>
          <Box>{content}</Box>
        </Row>
      </Grid>
    </Layout>
  );
};

export default ProductDetail;
