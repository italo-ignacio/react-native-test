import { decryptData } from 'main/utils/crypto';
import { jwtDecode } from 'jwt-decode';
import { store } from 'store';
import type { UserProps } from 'domain/models';

interface tokenProps extends UserProps {
  exp: number;
}

export const decodeToken = (): tokenProps | null => {
  const accessToken = decryptData(store.getState().persist.accessToken || '');

  if (accessToken) return jwtDecode(accessToken);
  return null;
};

export const tokenIsExpired = (): boolean => {
  const token = decodeToken();

  try {
    if (token) return !!(Date.now() >= token.exp * 1000);
    return true;
  } catch {
    return true;
  }
};
