import { PrivateContainer } from 'presentation/atomic-component/template';
import { ScrollView } from 'react-native';
import { VehicleForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const VehicleRegister: FC = () => {
  return (
    <PrivateContainer headerTitle={'Registro Veículos'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VehicleForm />
      </ScrollView>
    </PrivateContainer>
  );
};
