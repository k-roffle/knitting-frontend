import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import parse from 'url-parse';

import { getAccessToken } from './auth';
import { getConfig } from './config';
import { notFoundExpected } from './errors';
import { ListResponse } from './requestType';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface DefaultRequestProps {
  pathname: string;
  method: Method;
  data?: unknown;
  params?: unknown;
}

type RequestProps = DefaultRequestProps & {
  useCurrentToken?: boolean;
};

type RequestWithTokenProps = DefaultRequestProps & {
  accessToken?: string;
};

export const constructURL = (pathname: string): parse => {
  const url = parse(getConfig('REACT_APP_SERVER_URL'));

  return url.set('pathname', pathname);
};

const requestApi = async ({
  pathname,
  method,
  data,
  params,
  accessToken,
  useCurrentToken = false,
}: RequestProps & RequestWithTokenProps): Promise<AxiosResponse> => {
  const url = constructURL(pathname).toString();
  const payload: AxiosRequestConfig = {
    method,
    url,
    headers: {},
    params,
  };

  if (accessToken != null) {
    payload.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (accessToken == null && useCurrentToken) {
    const currentAccessToken = getAccessToken();

    if (currentAccessToken == null) {
      notFoundExpected('access token');
    }

    payload.headers.Authorization = `Bearer ${currentAccessToken}`;
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
};

export const request = (props: RequestProps): Promise<AxiosResponse> => {
  return requestApi(props);
};

export const requestWithToken = (
  props: RequestWithTokenProps,
): Promise<AxiosResponse> => {
  return requestApi(props);
};

export const getData = async <T extends ListResponse<unknown>>(
  pathname: string,
): Promise<T> => {
  const { data } = await request({
    pathname,
    method: 'get',
    useCurrentToken: true,
  });

  return data;
};
