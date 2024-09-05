import { BrandImage, Select } from 'presentation/atomic-component/atom';
import { QueryName } from 'main/config';
import { Text, TouchableOpacity } from 'react-native';
import { listToSelect } from 'main/utils';
import { queryClient } from 'infra/lib';
import { useAppSelector } from 'store';
import { useCallback, useState } from 'react';
import { useDebounce, useInfiniteScroll } from 'data/hooks';
import { useFocusEffect } from '@react-navigation/native';
import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import type { SelectValues } from 'presentation/atomic-component/atom';
import type { VehicleBrand } from 'domain/models';

interface BrandSelectProps {
  selectValue: SelectValues | null;
  setSelectValue: Dispatch<SetStateAction<SelectValues | null>>;
  error?: string;
  onChange?: (value: SelectValues | null) => void;
}

export const BrandSelect: FC<BrandSelectProps> = ({
  setSelectValue,
  onChange,
  selectValue,
  error
}) => {
  const [search, setSearch] = useState('');
  const [searchDebounce, setSearchDebounce] = useState('');

  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  const { data, ...query } = useInfiniteScroll<VehicleBrand>({
    filters: { search },
    limit: 50,
    queryName: QueryName.vehicleBrand,
    route: 'vehicleBrand'
  });

  useDebounce(
    () => {
      setSearch(searchDebounce);
    },
    [searchDebounce],
    500
  );

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(QueryName.vehicleBrand);
    }, [queryClient, hasInternetConnection])
  );

  return (
    <Select
      error={error}
      hideKeyboard
      id={'brandSelect'}
      isRequired
      label={'Marca'}
      onChange={(event): void => {
        setSelectValue(event as unknown as SelectValues | null);
        if (onChange) onChange(event as unknown as SelectValues | null);
      }}
      onSearch={(text): void => setSearchDebounce(text)}
      options={listToSelect(data ?? [])}
      placeholder={'Selecione a marca do modelo'}
      query={query}
      renderChildren={(item, onPress): ReactElement => {
        const itemValue = item.item as VehicleBrand;

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            className={'flex w-full flex-row items-center justify-between '}
            onPress={onPress}
          >
            <Text className={'text-primary font-semibold'}>{itemValue.name}</Text>
            <BrandImage imageName={itemValue.imageName} size={'small'} />
          </TouchableOpacity>
        );
      }}
      value={selectValue}
    />
  );
};
