import { object, string } from 'yup';
import type { InferType } from 'yup';

export const recoverPasswordSchema = object().shape({
  email: string().email().required()
});

export type RecoverPasswordRequest = InferType<typeof recoverPasswordSchema>;
