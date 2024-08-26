import { Button } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const Model: FC = () => {
  return (
    <PrivateContainer headerTitle={'Modelos'}>
      <Button title={'Modelos'} />
    </PrivateContainer>
  );
};
