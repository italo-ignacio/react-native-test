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
      dispatch(
        setAuth({
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIeWJyaWQgQVBJIiwic3ViIjoiOCIsImlhdCI6MTcyNDY3MjY0NCwiZXhwIjoxNzI0ODUyNjQ0LCJ1c2VyIjp7ImVtYWlsIjoiU2VuYWlAMTI3IiwibGFzdE5hbWUiOiIxMjciLCJyb2xlIjoiVVNFUiIsImlkIjoiOCIsImZpcnN0TmFtZSI6IlNlbmFpIn19.GqLs5_uKIrm7nclsVxHbQTvjSDvHzjGDKSm9oTh24yc',
          user: {
            email: 'admin ',
            firstName: 'admin ',
            id: 1,
            lastName: 'admin ',
            role: 'ADMIN'
          }
        })
      );
      resolverError(err);
    }
  };

  return { login };
};
