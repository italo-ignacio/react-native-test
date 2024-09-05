import { PrivateContainer } from 'presentation/atomic-component/template';
import { VehicleForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const VehicleRegister: FC = () => {
  return (
    <PrivateContainer headerTitle={'Registro Veículos'}>
      <VehicleForm />
    </PrivateContainer>
  );
};
