import { object, ref, string } from 'yup';
import type { InferType } from 'yup';

export const registerSchema = object().shape({
  confirmPassword: string()
    .required('O campo confirmação de senha obrigatório')
    .oneOf([ref('password')], 'Senhas não se coincidem'),
  email: string().email('E-mail inválido').required('O campo e-mail é obrigatório'),
  firstName: string().required('O campo primeiro nome é obrigatório'),
  lastName: string().required('O campo segundo nome é obrigatório'),
  password: string().required('O campo senha é obrigatório')
});

export type RegisterRequest = InferType<typeof registerSchema>;
