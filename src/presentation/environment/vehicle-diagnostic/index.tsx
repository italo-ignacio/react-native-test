import { Button, View } from 'react-native';
import { LinkButton } from 'presentation/atomic-component/atom';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import type { FC } from 'react';

export const VehicleDiagnostic: FC = () => {
  return (
    <PrivateContainer headerTitle={'Diagnostic Veículos'}>
      <View {...gap(16)}>
        <Button title={'Veiculos'} />

        <LinkButton
          className={'bg-primary p-2 rounded-md'}
          path={paths.vehicleRegister}
          text={'Registrar'}
        />

        <LinkButton
          className={'bg-primary p-2 rounded-md'}
          path={paths.vehicleDiagnostic}
          text={'Diagnostico'}
        />

        <LinkButton
          className={'bg-primary p-2 rounded-md'}
          path={paths.vehicleEdit}
          text={'Editar'}
        />
      </View>
    </PrivateContainer>
  );
};
