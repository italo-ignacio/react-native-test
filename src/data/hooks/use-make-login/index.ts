import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { jwtDecode } from 'jwt-decode';
import { resolverError } from 'main/utils';
import { setAuth } from 'store/persist/slice';
import { useDispatch } from 'react-redux';
import type { LoginResponse, UserProps } from 'domain/models';

export const useMakeLogin = (): {
  login: (data: { email: string; password: string }) => Promise<void>;
} => {
  const dispatch = useDispatch();

  const login = async (data: { email: string; password: string }): Promise<void> => {
    try {
      const payload = await api.post<LoginResponse>({
        body: data,
        route: apiPaths.login
      });

      const { user } = jwtDecode(payload.token) as { user: UserProps };

      dispatch(setAuth({ accessToken: payload.token, user }));
    } catch (err) {
      resolverError(err);
    }
  };

  return { login };
};
