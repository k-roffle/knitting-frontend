import decodeJwtToken from 'jwt-decode';
import { requestWithToken } from 'utils/requests';

export interface TokenPayload {
  id: string;
  exp: number;
}

const REFRESH_DELTA = 60 * 60;

const refreshAccessToken = async (token: string): Promise<void> => {
  requestWithToken({
    pathname: '/auth/refresh',
    method: 'post',
    accessToken: token,
  })
    .then(({ status, data }) => {
      const newToken = data.payload.token;

      if (status === 200 && newToken != null) {
        setAccessToken(newToken);
      }
    })
    .catch(() => deleteAccessToken());
};

export const getAccessToken = (): string | undefined => {
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

export const deleteAccessToken = (): void => {
  window.localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() !== undefined;
};
