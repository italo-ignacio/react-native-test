/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const convertDate = (date?: Date | null, dateType?: string): string | undefined =>
  date
    ? format(new Date(date), dateType || 'dd/MM/yyyy', {
        locale: ptBR
      })
    : undefined;
