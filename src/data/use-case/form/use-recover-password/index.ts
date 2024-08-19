import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { loginSchema } from 'validation/schema';
import { resolverError } from 'main/utils';
import { setAuth } from 'store/persist/slice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { LoginRequest } from 'validation/schema';
import type { LoginResponse } from 'domain/models';

export const useRecoverPassword = (): {
  errors: FieldErrors<LoginRequest>;
  register: UseFormRegister<LoginRequest>;
  onSubmit: SubmitHandler<LoginRequest>;
  handleSubmit: UseFormHandleSubmit<LoginRequest>;
  getValues: UseFormGetValues<LoginRequest>;
  setValue: UseFormSetValue<LoginRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const payload = await api.post<LoginResponse>({
        body: data,
        route: apiPaths.auth
      });

      dispatch(setAuth({ accessToken: payload.accessToken, user: payload.user }));
    } catch (err) {
      resolverError(err);
    }
  };

  return {
    errors,
    getValues,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
    setValue
  };
};
