import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import React from 'react';
import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyle from '../src/globalStyles';
import { theme } from '../src/themes';
import { Global } from '@emotion/react';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <Story />
      </ThemeProvider>
    </StyledEngineProvider>
  ),
];
