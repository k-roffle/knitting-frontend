import { CircularProgress } from '@material-ui/core';
import { errorSnackbarMessageAtom } from 'pages/Login/recoils';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQueryParam, StringParam } from 'use-query-params';
import { FAILED_TO_FETCH_ACCESS_TOKEN } from 'utils/errors';
import { request } from 'utils/requests';

const LoginReirected = (): React.ReactElement => {
  const [code] = useQueryParam('code', StringParam);
  const history = useHistory();

  const setErrorSnackbarMessage = useSetRecoilState(errorSnackbarMessageAtom);

  const requestFetchAccessToken = async () => {
    const response = await request('/auth/google/authorized', 'get', null, {
      code,
    });

    if (response.status === 200) {
      // TODO 메인페이지 개발 후 메인페이지로 이동하도록 수정
      history.replace('/designs/create');
    }
  };

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        await requestFetchAccessToken();
      } catch (e) {
        setErrorSnackbarMessage(FAILED_TO_FETCH_ACCESS_TOKEN);
        history.push('/login');
      }
    }
    fetchAccessToken();
  });

  return <CircularProgress />;
};

export default LoginReirected;
