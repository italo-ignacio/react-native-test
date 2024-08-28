import { useDebounce } from 'data/hooks/use-debounce';
import { useEffect, useState } from 'react';
import { usePagination } from 'data/hooks/use-pagination';

interface useSearchProps {
  search: string;
}

export interface useSearchReturn {
  page: number;
  searchDebounce: string;
  handleChangePage: (event: unknown, newPage: number) => void;
}

const firstPage = 1;
const delay = 500;

export const useSearch = (props: useSearchProps): useSearchReturn => {
  const { page, setPage, handleChangePage } = usePagination();

  const [call, setCall] = useState(true);
  const [data, setData] = useState({
    page,
    searchDebounce: props.search
  });

  useEffect(
    () =>
      setData({
        page,
        searchDebounce: props.search
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [call, page]
  );

  useDebounce(
    () => (page === firstPage ? setCall(!call) : setPage(firstPage)),
    [props.search],
    delay
  );

  return { ...data, handleChangePage };
};
