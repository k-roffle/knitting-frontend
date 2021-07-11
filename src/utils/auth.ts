export const setAccessToken = (token: string): void => {
  window.localStorage.setItem('token', token);
};

const getAccessToken = (): string | undefined => {
  const token = window.localStorage.getItem('token');

  if (token == null) {
    return undefined;
  }
  return token;
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() !== undefined;
};
