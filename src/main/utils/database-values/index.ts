import { TableName, TableNameReverse } from 'domain/enums';

interface databaseValuesReturn {
  columns: string;
  placeholders: string;
  queryValues: object[];
}

export const databaseValues = (values: object): databaseValuesReturn => {
  const columns = Object.keys(values).join(', ');
  const placeholders = Object.keys(values)
    .map(() => '?')
    .join(', ');

  const queryValues = Object.values(values);

  return { columns, placeholders, queryValues };
};

const databaseSelectJoinsColumns = (
  primaryEntity: string,
  entity: string,
  select: object
): { selectColumns: string[]; joinColumns: string[] } => {
  const selectColumns: string[] = [];
  const joinColumns: string[] = [];

  Object.entries(select).forEach(([key, value], index) => {
    if (index === 0)
      joinColumns.push(
        `JOIN ${entity} ON ${entity}.id = ${primaryEntity}.${
          TableNameReverse[entity as keyof typeof TableNameReverse]
        }Id`
      );

    if (typeof value === 'object' && value !== null) {
      const nestedTableName = TableName[key as keyof typeof TableName];

      const nestedSelect = databaseSelectJoinsColumns(entity, nestedTableName, value);

      selectColumns.push(...nestedSelect.selectColumns);
      joinColumns.push(...nestedSelect.joinColumns);
    } else if (value)
      selectColumns.push(
        `"${entity}"."${key}" AS ${TableNameReverse[entity as keyof typeof TableNameReverse]}${key}`
      );
  });

  return { joinColumns, selectColumns };
};

export const databaseSelectColumns = (
  entity: string,
  select?: object
): { selectColumns: string; joinColumns: string } => {
  const selectColumns: string[] = [];
  const joinColumns: string[] = [];

  if (select && Object.keys(select).length > 0) {
    Object.entries(select).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        const nestedTableName = TableName[key as keyof typeof TableName];

        const nestedSelect = databaseSelectJoinsColumns(entity, nestedTableName, value);

        selectColumns.push(...nestedSelect.selectColumns);
        joinColumns.push(...nestedSelect.joinColumns);
      } else if (value) selectColumns.push(`"${entity}"."${key}"`);
    });

    return { joinColumns: joinColumns.join(' '), selectColumns: selectColumns.join(', ') };
  }

  return { joinColumns: '', selectColumns: '*' };
};

export const databaseWhereTransform = (entity: string, where?: object): { whereData: string } => {
  if (where && Object.keys(where).length > 0) {
    const conditions = Object.entries(where).map(([key, condition]) => {
      if (condition) {
        const { operator, value } = condition;

        const formattedValue =
          typeof value === 'number'
            ? value
            : `${String(value).startsWith('SELECT') ? `(${value})` : `"${value}"`}`;

        return `${entity}.${key} ${operator} ${formattedValue}`;
      }
      return '';
    });

    const whereData = conditions.filter(Boolean).join(' AND ');

    if (whereData) return { whereData: `WHERE ${whereData}` };
  }

  return { whereData: '' };
};
