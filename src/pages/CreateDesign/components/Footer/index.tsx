import {
  FooterContainer,
  NextContainer,
} from 'knitting/pages/CreateDesign/components/Footer/Footer.css';

import { Button as MaterialButton } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

interface FooterProps {
  previousLabel: ReactNode;
  nextLabel: ReactNode;
  invalidMessage?: ReactNode;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const Footer = ({
  previousLabel,
  nextLabel,
  invalidMessage,
  onPreviousClick,
  onNextClick,
}: FooterProps): ReactElement => {
  return (
    <FooterContainer>
      <MaterialButton variant="contained" onClick={onPreviousClick}>
        {previousLabel}
      </MaterialButton>
      <NextContainer>
        <MaterialButton
          variant="contained"
          disabled={invalidMessage != null}
          onClick={onNextClick}
        >
          {nextLabel}
        </MaterialButton>
        {invalidMessage && <span>{invalidMessage}</span>}
      </NextContainer>
    </FooterContainer>
  );
};

export default Footer;
