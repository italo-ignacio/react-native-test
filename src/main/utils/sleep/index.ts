/* eslint-disable no-promise-executor-return */
export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
