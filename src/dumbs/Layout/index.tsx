import styled from '@emotion/styled';
import { Header, Footer } from 'knitting/components';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Content = styled.section`
  max-width: 1100px;
  display: flex;
  margin: ${({ theme }) => theme.spacing(8, 'auto', 'auto')};

  > div {
    margin: ${({ theme }) => theme.spacing(4, 2)};
    width: 100%;
  }
`;

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <>
      <Header />
      <Content>
        <div>{children}</div>
      </Content>
      <Footer />
    </>
  );
};

export default Layout;
