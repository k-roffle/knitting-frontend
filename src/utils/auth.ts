import decodeJwtToken from 'jwt-decode';
import { request } from 'utils/requests';

interface TokenPayload {
  id: string;
  exp: number;
}

const REFRESH_DELTA = 60 * 60;

const refreshAccessToken = async (token: string): Promise<void> => {
  request('/auth/refresh', 'post', null, null, token)
    .then(({ status, data }) => {
      if (status === 200) {
        setAccessToken(data.token);
      }
    })
    .catch(() => deleteAccessToken());
};

const getAccessToken = (): string | undefined => {
  const now = new Date().getTime() / 1000;
  const token = window.localStorage.getItem('token');

  if (token == null) {
    return undefined;
  }
  const tokenPayload: TokenPayload = decodeJwtToken(token);

  if (now > tokenPayload.exp) {
    deleteAccessToken();
    return undefined;
  }

  if (tokenPayload.exp - now < REFRESH_DELTA) {
    refreshAccessToken(token);
  }

  return token;
};

export const setAccessToken = (token: string): void => {
  window.localStorage.setItem('token', token);
};

const deleteAccessToken = (): void => {
  window.localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() !== undefined;
};
