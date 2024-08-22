import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { registerSchema } from 'validation/schema';
import { useForm } from 'react-hook-form';
import { useMakeLogin } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

export const useRegister = (): formReturn<RegisterRequest> => {
  const formData = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema)
  });

  const { login } = useMakeLogin();

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      await api.post({
        body: data,
        route: apiPaths.user
      });

      login({ email: data.email, password: data.password });
      callToast.success('Cadastrado e logado com sucesso');
    } catch (err) {
      resolverError(err);
    }
  };

  return { ...formData, onSubmit };
};
