import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import React from 'react';
import { StylesProvider, ThemeProvider } from '@material-ui/core';

import GlobalStyle from '../src/globalStyles';
import { theme } from '../src/themes';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

export const decorators = [
  (Story) => (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </StylesProvider>
  ),
];
