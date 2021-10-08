import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';

import { currentProductInputAtom } from '../recoils';

const ProductLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const ProductCard = styled.div`
  width: ${theme.spacing(55)};
  border: 5px solid ${theme.palette.grey[200]};
  border-radius: ${theme.spacing(6)};
`;

const RepresentativeImage = styled.img`
  width: ${theme.spacing(55)};
  height: ${theme.spacing(46)};
  border-radius: ${theme.spacing(6)};
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing(4)};
`;

const PriceContainer = styled.div`
  display: flex;
`;

const Tag = styled.div`
  display: inline-block;
  background: ${theme.palette.grey[300]};
  padding: ${theme.spacing(0.6)};
  margin: ${theme.spacing(0.4)};
  border-radius: ${theme.spacing(2)};
`;

const Price = styled(Typography)`
  margin-left: ${theme.spacing(1)};
`;

const InfoMessage = styled.li`
  margin-top: ${theme.spacing(1)};
`;

const Confirm = (): React.ReactElement => {
  const {
    name,
    fullPrice,
    discountPrice,
    representativeImageUrl,
    tags,
  } = useRecoilValue(currentProductInputAtom);

  const splitTags = (): string[] => {
    return tags
      .split('#')
      .map((tag) => tag.trim())
      .filter((value) => value);
  };

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
      <Grid container justifyContent="center">
        <ProductLink to="/product/1">
          <ProductCard>
            {representativeImageUrl && (
              <RepresentativeImage
                src="//via.placeholder.com/500x300"
                alt="상품 대표 이미지"
              />
            )}
            <Box px={4} py={2}>
              <Typography variant="h4">{name}</Typography>
              <ProductDetail>
                <div>
                  {splitTags().map((tag: string) => (
                    <Tag>#{tag}</Tag>
                  ))}
                </div>
                <PriceContainer>
                  <Typography color="primary">
                    <b>{getRate()}%</b>
                  </Typography>
                  <Price variant="h4">{getPrice()}원</Price>
                </PriceContainer>
              </ProductDetail>
            </Box>
          </ProductCard>
        </ProductLink>
      </Grid>
      <ul>
        <InfoMessage>
          상품은 위와 같이 다른 니터들에게 노출될 예정이에요!
        </InfoMessage>
        <InfoMessage>클릭하면 상세도 확인해볼 수 있어요!</InfoMessage>
        <InfoMessage>
          노출되는 기간은 "
          <Typography color="primary">
            상품이 등록된 이후부터 계속해서
          </Typography>
          " 노출됩니다.
        </InfoMessage>
      </ul>
    </>
  );
};

export default Confirm;
