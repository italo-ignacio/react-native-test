import { type Dispatch, type FC, type SetStateAction, useCallback } from 'react';
import { QueryName } from 'main/config';
import { Select } from 'presentation/atomic-component/atom';
import { listToSelect } from 'main/utils';
import { queryClient } from 'infra/lib';
import { useAppSelector } from 'store';
import { useFindVehicleModelByBrandQuery } from 'infra/cache';
import { useFocusEffect } from '@react-navigation/native';
import type { SelectValues } from 'presentation/atomic-component/atom';

interface ModelByBrandSelectProps {
  selectValue: SelectValues | null;
  setSelectValue: Dispatch<SetStateAction<SelectValues | null>>;
  brandId: number;
  error?: string;
  onChange?: (value: SelectValues | null) => void;
}

export const ModelByBrandSelect: FC<ModelByBrandSelectProps> = ({
  setSelectValue,
  onChange,
  brandId,
  error,
  selectValue
}) => {
  const data = useFindVehicleModelByBrandQuery({ params: { brandId } });

  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(QueryName.vehicleModel);
    }, [queryClient, hasInternetConnection])
  );

  return (
    <Select
      error={error}
      hideKeyboard
      id={'modelByBrandSelect'}
      isRequired
      label={'Modelo'}
      onChange={(event): void => {
        setSelectValue(event as unknown as SelectValues | null);
        if (onChange) onChange(event as unknown as SelectValues | null);
      }}
      options={listToSelect(data.data ?? [])}
      placeholder={'Selecione o modelo'}
      value={selectValue}
    />
  );
};
