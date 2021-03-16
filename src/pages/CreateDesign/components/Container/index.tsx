import { Detail } from 'pages';
import Pattern from 'pages/CreateDesign/Pattern';
import Review from 'pages/CreateDesign/Review';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilValue } from 'recoil';

import Footer from '../Footer';
import Header from '../Header';

const Container = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const renderContent = (): React.ReactElement => {
    switch (currentStep) {
      case PAGE.DETAIL:
        return <Detail />;
      case PAGE.PATTERN:
        return <Pattern />;
      case PAGE.REVIEW:
        return <Review />;
      default:
        return <Detail />;
    }
  };

  return (
    <div>
      <Header />
      {renderContent()}
      <Footer />
    </div>
  );
};

export default Container;
