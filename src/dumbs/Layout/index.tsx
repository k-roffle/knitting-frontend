import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Content = styled.section`
  max-width: 1100px;
  margin: 36px auto;
`;

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <>
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
