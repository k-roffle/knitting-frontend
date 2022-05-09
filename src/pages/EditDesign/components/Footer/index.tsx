import CloseIcon from '@mui/icons-material/Close';
import {
  Button as MaterialButton,
  Box,
  Collapse,
  IconButton,
} from '@mui/material';
import React, { ReactElement, ReactNode, useState } from 'react';

import {
  FooterContainer,
  NextContainer,
  DownloadAlert,
  DownloadButton,
} from './Footer.css';

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
  const [open, setOpen] = useState<boolean>(
    localStorage.getItem('popup')
      ? localStorage.getItem('popup') === 'true'
      : true,
  );

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('popup', JSON.stringify(false));
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  const handleDownload = (type: 'sample' | 'guide') => {};

  return (
    <>
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
      <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <DownloadAlert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            샘플도안과 가이드를 통해 어떻게 도안이 만들어지는지 확인할 수
            있어요! 🧚‍
            <DownloadButton
              label="샘플 도안 다운"
              variant="outlined"
              onClick={() => handleDownload('sample')}
            />
            <DownloadButton
              label="작성 가이드 다운"
              variant="outlined"
              onClick={() => handleDownload('guide')}
            />
          </DownloadAlert>
        </Collapse>
      </Box>
    </>
  );
};

export default Footer;
