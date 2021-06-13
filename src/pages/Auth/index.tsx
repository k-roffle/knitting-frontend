import queryString from 'query-string';
import React from 'react';

const Auth = (): React.ReactElement => {
  // 이 페이지는 access token을 저장하기 위해 거쳐가는 페이지.
  // token을 저장하고 다른 페이지로 리다이렉트합니다.
  const { code } = queryString.parse(location.search);

  const accessToken = code?.toString() || '';

  window.localStorage.setItem('access-token', accessToken);

  // TODO: 다른 화면으로 리다이렉트

  return <></>;
};

export default Auth;
