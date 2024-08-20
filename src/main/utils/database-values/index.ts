interface databaseValuesReturn {
  columns: string;
  placeholders: string;
  queryValues: string;
}

export const databaseValues = (values: object): databaseValuesReturn => {
  const columns = Object.keys(values).join(', ');
  const placeholders = Object.keys(values)
    .map(() => '?')
    .join(', ');

  const queryValues = Object.values(values)?.toString().replace('[', '').replace(']', '');

  return { columns, placeholders, queryValues };
};
