import styled from '@emotion/styled';
import { Logo } from 'knitting/dumbs';
import React from 'react';

const Divider = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  height: 1px;
  background-color: ${({ theme }) => theme.palette.grey[300]};
`;

const FooterContent = styled.ul`
  max-width: 1100px;
  padding: ${({ theme }) => theme.spacing(4)};
  margin: auto;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.grey[500]};
  list-style: none;
`;

const StyledLogo = styled(Logo)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Info = styled.li`
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Terms = styled.li`
  margin: ${({ theme }) => theme.spacing(2, 0)};

  span:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(2)};
  }

  span {
    word-break: keep-all;
  }
`;

const Footer = (): React.ReactElement => {
  return (
    <footer>
      <Divider />
      <FooterContent>
        <Info>© 2021 knitting, Inc. All rights reserved.</Info>
        <Info>
          고객센터 |
          <a href="mailto:yurilee9696@gmail.com"> yurilee9696@gmail.com</a>
        </Info>
        <Terms>
          <span>이용약관</span>
          <span>개인정보 처리방침</span>
        </Terms>
        <StyledLogo size="small" align="right" />
      </FooterContent>
    </footer>
  );
};

export default Footer;
