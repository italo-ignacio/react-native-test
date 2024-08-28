import { type FC, type ReactNode, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface FetchOnScrollProps {
  query: {
    fetchNextPage?: (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    isFetching: boolean;
  };
  children: ReactNode;
}

export const FetchOnScroll: FC<FetchOnScrollProps> = ({
  query: { isFetchingNextPage, hasNextPage, isFetching, fetchNextPage },
  children
}) => {
  const buttonRef = useRef(null);
  const [isScrollFetching, setIsScrollFetching] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    if (!buttonRef.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);

    if (
      distanceFromBottom <= 100 &&
      fetchNextPage &&
      hasNextPage &&
      !isScrollFetching &&
      !isFetching &&
      !isFetchingNextPage
    ) {
      setIsScrollFetching(true);
      fetchNextPage();
      setTimeout(() => {
        setIsScrollFetching(false);
      }, 500);
    }
  };

  return (
    <ScrollView
      className={'divide-y divide-gray-300 h-full'}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {children}

      {hasNextPage ? (
        <TouchableOpacity
          className={'flex m-1 p-2 bg-primary rounded-full'}
          onPress={(): void => {
            if (fetchNextPage && hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          ref={buttonRef}
        >
          <Text className={'text-white text-center'}>
            {isFetchingNextPage || isFetching ? 'Buscando' : 'Buscar mais'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};
