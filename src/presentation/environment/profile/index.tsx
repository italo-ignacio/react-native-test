import { Button } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { ProfileForm } from 'presentation/atomic-component/molecule/form';
import { Text, TouchableOpacity, View } from 'react-native';
import { UserInformation } from 'presentation/atomic-component/molecule';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { logout } from 'store/persist/slice';
import { useDispatch } from 'react-redux';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const [isForm, setIsForm] = useState(false);

  return (
    <PrivateContainer headerTitle={'Meu Perfil'}>
      <View {...gap(16)}>
        <View className={'flex flex-row items-center justify-between'}>
          <Text className={'text-primary text-lg font-semibold'}>Informações</Text>

          <Button
            leftIcon={isForm ? 'cancel' : 'edit'}
            onPress={(): void => {
              setIsForm(!isForm);
            }}
            size={'small'}
            text={isForm ? ' Cancelar' : ' Editar'}
          />
        </View>

        {isForm ? <ProfileForm /> : <UserInformation />}

        {!isForm && (
          <View {...gap(12)}>
            <Text className={'text-primary text-lg font-semibold'}>Ações</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              className={
                'flex flex-row items-center bg-white border border-gray-350 p-4 py-3 rounded-md'
              }
              onPress={(): void => {
                dispatch(logout());
              }}
              {...gap(12)}
            >
              <MaterialIcons color={colors.primary} name={'logout'} size={20} />
              <Text className={'text-primary text-base'}>Sair</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </PrivateContainer>
  );
};
