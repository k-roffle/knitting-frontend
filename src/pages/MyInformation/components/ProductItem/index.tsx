import { ProductItemResponse } from 'knitting/pages/MyInformation/hooks/types';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import React from 'react';

import {
  DiscountRate,
  ProductRepresentImage,
  Tag,
  Price,
  Period,
} from './ProductItem.css';

const ProductItem: React.FC<ProductItemResponse> = (product) => (
  <Box sx={{ display: 'flex', paddingTop: '32px', paddingBottom: '30px' }}>
    <ProductRepresentImage
      src={product.representative_image_url}
      alt="상품 대표이미지"
    />
    <Box sx={{ width: '100%', marginLeft: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '25px' }}>
            {product.name}
          </Typography>
          <Period variant="body2" sx={{ marginTop: '6px' }}>
            판매기간 {product.specified_sales_started_at} ~{' '}
            {product.specified_sales_ended_at}
          </Period>
          <Period variant="body2">수정시간 {product.updated_at}</Period>
        </Box>
        <MenuIcon />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          {product.tags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <DiscountRate variant="h4">30%</DiscountRate>
          <Price variant="h3">{product.discount_price}원</Price>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default ProductItem;
