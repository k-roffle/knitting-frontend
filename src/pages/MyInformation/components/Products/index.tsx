import EmptyContent from 'knitting/dumbs/EmptyContent';

import { Container } from '@mui/material';
import React from 'react';

import { useRenderEmptyContent } from '../InformationTabs/useRenderEmptyContent';
import ProductItem from '../ProductItem';

const Products = (): React.ReactElement => {
  const emptyContent = useRenderEmptyContent();

  return emptyContent ? (
    <EmptyContent {...emptyContent} />
  ) : (
    <Container sx={{ paddingTop: '17px' }}>
      <ProductItem />
    </Container>
  );
};

export default Products;
