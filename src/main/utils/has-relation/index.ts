export const hasRelation = (
  select?: object,
  parent?: string
): { parent: string | null; name: string }[] | false => {
  const list: { parent: string | null; name: string }[] = [];

  if (select && Object.keys(select).length > 0)
    for (const item of Object.keys(select)) {
      const newSelect = select as { name: string };
      const value = newSelect[item as 'name'];

      if (typeof value === 'object') {
        const newList = hasRelation(value, item);

        if (newList) list.push(...newList);

        list.push({ name: item, parent: parent ?? null });
      }
    }

  return list.length > 0 ? list : false;
};
