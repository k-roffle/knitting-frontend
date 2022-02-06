import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { flexVerticalAlign } from 'knitting/styles/constants';
import { theme } from 'knitting/themes';
import { palette } from 'knitting/themes/palette';

export const MyProfileContainer = styled.section`
  display: inline-block;
  width: 100%;
  margin-bottom: ${theme.spacing(6)};
`;

export const ProfileContainer = styled.div`
  ${flexVerticalAlign};

  display: flex;
  float: left;
  margin-right: ${theme.spacing(3)};
`;

export const EmptyProfile = styled.span`
  display: inline-block;
  min-width: ${theme.spacing(10)};
  min-height: ${theme.spacing(10)};
  border-radius: ${theme.spacing(5)};
  margin-right: ${theme.spacing(3)};
  background-color: ${palette.grey[300]};
`;

export const Profile = styled.img`
  display: inline-block;
  min-width: ${theme.spacing(10)};
  min-height: ${theme.spacing(10)};
  border-radius: ${theme.spacing(5)};
  margin-right: ${theme.spacing(3)};
`;

export const Name = styled(Typography)`
  display: inline-block;
  margin-right: ${theme.spacing(1)};
`;

export const Email = styled.span`
  color: ${palette.text.secondary};
`;

export const MySalesSummary = styled.div`
  display: flex;
  margin-top: ${theme.spacing(1.5)};

  > div:first-child {
    margin-right: ${theme.spacing(3)};
  }
`;

export const SalesSummaryCount = styled(Typography)`
  text-align: center;
`;

export const CreateButton = styled(Button)`
  float: right;
  margin-top: ${theme.spacing((10 - 4.5) / 2)};
`;
