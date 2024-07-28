import { useAppSelector } from 'store';

export const useTheme = (): 'dark' | 'light' => {
  const { theme } = useAppSelector((state) => state.persist);

  return theme;
};
