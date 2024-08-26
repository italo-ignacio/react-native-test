import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const ModelRegister: FC = () => {
  return (
    <PrivateContainer headerTitle={'Modelos registrar'}>
      <Button title={'Modelos'} />
    </PrivateContainer>
  );
};
