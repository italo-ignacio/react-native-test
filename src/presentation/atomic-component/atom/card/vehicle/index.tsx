import { BrandImage } from 'presentation/atomic-component/atom/brand-image';
import { Button } from 'presentation/atomic-component/atom/button';
import { Text, View } from 'react-native';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { useRouter } from 'data/hooks';
import type { FC } from 'react';
import type { Vehicle } from 'domain/models';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFirst?: boolean;
}

export const VehicleCard: FC<VehicleCardProps> = ({ vehicle, isFirst }) => {
  const { navigate } = useRouter();

  return (
    <View
      className={`flex flex-row justify-between items-start rounded-md py-4 px-3 w-full bg-white border border-gray-300 ${
        isFirst ? '' : 'mt-2'
      }`}
    >
      <View {...gap(16)}>
        <Text className={'text-primary font-semibold text-base'}>
          {vehicle.vehicleModel.name} / {vehicle.vehicleModel.vehicleBrand?.name}
        </Text>

        <View className={'flex flex-row'}>
          <Text>Placa: </Text>
          <Text className={'text-primary font-semibold'}>{vehicle.licensePlate}</Text>
        </View>

        <View className={'flex flex-row'} {...gap(8)}>
          <Button
            onPress={(): void => console.log('aaa')}
            rightIcon={'history'}
            size={'small'}
            text={'Histórico '}
            variant={'secondary'}
          />

          <Button
            onPress={(): void =>
              navigate(paths.vehicleRoutes, { params: vehicle, screen: paths.vehicleEdit })
            }
            rightIcon={'navigate-next'}
            size={'small'}
            text={'Ver Mais '}
          />
        </View>
      </View>

      <BrandImage imageName={vehicle.vehicleModel.vehicleBrand?.imageName} size={'small'} />
    </View>
  );
};
