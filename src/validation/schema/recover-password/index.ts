import { object, string } from 'yup';
import type { InferType } from 'yup';

export const recoverPasswordSchema = object().shape({
  email: string().required()
});

export type RecoverPasswordRequest = InferType<typeof recoverPasswordSchema>;
