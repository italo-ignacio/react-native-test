import { PublicContainer } from 'presentation/atomic-component/template';
import { RecoverPasswordForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const RecoverPassword: FC = () => {
  return (
    <PublicContainer title={'Recuperar senha'}>
      <RecoverPasswordForm />
    </PublicContainer>
  );
};
