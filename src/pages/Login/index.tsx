import { Button as MaterialButton, Typography } from '@material-ui/core';
import { ReactComponent as GoogleIcon } from 'assets/icn/google.svg';
import { Snackbar } from 'dumbs';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { flexCenterAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';
import { constructURL } from 'utils/requests';

import { errorSnackbarMessageAtom } from './recoils';

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
  margin: ${theme.spacing(4)};
  overflow: hidden;
  background-color: white;
  border-radius: ${theme.spacing(1)};
  box-shadow: -3px -2px 20px 2px rgb(0 0 0/ 12%);
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${palette.primary.main};
`;

const Logo = styled.div`
  width: 100%;
  height: min-content;
  color: white;
  text-align: center;
`;

const LogoIcon = styled.span`
  background-color: white;
  padding: ${theme.spacing(2.9, 3, 2, 3.2)};
  border-radius: 70px;
  font-size: 50px;
`;

const LoginContent = styled.div`
  width: 100%;
  margin: ${theme.spacing(4)};
`;

const LoginTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: ${palette.text.primary};
`;

const KnitterText = styled.span`
  color: ${palette.primary.main};
`;

const WelcomeTitle = styled(Typography)`
  width: 100%;
  margin: ${theme.spacing(1, 0, 7, 0)};
  text-align: center;
  color: ${palette.text.primary};
  font-weight: 300;
`;

const LoginButton = styled(MaterialButton)`
  width: 100%;
  padding: 0;
  background-color: ${palette.grey[200]};

  &:hover {
    background-color: ${palette.grey[300]};
  }
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  padding: ${theme.spacing(2)};
  margin-right: ${theme.spacing(1)};
`;

const LoginText = styled.span`
  padding-right: ${theme.spacing(2)};
  font-size: 16px;
  color: ${palette.grey[600]};
`;

const Login = (): React.ReactElement => {
  const handleOnClickLogin = async (): Promise<void> => {
    const loginUrl = constructURL('/auth/google/code');

    window.location.href = loginUrl.toString();
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
