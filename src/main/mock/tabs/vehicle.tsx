import {
  Bluetooth,
  VehicleContainer,
  VehicleDiagnostic,
  VehicleEdit,
  VehicleRegister
} from 'presentation/environment';
import { Stack } from 'main/stack';
import { paths } from 'main/config';
import type { FC } from 'react';

export const VehicleRoutes: FC = () => (
  <Stack.Navigator initialRouteName={paths.vehicle} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={VehicleContainer} name={paths.vehicle} />
    <Stack.Screen component={VehicleRegister} name={paths.vehicleRegister} />
    <Stack.Screen component={VehicleEdit} name={paths.vehicleEdit} />
    <Stack.Screen component={VehicleDiagnostic} name={paths.vehicleDiagnostic} />
    <Stack.Screen component={Bluetooth} name={paths.bluetooth} />
  </Stack.Navigator>
);
