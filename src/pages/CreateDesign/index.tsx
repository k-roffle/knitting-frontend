import { Button, StylesProvider, ThemeProvider } from '@material-ui/core';
import Layout from 'dumbs/Layout';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { customTheme } from 'styles/theme';

import Detail from './Detail';
import Pattern from './Pattern';
import Review from './Review';

const CreateDesign = (): React.ReactElement => {
  return (
    <StylesProvider injectFirst>
      <RecoilRoot>
        <Layout>
          <ThemeProvider theme={customTheme}>
            <Detail />
            <Pattern />
            <Review />
            <Button>다음</Button>
          </ThemeProvider>
        </Layout>
      </RecoilRoot>
    </StylesProvider>
  );
};

export default CreateDesign;
