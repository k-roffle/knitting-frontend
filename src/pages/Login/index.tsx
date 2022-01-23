import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button as MaterialButton, Typography } from '@mui/material';
import { ReactComponent as GoogleIcon } from 'knitting/assets/icn/google.svg';
import { Snackbar } from 'knitting/dumbs';
import { flexCenterAlign } from 'knitting/styles/constants';
import { constructURL } from 'knitting/utils/requests';
import React from 'react';
import { useRecoilState } from 'recoil';

import { errorSnackbarMessageAtom } from './atom';

const LoginWrapper = styled.div`
  ${flexCenterAlign}

  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center center;
`;

const LoginBox = styled.div`
  ${flexCenterAlign}

  width: 100%;
  max-width: 650px;
  height: 100%;
  max-height: 450px;
  overflow: hidden;
  background-color: white;
  box-shadow: -3px -2px 20px 2px rgb(0 0 0/ 12%);
  ${({ theme }) =>
    css`
      margin: ${theme.spacing(4)};
      border-radius: ${theme.spacing(1)};
    `}
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Logo = styled.div`
  width: 100%;
  height: min-content;
  color: white;
  text-align: center;
`;

const LogoIcon = styled.span`
  background-color: white;
  padding: ${({ theme }) => theme.spacing(2.9, 3, 2, 3.2)};
  border-radius: 70px;
  font-size: 50px;
`;

const LoginContent = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(4)};
`;

const LoginTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const KnitterText = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const WelcomeTitle = styled(Typography)`
  width: 100%;
  text-align: center;
  font-weight: 300;
  ${({ theme }) =>
    css`
      margin: ${theme.spacing(1, 0, 7, 0)};
      color: ${theme.palette.text.primary};
    `}
`;

const LoginButton = styled(MaterialButton)`
  width: 100%;
  padding: 0;
  ${({ theme }) =>
    css`
      background-color: ${theme.palette.grey[200]};

      &:hover {
        background-color: ${theme.palette.grey[300]};
      }
    `}
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  ${({ theme }) =>
    css`
      padding: ${theme.spacing(2)};
      margin-right: ${theme.spacing(1)};
    `}
`;

const LoginText = styled.span`
  font-size: 16px;
  ${({ theme }) =>
    css`
      padding-right: ${theme.spacing(2)};
      color: ${theme.palette.grey[600]};
    `}
`;

const Login = (): React.ReactElement => {
  const handleOnClickLogin = async (): Promise<void> => {
    const loginUrl = constructURL('/auth/google/code');

    location.href = loginUrl.toString();
  };

  const [errorSnackbarMessage, setErrorSnackbarMessage] = useRecoilState(
    errorSnackbarMessageAtom,
  );

  const showErrorSnackbar = errorSnackbarMessage !== undefined;

  const handleSnackbarClose = () => {
    setErrorSnackbarMessage(undefined);
  };

  return (
    <>
      <LoginWrapper>
        <LoginBox>
          <LogoWrapper>
            <Logo>
              <LogoIcon>🧶</LogoIcon>
            </Logo>
          </LogoWrapper>
          <LoginContent>
            <LoginTitle>
              안녕,
              <KnitterText> 니터 </KnitterText>
              👋
            </LoginTitle>
            <WelcomeTitle variant="h5">당신을 기다렸어요</WelcomeTitle>
            <LoginButton onClick={handleOnClickLogin}>
              <StyledGoogleIcon />
              <LoginText>구글 로그인 하기</LoginText>
            </LoginButton>
          </LoginContent>
        </LoginBox>
      </LoginWrapper>
      {showErrorSnackbar && errorSnackbarMessage && (
        <Snackbar
          label={errorSnackbarMessage}
          onClose={handleSnackbarClose}
          open={showErrorSnackbar}
          severity="error"
        />
      )}
    </>
  );
};

export default Login;
