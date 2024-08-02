export const convertCode = (text: string): string => {
  return `0000${text}-0000-1000-8000-00805f9b34fb`;
};

export const resolveCode = (text: string): string => {
  const newText = text.split('-');

  return newText[0].slice(-4);
};
