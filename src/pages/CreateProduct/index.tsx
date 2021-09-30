import { Layout } from 'dumbs';
import Package from 'pages/CreateProduct/Package';
import React from 'react';
import { useRecoilValue } from 'recoil';

import Footer from './components/Footer';
import Header from './components/Header';
import { currentStepAtom } from './recoils';
import { PAGE } from './types';

const CreateProduct = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const renderContent = (): React.ReactElement => {
    return <Package />;
    // switch (currentStep) {
    //   case PAGE.DESIGN:
    //     return <div />;
    //   case PAGE.PACKAGE:
    //     return <Package />;
    //   case PAGE.INTRODUCTION:
    //     return <Package />;
    //   case PAGE.CONFIRM:
    //     return <Package />;
    //   default:
    //     return <div />;
    // }
  };

  return (
    <Layout>
      <Header />
      {renderContent()}
      <Footer />
    </Layout>
  );
};

export default CreateProduct;
