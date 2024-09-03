/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-depth */
import { hasRelation } from '../has-relation';

export const formatResult = (result: unknown, select?: object): unknown => {
  const relations = hasRelation(select);

  if (relations) {
    const value = result as Record<string, number | string>;
    const newValue: Record<string, any> = {};

    for (const item of Object.keys(value)) {
      let isChildren = false;

      for (const itemValue of relations) {
        const { name, parent } = itemValue as unknown as { parent: string | null; name: string };

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
      }

      if (!isChildren) Object.assign(newValue, { ...newValue, [item]: value[item] });
    }

    return newValue;
  }

  return result;
};
