import { TableName } from 'domain/enums';

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

export const databaseSelectColumns = (
  entity: string,
  select?: object,
  isRelation?: boolean
): { selectColumns: string; joinColumns: string } => {
  const selectColumns: string[] = [];
  const joinColumns: string[] = [];

  if (select && Object.keys(select).length > 0) {
    Object.entries(select).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        if (Object.values(value).length > 0) {
          const nestedTableName = TableName[key as keyof typeof TableName];

          const nestedSelect = databaseSelectColumns(nestedTableName, value, true);

          selectColumns.push(
            ...nestedSelect.selectColumns.split(', ').map((col) => {
              const formattedCol = col.replace(`"${nestedTableName}"."`, '');

              return `${col} AS "${key}${formattedCol}`;
            })
          );

          joinColumns.push(`JOIN ${nestedTableName} ON ${nestedTableName}.id = ${entity}.${key}Id`);
        }
      } else if (value) selectColumns.push(`"${entity}"."${key}"`);
    });

    return { joinColumns: joinColumns.join(' '), selectColumns: selectColumns.join(', ') };
  }

  return { joinColumns: '', selectColumns: isRelation ? '' : '*' };
};

export const databaseWhereTransform = (entity: string, where?: object): { whereData: string } => {
  if (where && Object.keys(where).length > 0) {
    const conditions = Object.entries(where).map(([key, condition]) => {
      if (condition) {
        const { operator, value } = condition;

        const formattedValue = typeof value === 'string' ? `'${value}'` : value;

        return `${entity}.${key} ${operator} ${formattedValue}`;
      }
      return '';
    });

    const whereData = conditions.filter(Boolean).join(' AND ');

    return { whereData: `WHERE ${whereData}` };
  }

  return { whereData: '' };
};
