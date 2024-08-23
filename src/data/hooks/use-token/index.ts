import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from 'store';
import type { UserProps } from 'domain/models';

interface tokenProps extends UserProps {
  exp: number;
}

export const useToken = (): { isValid: () => boolean } => {
  const { accessToken } = useAppSelector((state) => state.persist);

  const isValid = (): boolean => {
    if (accessToken === null) return false;

    const decodeToken = jwtDecode(accessToken) as tokenProps;

    try {
      if (decodeToken) return !(Date.now() >= decodeToken.exp * 1000);
      return false;
    } catch {
      return false;
    }
  };

  return { isValid };
};
