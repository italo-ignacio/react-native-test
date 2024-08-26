import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const BrandRegister: FC = () => {
  return (
    <PrivateContainer headerTitle={'Marcas registrar'}>
      <Button title={'Marcas'} />
    </PrivateContainer>
  );
};
