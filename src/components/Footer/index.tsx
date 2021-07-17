import React from 'react';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';

const Divider = styled.div`
  margin-top: ${theme.spacing(-2)};
  height: 1px;
  background-color: ${palette.grey[300]};
`;

const FooterContent = styled.ul`
  max-width: 1100px;
  padding: ${theme.spacing(4)};
  margin: auto;
  font-size: 0.85rem;
  color: ${palette.grey[500]};
  list-style: none;
`;

const Logo = styled.li`
  text-align: right;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.9px;
  color: ${palette.grey[600]};
`;

const Info = styled.li`
  color: ${palette.grey[500]};
  margin-bottom: ${theme.spacing(0.5)};

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Terms = styled.li`
  margin: ${theme.spacing(2, 0)};

  span:first-child {
    margin-right: ${theme.spacing(2)};
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
        <Logo>🧶knitting</Logo>
      </FooterContent>
    </footer>
  );
};

export default Footer;
