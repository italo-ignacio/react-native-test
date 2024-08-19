import { object, string } from 'yup';
import type { InferType } from 'yup';

export const registerSchema = object().shape({
  email: string().required(),
  name: string().required(),
  password: string().required()
});

export type RegisterRequest = InferType<typeof registerSchema>;
