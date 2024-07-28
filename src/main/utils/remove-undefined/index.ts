export const removeUndefined = (query: object): URLSearchParams =>
  Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  ) as URLSearchParams;
