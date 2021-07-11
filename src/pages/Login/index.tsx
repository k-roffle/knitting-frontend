import { Button as MaterialButton } from '@material-ui/core';
import Background from 'assets/designs/background_login.png';
import Snackbar from 'dumbs/Snackbar';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { defaultShadow, flexCenterAlign } from 'styles/constants';
import { theme } from 'themes';
import { constructURL } from 'utils/requests';

import { errorSnackbarMessageAtom } from './recoils';

const MainWrapper = styled.div`
  background-image: url(${Background});
  width: 100%;
  height: 100vh;
  ${flexCenterAlign}
  background-size: cover;
  background-position: center center;
`;

const LoginContainer = styled.div`
  background-color: white;
  ${flexCenterAlign}
  width: 100%;
  max-width: 1000px;
  height: 100%;
  max-height: 600px;
  margin: ${theme.spacing(4)};
  box-shadow: ${defaultShadow};
  border-radius: ${theme.spacing(1)};
`;

const LoginButton = styled(MaterialButton)`
  width: 100%;
  max-width: 800px;
  height: ${theme.spacing(6)};
  margin: ${theme.spacing(4)};
  text-transform: none;
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
      <MainWrapper>
        <LoginContainer>
          <LoginButton
            color="primary"
            variant="contained"
            onClick={handleOnClickLogin}
          >
            Google 계정으로 계속하기
          </LoginButton>
        </LoginContainer>
      </MainWrapper>

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
