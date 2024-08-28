import { object, string } from 'yup';
import type { InferType } from 'yup';

export const editUserSchema = object().shape({
  email: string().email('E-mail inválido').required('O campo e-mail é obrigatório'),
  fullName: string()
    .required('O campo nome completo é obrigatório')
    .test('has-two-names', 'O nome completo deve conter pelo menos dois nomes', (value) => {
      if (!value) return false;
      return value.trim().split(' ').length >= 2;
    }),
  password: string()
});

export type EditUserRequest = InferType<typeof editUserSchema>;
