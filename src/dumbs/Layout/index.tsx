import React from 'react';
import styled from 'styled-components';
import { theme } from 'themes';

interface Props {
  children: React.ReactNode;
}

const Content = styled.section`
  max-width: 1100px;
  height: 100vh;
  display: flex;
  margin: auto;

  > div {
    margin: ${theme.spacing(4)} 0;
    width: 100%;
  }
`;

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <Content>
      <div>{children}</div>
    </Content>
  );
};

export default Layout;
