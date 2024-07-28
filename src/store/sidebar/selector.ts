import { useAppSelector } from 'store';

export const useSidebar = (): boolean => {
  const { open } = useAppSelector((state) => state.sidebar);

  return open;
};
