import EmptyContent from 'knitting/dumbs/EmptyContent';
import { useMyProducts } from 'knitting/pages/MyInformation/hooks/useMyProducts';

import { Container } from '@mui/material';
import React from 'react';

import { useRenderEmptyContent } from '../InformationTabs/useRenderEmptyContent';
import ProductItem from '../ProductItem';

const Products = (): React.ReactElement | null => {
  const myProduct = useMyProducts();
  const emptyContent = useRenderEmptyContent();

  return myProduct?.length ? (
    <Container sx={{ paddingTop: '17px' }}>
      {myProduct.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </Container>
  ) : (
    emptyContent && <EmptyContent {...emptyContent} />
  );
};

export default Products;
