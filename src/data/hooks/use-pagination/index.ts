import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const firstPage = 1;

export const usePagination = (): {
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  setPage: Dispatch<SetStateAction<number>>;
} => {
  const [page, setPage] = useState(firstPage);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  return { handleChangePage, page, setPage };
};
