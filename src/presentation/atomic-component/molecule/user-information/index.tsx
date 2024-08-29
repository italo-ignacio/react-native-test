import { DefaultCard } from 'presentation/atomic-component/atom';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors } from 'presentation/style';
import { useAppSelector } from 'store';
import type { FC } from 'react';

export const UserInformation: FC = () => {
  const { user } = useAppSelector((state) => state.persist);

  if (!user) return null;

  return (
    <DefaultCard
      items={[
        {
          leftElement: <Ionicons color={colors.primary} name={'person'} size={20} />,
          subtitle: `${user.firstName} ${user.lastName}`,
          title: 'Nome'
        },
        {
          leftElement: <Ionicons color={colors.primary} name={'mail'} size={20} />,
          subtitle: `${user.email}`,
          title: 'E-mail'
        },
        {
          leftElement: <MaterialIcons color={colors.primary} name={'password'} size={20} />,
          subtitle: '********',
          title: 'Senha'
        }
      ]}
    />
  );
};
