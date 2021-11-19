import { FAILED_TO_FETCH_ACCESS_TOKEN } from 'constants/errors';

import { CircularProgress, Typography } from '@material-ui/core';
import { errorSnackbarMessageAtom } from 'pages/Login/atom';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { useQueryParam, StringParam } from 'use-query-params';
import { setAccessToken } from 'utils/auth';
import { request } from 'utils/requests';

const ProgressWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  flex-direction: column;
`;

const StyledCircularProgress = styled(CircularProgress)`
  margin: 0 auto;
`;

const LoadingContent = styled(Typography)`
  margin-top: ${theme.spacing(3)};
`;

const LoginRedirected = (): React.ReactElement => {
  const [code] = useQueryParam('code', StringParam);
  const history = useHistory();

  const setErrorSnackbarMessage = useSetRecoilState(errorSnackbarMessageAtom);
  const onLoginSuccess = (accessToken: string) => {
    setAccessToken(accessToken);
    history.replace('/');
  };

  const onLoginFailed = () => {
    setErrorSnackbarMessage(FAILED_TO_FETCH_ACCESS_TOKEN);
    history.push('/login');
  };

  const requestFetchAccessToken = async () => {
    const response = await request({
      pathname: '/auth/google/authorized',
      method: 'get',
      params: {
        code,
      },
    });
    const token = response.data.payload.token;

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

  return (
    <ProgressWrapper>
      <StyledCircularProgress />
      <LoadingContent variant="h5">회원 정보 가져오는 중 🏎💨 </LoadingContent>
    </ProgressWrapper>
  );
};

export default LoginRedirected;
