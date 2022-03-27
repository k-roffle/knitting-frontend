import { Layout } from 'knitting/dumbs';

import React from 'react';
import { useRecoilValue } from 'recoil';

import Cover from './Cover';
import Outline from './Outline';
import Pattern from './Pattern';
import Review from './Review';
import { currentStepAtom } from './atom';
import Header from './components/Header';
import { PAGE } from './types';

const UpdateDesign = (): React.ReactElement => {
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
      <Header type="UPDATE" />
      {renderContent()}
    </Layout>
  );
};

export default UpdateDesign;
