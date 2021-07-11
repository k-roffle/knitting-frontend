export const setAccessToken = (token: string): void => {
  window.localStorage.setItem('token', token);
};
