import { loginSchema } from 'validation/schema';
import { useForm } from 'react-hook-form';
import { useMakeLogin } from 'data/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

export const useLogin = (): formReturn<LoginRequest> => {
  const formData = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const { login } = useMakeLogin();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    await login(data);
  };

  return { ...formData, onSubmit };
};
