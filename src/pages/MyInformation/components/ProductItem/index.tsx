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

const ProductItem: React.FC = () => (
  <Box sx={{ display: 'flex', paddingTop: '32px', paddingBottom: '30px' }}>
    <ProductRepresentImage
      src="//via.placeholder.com/270x200"
      alt="상품 대표이미지"
    />
    <Box sx={{ width: '100%', marginLeft: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '25px' }}>
            토니 캔디 라운드넥 Kit
          </Typography>
          <Period variant="body2" sx={{ marginTop: '6px' }}>
            판매기간 2022.01.01 ~ 2022.12.31
          </Period>
          <Period variant="body2">수정시간 2021.01.02 00:00</Period>
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
          <Tag>#라운드</Tag>
          <Tag>#크롭기장</Tag>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <DiscountRate variant="h4">30%</DiscountRate>
          <Price variant="h3">7,000원</Price>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default ProductItem;
