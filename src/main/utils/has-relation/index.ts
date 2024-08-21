export const hasRelation = (select?: object): string[] | false => {
  const list: string[] = [];

  if (select && Object.keys(select).length > 0)
    Object.keys(select).forEach((item) => {
      const newSelect = select as { name: string };
      const value = newSelect[item as 'name'];

      if (typeof value === 'object') list.push(item);
    });

  return list.length > 0 ? list : false;
};
