import { Layout } from 'knitting/dumbs';
import Cover from 'knitting/pages/CreateDesign/Cover';
import Outline from 'knitting/pages/CreateDesign/Outline';
import Pattern from 'knitting/pages/CreateDesign/Pattern';
import Review from 'knitting/pages/CreateDesign/Review';
import { currentStepAtom } from 'knitting/pages/CreateDesign/atom';
import Footer from 'knitting/pages/CreateDesign/components/Footer';
import Header from 'knitting/pages/CreateDesign/components/Header';
import { PAGE } from 'knitting/pages/CreateDesign/types';

import React from 'react';
import { useRecoilValue } from 'recoil';

const CreateDesign = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const renderContent = (): React.ReactElement => {
    switch (currentStep) {
      case PAGE.COVER:
        return <Cover />;
      case PAGE.OUTLINE:
        return <Outline />;
      case PAGE.PATTERN:
        return <Pattern />;
      case PAGE.REVIEW:
        return <Review />;
      default:
        return <Cover />;
    }
  };

  return (
    <Layout>
      <Header />
      {renderContent()}
      <Footer />
    </Layout>
  );
};

export default CreateDesign;
