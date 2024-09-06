import { callToast, resolverError } from 'main/utils';
import { paths } from 'main/config';
import { store } from 'store';
import { useForm } from 'react-hook-form';
import { useRequest, useRouter } from 'data/hooks';
import { vehicleSchema } from 'validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import type { Vehicle } from 'domain/models';
import type { VehicleRequest } from 'validation/schema';
import type { formReturn } from 'domain/protocol';

interface useVehicleProps {
  vehicle?: Vehicle;
}

export const useVehicle = ({ vehicle }: useVehicleProps): formReturn<VehicleRequest> => {
  const formData = useForm<VehicleRequest>({
    resolver: yupResolver(vehicleSchema)
  });
  const { navigate } = useRouter();

  const { makeRequest } = useRequest();
  const onSubmit: SubmitHandler<VehicleRequest> = async (data) => {
    try {
      const body = {};
      const { hasInternetConnection } = store.getState().netInfo;

      if (vehicle && !hasInternetConnection && vehicle.apiId === null)
        Object.assign(body, {
          licensePlate: data.licensePlate,
          serialNumber: data.serialNumber,
          typeOfFuel: data.typeOfFuel,
          vehicleModelId: data.vehicleModelId
        });
      else if (vehicle) {
        if (vehicle.licensePlate !== data.licensePlate)
          Object.assign(body, { licensePlate: data.licensePlate });

        if (vehicle.typeOfFuel !== data.typeOfFuel)
          Object.assign(body, { typeOfFuel: data.typeOfFuel });

        if (vehicle.vehicleModel.id !== data.vehicleModelId)
          Object.assign(body, { vehicleModelId: data.vehicleModelId });
      } else
        Object.assign(body, {
          licensePlate: data.licensePlate,
          serialNumber: data.serialNumber,
          typeOfFuel: data.typeOfFuel,
          vehicleModelId: data.vehicleModelId
        });
      console.log(body);
      console.log({ apiId: vehicle?.apiId, id: vehicle?.id });

      if (Object.keys(body).length)
        await makeRequest({
          body,
          ids: vehicle ? { apiId: vehicle.apiId, id: vehicle.id } : undefined,
          method: vehicle ? 'PUT' : 'POST',
          route: 'vehicle'
        });

      callToast.success(`${vehicle ? 'Atualizado' : 'Cadastrado'} com sucesso`);
      navigate(paths.vehicleRoutes, { screen: paths.vehicle });
    } catch (err) {
      resolverError(err);
    }
  };

  return { ...formData, onSubmit };
};
