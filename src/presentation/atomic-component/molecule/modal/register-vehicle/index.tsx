import { Button, Modal } from 'presentation/atomic-component/atom';
import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { useModal, useRouter } from 'data/hooks';
import type { FC } from 'react';

export const RegisterVehicleModal: FC = () => {
  const modal = useModal();

  const { navigate } = useRouter();

  return (
    <Modal
      {...modal}
      button={{
        leftIcon: 'add',
        size: 'small',
        text: 'Novo'
      }}
      size={'medium'}
    >
      <View className={'items-center p-2'} {...gap(12)}>
        <TouchableOpacity activeOpacity={1} className={'bg-gray-300 rounded-md p-3 w-min'}>
          <FontAwesome color={colors.primary} name={'bluetooth'} size={24} />
        </TouchableOpacity>

        <View>
          <Text className={'text-primary font-semibold text-center'}>
            Conecte-se ao dispositivo OBD para registrar o veículo
          </Text>
        </View>

        <Button onPress={(): void => navigate(paths.bluetooth)} size={'small'} text={'Conectar'} />
      </View>
    </Modal>
  );
};
