import { object, string } from 'yup';
import type { InferType } from 'yup';

export const loginSchema = object().shape({
  email: string()
    .email('E-mail inválido')
    .required('O campo e-mail é obrigatório')
    .default('gabriel.tavares@sp.senai.br'),
  password: string().required('O campo senha é obrigatório').default('Senai@127')
});

export type LoginRequest = InferType<typeof loginSchema>;
