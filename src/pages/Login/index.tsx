import { Button as MaterialButton } from '@material-ui/core';
import Background from 'assets/designs/background_login.png';
import React from 'react';
import styled from 'styled-components';
import { flexCenterAlign } from 'styles/styleConstants';
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
  width: 45%;
  height: 50%;
  box-shadow: ${theme.shadows[8]};
  border-radius: ${theme.spacing(4)};
`;

const LoginButton = styled(MaterialButton)`
  width: 80%;
  height: 10%;
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
