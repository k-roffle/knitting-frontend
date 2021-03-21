import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { theme } from 'themes';

import Container from './components/Container';

const CreateDesign = (): React.ReactElement => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Container />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default CreateDesign;
