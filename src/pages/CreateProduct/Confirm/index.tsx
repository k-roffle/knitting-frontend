import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { splitText } from 'utils/splitText';

import { currentProductIdAtom, currentProductInputAtom } from '../recoils';

import {
  ProductCard,
  RepresentativeImage,
  InfoMessage,
  Price,
  Tag,
} from './Confirm.css';

const Confirm = (): React.ReactElement => {
  const { name, fullPrice, discountPrice, representativeImageUrl, tags } =
    useRecoilValue(currentProductInputAtom);
  const currentProductId = useRecoilValue(currentProductIdAtom);

  const getRate = (): string => {
    const rate = Math.round((discountPrice / fullPrice) * 100);

    return isNaN(rate) ? '' : rate.toString();
  };

  const getPrice = (): string => {
    const price = fullPrice - discountPrice;

    return isNaN(price) && Math.sign(price) ? '' : price.toLocaleString();
  };

  return (
    <>
      <Grid container>
        <ProductCard to={`/product/${currentProductId}`}>
          {representativeImageUrl && (
            <RepresentativeImage
              src="//via.placeholder.com/500x300"
              alt="상품 대표 이미지"
            />
          )}
          <Box px={4} py={2}>
            <Typography variant="h4">{name}</Typography>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <div>
                {splitText(tags, '#').map((tag: string) => (
                  <Tag>#{tag}</Tag>
                ))}
              </div>
              <Box display="flex">
                <Typography color="primary">
                  <b>{getRate()}%</b>
                </Typography>
                <Price variant="h4">{getPrice()}원</Price>
              </Box>
            </Box>
          </Box>
        </ProductCard>
      </Grid>
      <ul>
        <InfoMessage>
          상품은 위와 같이 다른 니터들에게 노출될 예정이에요!
        </InfoMessage>
        <InfoMessage>클릭하면 상세도 확인해볼 수 있어요!</InfoMessage>
        <InfoMessage>
          노출되는 기간은 "
          <Typography display="inline" color="primary">
            상품이 등록된 이후부터 계속해서
          </Typography>
          " 노출됩니다.
        </InfoMessage>
      </ul>
    </>
  );
};

export default Confirm;
