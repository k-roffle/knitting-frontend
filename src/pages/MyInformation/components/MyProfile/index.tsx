import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { tabItemLengthAtom } from 'knitting/pages/MyInformation/atom';
import { flexVerticalAlign } from 'knitting/styles/constants';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { useRenderButtonText } from './useRenderButtonText';

const MyProfileContainer = styled.section`
  display: inline-block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const ProfileContainer = styled.div`
  ${flexVerticalAlign};

  display: flex;
  float: left;
  margin-right: ${({ theme }) => theme.spacing(3)};
`;

const EmptyProfile = styled.span`
  display: inline-block;
  ${({ theme }) =>
    css`
      min-width: ${theme.spacing(10)};
      min-height: ${theme.spacing(10)};
      border-radius: ${theme.spacing(5)};
      margin-right: ${theme.spacing(3)};
      background-color: ${theme.palette.grey[300]};
    `}
`;

const Name = styled(Typography)`
  display: inline-block;
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const Email = styled.span`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const MySalesSummary = styled.div`
  display: flex;
  ${({ theme }) =>
    css`
      margin-top: ${theme.spacing(1.5)};

      > div:first-of-type {
        margin-right: ${theme.spacing(3)};
      }
    `}
`;

const SalesSummaryCount = styled(Typography)`
  text-align: center;
`;

const CreateButton = styled(Button)`
  float: right;
  margin-top: ${({ theme }) => theme.spacing((10 - 4.5) / 2)};
`;

const mock = {
  number_of_designs_on_sales: 2,
  number_of_designs_sold: 18,
};

const MyProfile = (): React.ReactElement => {
  const [createButtonText, handleButtonClick] = useRenderButtonText();
  const tabItemLength = useRecoilValue(tabItemLengthAtom);

  const {
    number_of_designs_on_sales: numberOfDesignsOnSales,
    number_of_designs_sold: numberOfDesignsSold,
  } = mock;

  const emptyList = tabItemLength === 0;

  return (
    <MyProfileContainer>
      <ProfileContainer>
        <EmptyProfile />
        <div>
          <div>
            <Name variant="h5">홍길동</Name>
            <Email>red.road@gmail.com</Email>
          </div>
          <MySalesSummary>
            <div>
              <Typography variant="caption">판매중인 상품</Typography>
              <SalesSummaryCount variant="h5">
                {numberOfDesignsOnSales}
              </SalesSummaryCount>
            </div>
            <div>
              <Typography variant="caption">판매 수</Typography>
              <SalesSummaryCount variant="h5">
                {numberOfDesignsSold}
              </SalesSummaryCount>
            </div>
          </MySalesSummary>
        </div>
      </ProfileContainer>
      {createButtonText != null && handleButtonClick != null && !emptyList && (
        <CreateButton
          variant="outlined"
          color="primary"
          onClick={handleButtonClick}
        >
          {createButtonText}
        </CreateButton>
      )}
    </MyProfileContainer>
  );
};

export default MyProfile;
