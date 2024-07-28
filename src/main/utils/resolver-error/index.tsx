import { callToast } from '../call-toast';
import type { ErrorResponse } from 'domain/models';

export const resolverError = (err: unknown, message?: string): void => {
  const error = err as ErrorResponse;

  callToast.error(message ?? error.message?.portuguese ?? 'Erro na requisição');
};
