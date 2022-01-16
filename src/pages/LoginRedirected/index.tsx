import styled from '@emotion/styled';
import { CircularProgress, Typography } from '@mui/material';
import { FAILED_TO_FETCH_ACCESS_TOKEN } from 'knitting/constants/errors';
import { errorSnackbarMessageAtom } from 'knitting/pages/Login/atom';
import { setAccessToken } from 'knitting/utils/auth';
import { request } from 'knitting/utils/requests';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQueryParam, StringParam } from 'use-query-params';

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
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const LoginRedirected = (): React.ReactElement => {
  const [code] = useQueryParam('code', StringParam);
  const navigate = useNavigate();

  const setErrorSnackbarMessage = useSetRecoilState(errorSnackbarMessageAtom);
  const onLoginSuccess = (accessToken: string) => {
    setAccessToken(accessToken);
    navigate('/');
  };

  const onLoginFailed = () => {
    setErrorSnackbarMessage(FAILED_TO_FETCH_ACCESS_TOKEN);
    navigate('/login');
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
