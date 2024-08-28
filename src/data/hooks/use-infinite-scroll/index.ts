/* eslint-disable no-return-await */
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useMakeRequest } from '../use-make-request';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import type { QueryList, QueryName } from 'main/config';

interface useInfiniteScrollProps {
  route: QueryList;
  queryName: QueryName;
  limit: number;
  filters?: object;
}

export const useInfiniteScroll = <T>({
  route,
  queryName,
  limit,
  filters
}: useInfiniteScrollProps): {
  data: T[] | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
} => {
  const { makeRequest } = useMakeRequest();
  const [newData, setNewData] = useState<T[]>([]);
  const filter = filters ?? {};

  const fetchItems = async ({ pageParam = 1 }): Promise<unknown> => {
    return await makeRequest({
      limit,
      page: pageParam,
      params: { ...filter },
      route
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
    [queryName, ...Object.values(filter)],
    fetchItems,
    {
      getNextPageParam(response, pages) {
        const { totalPages } = response as unknown as { totalPages: number };

        if (pages.length < totalPages) return pages.length + 1;

        return undefined;
      }
    }
  );

  useEffect(() => {
    const items: T[] = [];

    data?.pages?.forEach((pages) => {
      const page = pages as unknown as {
        content: T[];
      };

      page?.content?.forEach((item) => {
        items.push(item);
      });
    });

    setNewData(items);
  }, [data]);

  return {
    data: newData,
    fetchNextPage,
    hasNextPage: hasNextPage === undefined ? true : hasNextPage,
    isFetching,
    isFetchingNextPage
  };
};
