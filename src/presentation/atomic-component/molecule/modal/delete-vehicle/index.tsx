import { Button, Modal } from 'presentation/atomic-component/atom';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { callToast, gap, resolverError } from 'main/utils';
import { colors } from 'presentation/style';
import { paths } from 'main/config';
import { useModal, useRequest, useRouter } from 'data/hooks';
import type { FC } from 'react';
import type { Vehicle } from 'domain/models';

interface DeleteVehicleModalProps {
  vehicle: Vehicle;
}

export const DeleteVehicleModal: FC<DeleteVehicleModalProps> = ({ vehicle }) => {
  const { openModal, closeModal, isOpen } = useModal();

  const { navigate } = useRouter();
  const { makeRequest } = useRequest();

  const handleDelete = async (): Promise<void> => {
    try {
      await makeRequest({
        ids: { apiId: vehicle?.apiId, id: vehicle?.id },
        method: 'DELETE',
        route: 'vehicle'
      });
      callToast.success('Excluído com sucesso');
      closeModal();
      navigate(paths.vehicleRoutes, { screen: paths.vehicle });
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        <TouchableOpacity
          activeOpacity={0.7}
          className={
            'flex flex-row items-center bg-white border border-gray-350 p-4 py-3 rounded-md'
          }
          onPress={openModal}
          {...gap(12)}
        >
          <MaterialIcons color={colors.primary} name={'delete'} size={20} />
          <Text className={'text-primary text-base'}>Excluir Veículo</Text>
        </TouchableOpacity>
      }
      size={'medium'}
    >
      <View className={'items-center p-2'} {...gap(12)}>
        <TouchableOpacity activeOpacity={1} className={'bg-gray-300 rounded-md p-3 w-min'}>
          <FontAwesome color={colors.primary} name={'warning'} size={24} />
        </TouchableOpacity>

        <View {...gap(8)}>
          <Text className={'text-primary font-semibold text-center'}>Tem certeza?</Text>

          <Text className={'text-center'}>
            Ao excluir o veículo, todos os dados relacionados a ele serão perdidos.
          </Text>
        </View>

        <View className={'flex flex-row justify-between mt-2'} {...gap(8)}>
          <Button onPress={closeModal} size={'small'} text={'Cancelar'} variant={'outlined'} />

          <Button
            leftIcon={'delete'}
            onPress={handleDelete}
            size={'small'}
            text={' Excluir'}
            variant={'delete'}
          />
        </View>
      </View>
    </Modal>
  );
};
