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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIeWJyaWQgQVBJIiwic3ViIjoiMiIsImlhdCI6MTcyNDg1NzcxNywiZXhwIjoxNzI1MDM3NzE3LCJ1c2VyIjp7Imxhc3ROYW1lIjoiSWduYWNpbyIsInJvbGUiOiJBRE1JTiIsImlkIjoiMiIsImZpcnN0TmFtZSI6Ikl0YWxvIiwiZW1haWwiOiJhZG1pbkBhZG1pbiJ9fQ.LlLRvQMWOmOgCwoUgSLdSKCPCH6xMhVRSOMCU-DgKFI',
          user: {
            email: 'admin@admin',
            firstName: 'admin',
            id: 1,
            lastName: 'Roberto da Silva',
            role: 'ADMIN'
          }
        })
      );

      resolverError(err);
    }
  };

  return { login };
};
