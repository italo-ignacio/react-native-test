/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { HttpStatusCode } from 'domain/enums';
import { apiPaths } from 'main/config';
import { removeUndefined } from 'main/utils';
import { store } from 'store';
import type { ApiProps } from 'domain/protocol';

// const baseUrl = 'http://10.107.160.196:8080/api/v1';
const baseUrl = 'http://hybridsmart.app.br/api/v1';

export const fetchApi = async <T>(params: ApiProps): Promise<T> => {
  const { accessToken } = store.getState().persist;

  const body: any = params.isFormData ? params.body : JSON.stringify(params.body);
  const headers = {};

  if (
    (accessToken && params.route !== apiPaths.login && params.route !== apiPaths.register) ||
    params.token
  )
    Object.assign(headers, { Authorization: `Bearer ${params.token ?? accessToken}` });

  if (!params.isFormData)
    Object.assign(headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });

  const id = params.id ? `/${params.id}` : '';

  const queryParams = params.queryParams
    ? `?${new URLSearchParams(removeUndefined(params.queryParams))}`
    : '';

  const response = await fetch(`${baseUrl}${params.route}${id}${queryParams}`, {
    body,
    headers,
    method: params.method
  });

  if (
    response.ok &&
    (response.status === HttpStatusCode.noContent || response.headers.get('Content-Length') === '0')
  )
    return null as T;

  if (response.headers.get('total-pages')) {
    const res = {
      content: await response.json(),
      totalElements: Number(response.headers.get('total-elements')),
      totalPages: Number(response.headers.get('total-pages'))
    };

    return res as T;
  }

  const data = await response?.json();

  if (response.ok) return data;

  throw Object(data);
};
