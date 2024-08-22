import { formatResult } from '../format-result';
import { hasRelation } from '../has-relation';

export const formatListResult = (result: unknown[], select?: object): unknown => {
  const relations = hasRelation(select);

  if (relations)
    return result.map((element) => {
      return formatResult(element, select);
    });

  return result;
};
