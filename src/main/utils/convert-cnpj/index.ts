export const convertCNPJ = (text?: string | null): string => {
  if (text) {
    const cnpj = text.replace(/\D/gu, '');

    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
      5,
      8
    )}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  }
  return '';
};
