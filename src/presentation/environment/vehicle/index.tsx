import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const Vehicle: FC = () => {
  return (
    <PrivateContainer title={'Ola'}>
      <Button title={'Veiculos'} />
    </PrivateContainer>
  );
};
