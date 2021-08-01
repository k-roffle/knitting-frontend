import { CircularProgress } from '@material-ui/core';
import { errorSnackbarMessageAtom } from 'pages/Login/recoils';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useQueryParam, StringParam } from 'use-query-params';
import { setAccessToken } from 'utils/auth';
import { FAILED_TO_FETCH_ACCESS_TOKEN } from 'utils/errors';
import { request } from 'utils/requests';

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
`;

const LoginRedirected = (): React.ReactElement => {
  const [code] = useQueryParam('code', StringParam);
  const history = useHistory();

  const setErrorSnackbarMessage = useSetRecoilState(errorSnackbarMessageAtom);
  const onLoginSuccess = (accessToken: string) => {
    setAccessToken(accessToken);
    // TODO 메인페이지 개발 후 메인페이지로 이동하도록 수정
    history.replace('/designs/create');
  };

  const onLoginFailed = () => {
    setErrorSnackbarMessage(FAILED_TO_FETCH_ACCESS_TOKEN);
    history.push('/login');
  };

  const requestFetchAccessToken = async () => {
    const response = await request('/auth/google/authorized', 'get', null, {
      code,
    });
    const token = response.data.token;

    if (response.status === 200 && token != null) {
      onLoginSuccess(token);
    } else {
      onLoginFailed();
    }
  };

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        await requestFetchAccessToken();
      } catch (e) {
        onLoginFailed();
      }
    }
    fetchAccessToken();
  });

  return <StyledCircularProgress />;
};

export default LoginRedirected;
