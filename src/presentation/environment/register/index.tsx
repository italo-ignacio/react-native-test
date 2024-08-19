import { PublicContainer } from 'presentation/atomic-component/template';
import { RegisterForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const Register: FC = () => {
  return (
    <PublicContainer title={'Registrar'}>
      <RegisterForm />
    </PublicContainer>
  );
};
