import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const Profile: FC = () => {
  return (
    <PrivateContainer headerTitle={'Perfil'}>
      <Button title={'Perfil'} />
    </PrivateContainer>
  );
};
