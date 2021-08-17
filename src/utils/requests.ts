import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import parse from 'url-parse';

import { getConfig } from './config';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
interface RequestProps {
  pathname: string;
  method: Method;
  data?: unknown;
  params?: unknown;
  accessToken?: string;
}

export const constructURL = (pathname: string): parse => {
  const url = parse(getConfig('REACT_APP_SERVER_URL'));

  return url.set('pathname', pathname);
};

export async function request({
  pathname,
  method,
  data,
  params,
  accessToken,
}: RequestProps): Promise<AxiosResponse> {
  const url = constructURL(pathname).toString();
  const payload: AxiosRequestConfig = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    data: JSON.stringify(data),
  };

  if (accessToken != null) {
    payload.headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await axios(payload);

  return response;
}
