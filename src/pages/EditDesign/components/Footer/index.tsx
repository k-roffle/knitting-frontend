import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Button as MaterialButton,
  Box,
  Collapse,
  IconButton,
} from '@mui/material';
import React, { ReactElement, ReactNode, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { isLoadingAtom } from '../../atom';

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
  const isLoading = useRecoilValue(isLoadingAtom);
  const [open, setOpen] = useState<boolean>(
    localStorage.getItem('showDesignGuide')
      ? localStorage.getItem('showDesignGuide') === 'true'
      : true,
  );

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('showDesignGuide', JSON.stringify(false));
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
          <LoadingButton
            variant="contained"
            loading={isLoading}
            disabled={invalidMessage != null}
            onClick={onNextClick}
          >
            {nextLabel}
          </LoadingButton>
          {invalidMessage && <span>{invalidMessage}</span>}
        </NextContainer>
      </FooterContainer>
      <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <DownloadAlert
            severity="info"
            action={
              <IconButton aria-label="close" size="small" onClick={handleClose}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              color: 'black',
            }}
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
