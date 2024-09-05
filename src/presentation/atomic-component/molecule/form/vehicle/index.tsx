import { BrandSelect } from 'presentation/atomic-component/molecule/select/brand';
import { Button, InputController, Select } from 'presentation/atomic-component/atom';
import { type FC, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ModelByBrandSelect } from 'presentation/atomic-component/molecule/select/model-by-brand';
import { TranslateTypeOfFuel, TypeOfFuelOptions, type Vehicle } from 'domain/models';
import { gap, validate } from 'main/utils';
import { paths } from 'main/config';
import { useBluetooth, useRouter } from 'data/hooks';
import { useVehicle } from 'data/use-case';
import type { SelectValues } from 'presentation/atomic-component/atom';

interface VehicleFormProps {
  vehicle?: Vehicle;
}

export const VehicleForm: FC<VehicleFormProps> = ({ vehicle }) => {
  const {
    formState: { isSubmitting, errors },
    onSubmit,
    setValue,
    control,
    handleSubmit
  } = useVehicle({ vehicle });

  const [selectTypeOfFuel, setSelectTypeOfFuel] = useState<SelectValues | null>(null);
  const [selectVehicleModel, setSelectVehicleModel] = useState<SelectValues | null>(null);
  const [selectVehicleBrand, setSelectVehicleBrand] = useState<SelectValues | null>(null);

  const { connected } = useBluetooth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (vehicle) {
      setValue('serialNumber', vehicle.serialNumber);
      setValue('licensePlate', vehicle.licensePlate);
      setValue('typeOfFuel', vehicle.typeOfFuel);
      setSelectTypeOfFuel({
        label: TranslateTypeOfFuel[vehicle.typeOfFuel],
        value: vehicle.typeOfFuel
      });

      if (vehicle.vehicleModel.vehicleBrand) {
        setValue('vehicleBrandId', vehicle.vehicleModel.vehicleBrand?.id);
        setSelectVehicleBrand({
          label: vehicle.vehicleModel.vehicleBrand.name,
          value: String(vehicle.vehicleModel.vehicleBrand.id)
        });
      }

      if (vehicle.vehicleModel.id) {
        setValue('vehicleModelId', vehicle.vehicleModel.id);
        setSelectVehicleModel({
          label: vehicle.vehicleModel.name,
          value: String(vehicle.vehicleModel.id)
        });
      }
    } else if (connected.vin) setValue('serialNumber', connected.vin);
    else if (connected.vin === null) {
      setValue('serialNumber', 'DJ62J218');
      return;
      navigate(paths.vehicleRoutes, { screen: paths.bluetooth });
    }
  }, [vehicle, connected]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} {...gap(10)}>
      <View {...gap(10)}>
        <BrandSelect
          error={errors.vehicleBrandId?.message}
          onChange={(event): void => {
            if (event?.value) setValue('vehicleBrandId', Number(event?.value), validate);
            setValue('vehicleModelId', null as unknown as number);
            setSelectVehicleModel(null);
          }}
          selectValue={selectVehicleBrand}
          setSelectValue={setSelectVehicleBrand}
        />

        {selectVehicleBrand?.value ? (
          <ModelByBrandSelect
            brandId={Number(selectVehicleBrand.value)}
            error={errors.vehicleModelId?.message}
            onChange={(event): void => {
              if (event?.value) setValue('vehicleModelId', Number(event?.value), validate);
            }}
            selectValue={selectVehicleModel}
            setSelectValue={setSelectVehicleModel}
          />
        ) : null}

        <Select
          error={errors.typeOfFuel?.message}
          hideKeyboard
          id={'typeOfFuelSelect'}
          isRequired
          label={'Tipo de combustível'}
          onChange={(event): void => {
            const value = event as unknown as SelectValues | null;

            setSelectTypeOfFuel(value);
            if (value) setValue('typeOfFuel', value.value, validate);
          }}
          options={TypeOfFuelOptions}
          placeholder={'Selecione a marca do modelo'}
          value={selectTypeOfFuel}
        />

        <InputController
          autoCapitalize={'characters'}
          control={control}
          error={errors.licensePlate?.message}
          isRequired
          label={'Placa'}
          name={'licensePlate'}
          placeholder={'Digite a placa'}
        />

        <InputController
          control={control}
          disabled
          error={errors.serialNumber?.message}
          isRequired
          label={'Código do veículo'}
          name={'serialNumber'}
        />
      </View>

      <Button
        buttonProps={{
          style: {
            marginTop: 12
          }
        }}
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        text={vehicle ? 'Atualizar' : 'Cadastrar'}
      />
    </KeyboardAvoidingView>
  );
};
