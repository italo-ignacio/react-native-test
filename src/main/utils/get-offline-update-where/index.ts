import type { Ids } from 'domain/enums';
import type { SelectEntityMap, WhereProps } from 'domain/models';

export const getOfflineUpdateWhere = (ids: Ids): WhereProps<keyof SelectEntityMap> => {
  const where: WhereProps<keyof SelectEntityMap> = {};

  console.log(ids);

  return where;
};
