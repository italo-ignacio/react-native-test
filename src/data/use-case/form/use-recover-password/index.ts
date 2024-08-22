import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { loginSchema } from 'validation/schema';
import { resolverError } from 'main/utils';
import { setAuth } from 'store/persist/slice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginRequest } from 'validation/schema';
import type { LoginResponse } from 'domain/models';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

export const useRecoverPassword = (): formReturn<LoginRequest> => {
  const formData = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const payload = await api.post<LoginResponse>({
        body: data,
        route: apiPaths.login
      });

      dispatch(setAuth({ accessToken: payload.accessToken, user: payload.user }));
    } catch (err) {
      resolverError(err);
    }
  };

  return { ...formData, onSubmit };
};
