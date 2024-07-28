import { object, string } from 'yup';
import type { InferType } from 'yup';

export const loginSchema = object().shape({
  login: string().required(),
  password: string().required()
});

export type LoginRequest = InferType<typeof loginSchema>;
