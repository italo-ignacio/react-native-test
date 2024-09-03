import { Stack } from 'main/stack';
import {
  VehicleContainer,
  VehicleDiagnostic,
  VehicleEdit,
  VehicleRegister
} from 'presentation/environment';
import { paths } from 'main/config';
import type { FC } from 'react';

export const VehiclePages = [
  {
    name: 'listagem de veiculos'
  },
  {
    name: 'novo veiculo'
  },
  {
    name: 'editar veiculo'
  },
  {
    name: 'historico do diagnostivco'
  }
];

export const VehicleRoutes: FC = () => (
  <Stack.Navigator initialRouteName={paths.vehicle} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={VehicleContainer} name={paths.vehicle} />
    <Stack.Screen component={VehicleRegister} name={paths.vehicleRegister} />
    <Stack.Screen component={VehicleEdit} name={paths.vehicleEdit} />
    <Stack.Screen component={VehicleDiagnostic} name={paths.vehicleDiagnostic} />
  </Stack.Navigator>
);
