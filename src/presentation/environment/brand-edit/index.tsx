import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const BrandEdit: FC = () => {
  return (
    <PrivateContainer headerTitle={'Marcas editar'}>
      <Button title={'Marcas'} />
    </PrivateContainer>
  );
};
