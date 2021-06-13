import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import parse from 'url-parse';

import { getConfig } from './config';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const constructURL = (pathname: string): parse => {
  const url = parse(getConfig('REACT_APP_SERVER_URL'));

  return url.set('pathname', pathname);
};

export async function request(
  pathname: string,
  method: Method,
  data?: unknown,
  params?: unknown,
  accessToken?: string,
): Promise<AxiosResponse> {
  const url = constructURL(pathname);

  console.log(url);
  const payload: AxiosRequestConfig = {
    method,
    url: url.toString(),
    headers: {},
    params,
  };

  if (accessToken != null) {
    payload.headers.Authorization = `Bearer ${accessToken}`;
  }
  switch (method) {
    case 'post':
    case 'put':
      payload.headers['Content-Type'] = 'application/json';
      payload.data = JSON.stringify(data);
      break;
    default:
      break;
  }
  const response = await axios(payload);

  return response;
}
