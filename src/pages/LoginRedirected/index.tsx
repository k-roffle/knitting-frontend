import { CircularProgress } from '@material-ui/core';
import Snackbar from 'dumbs/Snackbar';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import { FAILED_TO_FETCH_ACCESS_TOKEN } from 'utils/errors';
import { request } from 'utils/requests';

const LoginReirected = (): React.ReactElement => {
  const [code] = useQueryParam('code', StringParam);
  const history = useHistory();

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

  useEffect(() => {
    async function fetchAccessToken() {
      const response = await request('/auth/google/authorized', 'get', null, {
        code,
      });

      if (response.status === 200) {
        // TODO 메인페이지 개발 후 메인페이지로 이동하도록 수정
        history.replace('/designs/create');
      }
    }
    try {
      fetchAccessToken();
    } catch (e) {
      setOpenErrorSnackbar(true);
      history.push('/login');
    }
  });

  return (
    <>
      <CircularProgress />
      <Snackbar
        label={FAILED_TO_FETCH_ACCESS_TOKEN}
        onClose={handleSnackbarClose}
        open={openErrorSnackbar}
        severity="error"
      />
    </>
  );
};

export default LoginReirected;
