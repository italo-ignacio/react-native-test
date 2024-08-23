import { Button } from 'react-native';
import { Container } from 'presentation/atomic-component/atom';
import type { FC } from 'react';

export const VehicleModel: FC = () => {
  return (
    <Container style={{ gap: 6 }}>
      <Button title={'Modelos'} />
    </Container>
  );
};
