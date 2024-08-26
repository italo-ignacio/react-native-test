import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const ModelEdit: FC = () => {
  return (
    <PrivateContainer headerTitle={'Modelos editar'}>
      <Button title={'Modelos'} />
    </PrivateContainer>
  );
};
