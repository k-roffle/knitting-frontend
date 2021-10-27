import { Layout } from 'dumbs';
import Cover from 'pages/CreateDesign/Cover';
import Outline from 'pages/CreateDesign/Outline';
import Pattern from 'pages/CreateDesign/Pattern';
import Review from 'pages/CreateDesign/Review';
import Footer from 'pages/CreateDesign/components/Footer';
import Header from 'pages/CreateDesign/components/Header';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
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
