/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { HttpStatusCode } from 'domain/enums';
import { decryptData, removeUndefined } from 'main/utils';
import { store } from 'store';
import type { ApiProps } from 'domain/protocol';

const baseUrl = 'http://localhost:8080/api/v1';

export const fetchApi = async <T>(params: ApiProps): Promise<T> => {
  const accessToken = decryptData(store.getState().persist.accessToken || '');

  const body: any = params.isFormData ? params.body : JSON.stringify(params.body);
  const headers = {};

  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });

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

  if (response.status === HttpStatusCode.noContent) return null as T;
  const data = await response.json();

  if (response.ok) return data.payload;

  throw Object(data);
};
