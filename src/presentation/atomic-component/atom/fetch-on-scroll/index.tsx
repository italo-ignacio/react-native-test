/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '../button';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { useRef, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { infiniteScrollProps } from 'data/hooks';

interface FetchOnScrollProps {
  query: infiniteScrollProps;
  data: any;
  hideSeparator?: boolean;
  renderItem: ({ item, index }: { item: any; index: number }) => ReactElement;
  keyExtractor: (item: any, index: number) => string;
}

export const FetchOnScroll: FC<FetchOnScrollProps> = ({
  query: { isFetchingNextPage, hasNextPage, isFetching, fetchNextPage, refetch, isError },
  data,
  renderItem,
  hideSeparator,
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
      ItemSeparatorComponent={
        hideSeparator ? null : (): ReactElement => <View className={'bg-gray-250 h-0.5'} />
      }
      ListEmptyComponent={
        isFetching || isFetchingNextPage ? null : (
          <View className={'bg-white border border-gray-350 p-3 rounded-md items-center'}>
            <Text>Nenhum item foi encontrado</Text>
          </View>
        )
      }
      ListFooterComponent={
        hasNextPage && !isError ? (
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
          <View className={hideSeparator ? '' : 'bg-gray-250'} />
        )
      }
      ListHeaderComponent={
        isError ? (
          <View
            {...gap(12)}
            className={'bg-white border border-gray-350 p-3 rounded-md items-center'}
          >
            <Text>Erro ao buscar items</Text>

            <Button
              onPress={(): void => {
                refetch();
              }}
              size={'small'}
              text={'Tentar novamente'}
            />
          </View>
        ) : null
      }
      data={data}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps={'always'}
      maxToRenderPerBatch={15}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      renderItem={renderItem}
      renderScrollComponent={(props): ReactElement => {
        return <ScrollView {...props} />;
      }}
    />
  );
};
