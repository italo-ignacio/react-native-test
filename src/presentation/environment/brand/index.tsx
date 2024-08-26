import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const Brand: FC = () => {
  return (
    <PrivateContainer headerTitle={'Marcas'}>
      <Button title={'Marcas'} />
    </PrivateContainer>
  );
};
