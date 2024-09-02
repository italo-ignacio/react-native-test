/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { useRef, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { infiniteScrollProps } from 'data/hooks';

interface FetchOnScrollProps {
  query: infiniteScrollProps;
  data: any;
  renderItem: ({ item }: { item: any }) => ReactElement;
  keyExtractor: (item: any, index: number) => string;
}

export const FetchOnScroll: FC<FetchOnScrollProps> = ({
  query: { isFetchingNextPage, hasNextPage, isFetching, fetchNextPage },
  data,
  renderItem,
  keyExtractor
}) => {
  const buttonRef = useRef(null);
  const [isScrollFetching, setIsScrollFetching] = useState(false);

  const handleEndReached = (): void => {
    if (fetchNextPage && hasNextPage && !isScrollFetching && !isFetching && !isFetchingNextPage) {
      setIsScrollFetching(true);
      fetchNextPage();
      setTimeout(() => {
        setIsScrollFetching(false);
      }, 500);
    }
  };

  return (
    <FlatList
      ItemSeparatorComponent={(): ReactElement => <View className={'bg-gray-250 h-0.5'} />}
      ListFooterComponent={
        hasNextPage ? (
          <TouchableOpacity
            onPress={(): void => {
              if (fetchNextPage && hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            ref={buttonRef}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 50,
              flex: 1,
              margin: 10,
              padding: 10
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              {isFetchingNextPage || isFetching ? 'Buscando' : 'Buscar mais'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className={'bg-gray-250'} />
        )
      }
      data={data}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps={'always'}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      renderItem={renderItem}
      renderScrollComponent={(props): ReactElement => {
        return <ScrollView {...props} />;
      }}
    />
  );
};
