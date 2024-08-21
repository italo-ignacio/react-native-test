import { hasRelation } from '../has-relation';

export const formatResult = (result: unknown, select?: object): unknown => {
  const relations = hasRelation(select);

  if (relations) {
    const value = result as { name: string };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newValue: any = {};

    Object.keys(value).forEach((item) => {
      relations.forEach((relation) => {
        if (item.startsWith(relation))
          Object.assign(newValue, {
            [relation]: {
              ...newValue[relation],
              [item.replace(relation, '')]: value[item as 'name']
            }
          });
        else
          Object.assign(newValue, {
            [item]: value[item as 'name']
          });
      });
    });

    return newValue;
  }

  return result;
};
