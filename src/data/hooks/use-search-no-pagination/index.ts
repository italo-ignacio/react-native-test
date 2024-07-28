import { useDebounce } from 'data/hooks/use-debounce';
import { useEffect, useState } from 'react';

interface useSearchProps {
  search: string;
}

interface useSearchResponse {
  search: string;
}

const delay = 500;

export const useSearchNoPagination = (props: useSearchProps): { data: useSearchResponse } => {
  const [call, setCall] = useState(true);
  const [data, setData] = useState<useSearchResponse>({
    search: props.search
  });

  useEffect(
    () =>
      setData({
        search: props.search
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [call]
  );

  useDebounce(() => setCall(!call), [props.search], delay);

  return { data };
};
