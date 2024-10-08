import { BrandImage, Button, DefaultCard } from 'presentation/atomic-component/atom';
import { DeleteVehicleModal } from 'presentation/atomic-component/molecule/modal';
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { type FC, useState } from 'react';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { ScrollView, Text, View } from 'react-native';
import { TranslateTypeOfFuel, type Vehicle } from 'domain/models';
import { VehicleForm } from 'presentation/atomic-component/molecule/form';
import { colors } from 'presentation/style';
import { convertDate, gap } from 'main/utils';
import { useRoute } from '@react-navigation/native';

export const VehicleEdit: FC = () => {
  const { params } = useRoute();
  const vehicle = params as Vehicle;

  const [isEdit, setIsEdit] = useState(false);

  return (
    <PrivateContainer headerTitle={vehicle.vehicleModel.name}>
      <View className={'flex-row justify-between'}>
        <Text className={'text-primary text-base font-semibold'}>Informações do Veículo</Text>

        <Button
          leftIcon={isEdit ? 'close' : 'edit'}
          onPress={(): void => setIsEdit((old) => !old)}
          size={'small'}
          text={isEdit ? ' Cancelar' : ' Editar'}
        />
      </View>

      {isEdit ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VehicleForm vehicle={vehicle} />
        </ScrollView>
      ) : (
        <>
          <DefaultCard
            items={[
              {
                leftElement: <Entypo color={colors.primary} name={'archive'} size={24} />,
                subtitle: vehicle.licensePlate,
                title: 'Placa'
              },
              {
                leftElement: (
                  <MaterialCommunityIcons color={colors.primary} name={'fuel'} size={24} />
                ),
                subtitle: TranslateTypeOfFuel[vehicle.typeOfFuel],
                title: 'Tipo do Combustível'
              },
              {
                leftElement: (
                  <MaterialCommunityIcons color={colors.primary} name={'car-side'} size={24} />
                ),
                subtitle: vehicle.vehicleModel.name,
                title: 'Modelo'
              },
              {
                leftElement: (
                  <MaterialCommunityIcons color={colors.primary} name={'car-cog'} size={24} />
                ),
                subtitle: (
                  <View className={'flex-row justify-between items-center'}>
                    <Text className={'text-base text-primary font-semibold'}>
                      {vehicle.vehicleModel.vehicleBrand?.name}
                    </Text>

                    <BrandImage
                      imageName={vehicle.vehicleModel.vehicleBrand?.imageName}
                      size={'small'}
                    />
                  </View>
                ),
                title: 'Marca'
              },
              {
                leftElement: (
                  <FontAwesome5 color={colors.primary} name={'calendar-alt'} size={24} />
                ),
                subtitle: convertDate(vehicle.createdAt ?? new Date(), 'PPP'),
                title: 'Adicionado em'
              }
            ]}
          />

          <View {...gap(12)}>
            <Text className={'text-primary text-base font-semibold'}>Ações</Text>
            <DeleteVehicleModal vehicle={vehicle} />
          </View>
        </>
      )}
    </PrivateContainer>
  );
};
