import { LoginForm } from 'presentation/atomic-component/molecule/form';
import { PublicContainer } from 'presentation/atomic-component/template';
import type { FC } from 'react';

export const Login: FC = () => {
  return (
    <PublicContainer title={'Login'}>
      <LoginForm />
    </PublicContainer>
  );
};
