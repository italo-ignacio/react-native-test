import { object, string } from 'yup';
import type { InferType } from 'yup';

export const loginSchema = object().shape({
  email: string().email('E-mail inválido').required('O campo e-mail é obrigatório'),
  password: string().required('O campo senha é obrigatório')
});

export type LoginRequest = InferType<typeof loginSchema>;
