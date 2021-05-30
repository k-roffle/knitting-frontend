import { Button as MaterialButton } from '@material-ui/core';
import Background from 'assets/designs/background_login.png';
import React from 'react';
import styled from 'styled-components';
import { defaultShadow, flexCenterAlign } from 'styles/styleConstants';
import { theme } from 'themes';

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
  height: 50%;
  margin: ${theme.spacing(4)};
  box-shadow: ${defaultShadow};
  border-radius: ${theme.spacing(1)};
`;

const LoginButton = styled(MaterialButton)`
  width: 100%;
  max-width: 800px;
  height: 50px;
  margin: ${theme.spacing(4)};
  text-transform: none;
`;

const Login = (): React.ReactElement => {
  return (
    <MainWrapper>
      <LoginContainer>
        <LoginButton color="primary" variant="contained">
          Google 계정으로 계속하기
        </LoginButton>
      </LoginContainer>
    </MainWrapper>
  );
};

export default Login;
