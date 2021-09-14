import { FAILED_TO_GET_MY_SALE_SUMMARY } from 'constants/errors';

import { Button, Typography } from '@material-ui/core';
import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { tabItemLengthAtom } from 'pages/MyInformation/recoils';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { flexVerticalAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';

import { useGetMySalesSummary } from '../../hooks/useGetMySalesSummary';

import { useRenderButtonText } from './useRenderButtonText';

const MyProfileContainer = styled.section`
  display: inline-block;
  width: 100%;
  margin-bottom: ${theme.spacing(6)};
`;

const ProfileContainer = styled.div`
  ${flexVerticalAlign};

  display: flex;
  float: left;
  margin-right: ${theme.spacing(3)};
`;

const EmptyProfile = styled.span`
  display: inline-block;
  min-width: ${theme.spacing(10)};
  min-height: ${theme.spacing(10)};
  border-radius: ${theme.spacing(5)};
  margin-right: ${theme.spacing(3)};
  background-color: ${palette.grey[300]};
`;

const Name = styled(Typography)`
  display: inline-block;
  margin-right: ${theme.spacing(1)};
`;

const Email = styled.span`
  color: ${palette.text.secondary};
`;

const MySalesSummary = styled.div`
  display: flex;
  margin-top: ${theme.spacing(1.5)};

  > div:first-child {
    margin-right: ${theme.spacing(3)};
  }
`;

const SalesSummaryCount = styled(Typography)`
  text-align: center;
`;

const CreateButton = styled(Button)`
  float: right;
  margin-top: ${theme.spacing((10 - 4.5) / 2)};
`;

const MyProfile = (): React.ReactElement => {
  const [createButtonText, handleButtonClick] = useRenderButtonText();
  const tabItemLength = useRecoilValue(tabItemLengthAtom);
  const { data, error } = useGetMySalesSummary();

  useCommonSnackbar({
    message: FAILED_TO_GET_MY_SALE_SUMMARY,
    severity: 'error',
    dependencies: [error],
  });

  const isLoading = data == null;
  const {
    number_of_products_on_sales: numberOfProductsOnSales,
    number_of_products_sold: numberOfProductsSold,
  } = data?.payload ?? {
    number_of_products_on_sales: 0,
    number_of_products_sold: 0,
  };
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
                {numberOfProductsOnSales}
              </SalesSummaryCount>
            </div>
            <div>
              <Typography variant="caption">판매 수</Typography>
              <SalesSummaryCount variant="h5">
                {numberOfProductsSold}
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
