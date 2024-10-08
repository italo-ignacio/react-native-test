import { object, ref, string } from 'yup';
import type { InferType } from 'yup';

export const registerSchema = object().shape({
  confirmPassword: string()
    .required('O campo confirmação de senha obrigatório')
    .oneOf([ref('password')], 'Senhas não se coincidem'),
  email: string().email('E-mail inválido').required('O campo e-mail é obrigatório'),
  fullName: string()
    .required('O campo nome completo é obrigatório')
    .test('has-two-names', 'O nome completo deve conter pelo menos dois nomes', (value) => {
      if (!value) return false;
      return value.trim().split(' ').length >= 2;
    }),
  password: string().required('O campo senha é obrigatório')
});

export type RegisterRequest = InferType<typeof registerSchema>;
