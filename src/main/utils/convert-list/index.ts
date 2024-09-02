import type { SelectValues } from 'presentation/atomic-component/atom/select';

export const listToSelect = (
  list: { id: number | string; name?: number | string; fieldName?: string }[],
  field?: string
): SelectValues[] =>
  list.map((item) => ({
    item,
    label: field ? String(item[field as 'fieldName']) : String(item.name),
    value: String(item.id)
  }));
