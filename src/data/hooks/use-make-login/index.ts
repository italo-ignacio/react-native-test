/* eslint-disable no-extra-parens */
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { jwtDecode } from 'jwt-decode';
import { setAuth } from 'store/persist/slice';
import { store } from 'store';
import { useDatabase } from '../use-database';
import { useDispatch } from 'react-redux';
import { useRequest } from '../use-request';
import type { LoginResponse, UserProps } from 'domain/models';

export const useMakeLogin = (): {
  login: (data: { email: string; password: string }) => Promise<void>;
} => {
  const dispatch = useDispatch();

  const database = useDatabase();
  const { findRequest } = useRequest();

  const login = async (data: { email: string; password: string }): Promise<void> => {
    try {
      const { hasInternetConnection } = store.getState().netInfo;

      if (!hasInternetConnection) {
        callToast.error('Sem conexão com a internet');
        return;
      }

      const payload = await api.post<LoginResponse>({
        body: data,
        route: apiPaths.login
      });

      const { user } = jwtDecode(payload.token) as { user: UserProps };

      const brands = await database.totalElements('vehicle_brands');
      const models = await database.totalElements('vehicle_models');

      if (brands === 0)
        await findRequest({ limit: 5000, page: 1, route: 'vehicleBrand', token: payload.token });

      if (models === 0)
        await findRequest({ limit: 5000, page: 1, route: 'vehicleModel', token: payload.token });

      dispatch(setAuth({ accessToken: payload.token, user }));
    } catch (err) {
      resolverError(err);
    }
  };

  return { login };
};
