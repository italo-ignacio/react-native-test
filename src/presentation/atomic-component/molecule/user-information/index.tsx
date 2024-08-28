import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { useAppSelector } from 'store';
import type { FC } from 'react';

export const UserInformation: FC = () => {
  const { user } = useAppSelector((state) => state.persist);

  if (!user) return null;

  return (
    <View
      className={
        'flex flex-col w-full divide-y px-2 rounded-md divide-gray-350 bg-white border border-gray-350'
      }
      {...gap(12)}
    >
      <View className={'flex flex-row items-center pt-2 px-2'} {...gap(24)}>
        <Ionicons color={colors.primary} name={'person'} size={20} />

        <View>
          <Text className={'text-primary text-sm'}>Nome</Text>

          <Text className={'text-primary text-base font-medium'}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
      </View>

      <View className={'flex flex-row items-center pt-2 px-2'} {...gap(24)}>
        <Ionicons color={colors.primary} name={'mail'} size={20} />

        <View>
          <Text className={'text-primary text-sm'}>E-mail</Text>
          <Text className={'text-primary text-base font-medium'}>{user.email}</Text>
        </View>
      </View>

      <View className={'flex flex-row items-center py-2 px-2'} {...gap(24)}>
        <MaterialIcons color={colors.primary} name={'password'} size={20} />

        <View>
          <Text className={'text-primary text-sm'}>Senha</Text>
          <Text className={'text-primary text-base font-medium'}>********</Text>
        </View>
      </View>
    </View>
  );
};
