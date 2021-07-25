import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { flexVerticalAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';

const MyInfoContainer = styled.section`
  ${flexVerticalAlign};
  display: flex;
  margin-bottom: ${theme.spacing(8)};
`;

const EmptyProfile = styled.span`
  display: inline-block;
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.spacing(4)};
  margin-right: ${theme.spacing(2)};
  background-color: ${palette.grey[300]};
`;

const Name = styled(Typography)`
  display: inline-block;
  margin-right: ${theme.spacing(1)};
`;

const Email = styled.span`
  color: ${palette.text.secondary};
`;

const MyInfo = (): React.ReactElement => {
  return (
    <MyInfoContainer>
      <EmptyProfile />
      <div>
        <Name variant="h5">홍길동</Name>
        <Email>red.road@gmail.com</Email>
      </div>
    </MyInfoContainer>
  );
};

export default MyInfo;
