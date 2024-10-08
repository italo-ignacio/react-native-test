/* eslint-disable no-return-await */
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRequest } from '../use-request';
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters
} from 'react-query';
import type { QueryList, QueryName } from 'main/config';

interface useInfiniteScrollProps {
  route: QueryList;
  queryName: QueryName;
  limit: number;
  filters?: object;
  apiRoute?: string;
}

export interface infiniteScrollProps {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<InfiniteData<unknown>, unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  isError: boolean;
}
export const useInfiniteScroll = <T>({
  route,
  queryName,
  apiRoute,
  limit,
  filters
}: useInfiniteScrollProps): infiniteScrollProps & {
  data: T[] | undefined;
} => {
  const { findRequest } = useRequest();
  const [newData, setNewData] = useState<T[]>([]);
  const [isFetchingNextPage2, setIsFetchingNextPage2] = useState(false);
  const filter = filters ?? {};

  const fetchItems = async ({ pageParam = 1 }): Promise<unknown> => {
    return await findRequest({
      apiRoute,
      limit,
      page: pageParam,
      params: { ...filter },
      route
    });
  };

  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage, isFetching, isError } =
    useInfiniteQuery([queryName, ...Object.values(filter)], fetchItems, {
      getNextPageParam(response, pages) {
        const { totalPages } = response as unknown as { totalPages: number };

        if (pages.length < totalPages) return pages.length + 1;

        return undefined;
      }
    });

  useEffect(() => {
    if (isFetchingNextPage) setIsFetchingNextPage2(true);
    else setTimeout(() => setIsFetchingNextPage2(false), 1000);
  }, [isFetchingNextPage]);

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
    isError,
    isFetching,
    isFetchingNextPage: isFetchingNextPage2,
    refetch
  };
};
