import React from 'react';
import { RecoilRoot } from 'recoil';

import Container from './components/Container';

const CreateDesign = (): React.ReactElement => {
  return (
    <RecoilRoot>
      <Container />
    </RecoilRoot>
  );
};

export default CreateDesign;
