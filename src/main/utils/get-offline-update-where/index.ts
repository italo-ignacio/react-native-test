import type { Ids } from 'domain/enums';
import type { EntityMap, WhereProps } from 'domain/models';

export const getOfflineUpdateWhere = (ids: Ids): WhereProps<keyof EntityMap> => {
  const where: WhereProps<keyof EntityMap> = {};

  console.log(ids);

  return where;
};
