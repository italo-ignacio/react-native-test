import { QueryName } from 'main/config';
import { Select } from 'presentation/atomic-component/atom';
import { listToSelect } from 'main/utils';
import { useFindVehicleModelByBrandQuery } from 'infra/cache';
import { useFocus } from 'data/hooks';
import type { Dispatch, FC, SetStateAction } from 'react';
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

  useFocus(QueryName.vehicleModel);

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
