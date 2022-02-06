import styled from '@emotion/styled';
import { Layout } from 'knitting/dumbs';
import Package from 'knitting/pages/CreateProduct/Package';
import SelectDesigns from 'knitting/pages/CreateProduct/SelectDesigns';
import { theme } from 'knitting/themes';
import React from 'react';
import { useRecoilValue } from 'recoil';

import Confirm from './Confirm';
import Footer from './components/Footer';
import Header from './components/Header';
import { currentStepAtom } from './recoils';
import { PAGE } from './types';

const Container = styled.section`
  margin-top: ${theme.spacing(1)};
`;

const CreateProduct = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const renderContent = (): React.ReactElement => {
    switch (currentStep) {
      case PAGE.DESIGN:
        return <SelectDesigns />;
      case PAGE.PACKAGE:
        return <Package />;
      case PAGE.INTRODUCTION:
        return <div />;
      case PAGE.CONFIRM:
        return <Confirm />;
      default:
        return <div />;
    }
  };

  return (
    <Layout>
      <Header />
      <Container>{renderContent()}</Container>
      <Footer />
    </Layout>
  );
};

export default CreateProduct;
