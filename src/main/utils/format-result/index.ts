import { hasRelation } from '../has-relation';

export const formatResult = (result: unknown, select?: object): unknown => {
  const relations = hasRelation(select);

  if (relations) {
    const value = result as Record<string, number | string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newValue: Record<string, any> = {};

    Object.keys(value).forEach((item) => {
      let isChildren = false;

      relations.forEach(({ name, parent }) => {
        if (item.startsWith(name)) {
          isChildren = true;
          const keyWithoutRelation = item.replace(name, '');

          if (parent) {
            if (!newValue[parent]) newValue[parent] = {};

            if (!newValue[parent][name]) newValue[parent][name] = {};

            newValue[parent][name][keyWithoutRelation] = value[item];
          } else {
            if (!newValue[name]) newValue[name] = {};

            newValue[name][keyWithoutRelation] = value[item];
          }
        }
      });

      if (!isChildren) Object.assign(newValue, { ...newValue, [item]: value[item] });
    });

    return newValue;
  }

  return result;
};
