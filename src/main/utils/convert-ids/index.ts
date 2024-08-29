export const convertIds = (item: {
  id: number;
  apiId?: number;
}): {
  id?: number;
  apiId?: number;
} => ({
  apiId: item.apiId ?? item.id,
  id: item.apiId ? item.id : undefined
});
