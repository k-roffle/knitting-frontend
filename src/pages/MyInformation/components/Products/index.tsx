import EmptyContent from 'knitting/dumbs/EmptyContent';

import React from 'react';

import { useRenderEmptyContent } from '../InformationTabs/useRenderEmptyContent';

const Products = (): React.ReactElement => {
  const emptyContent = useRenderEmptyContent();

  return emptyContent ? <EmptyContent {...emptyContent} /> : <></>;
};

export default Products;
