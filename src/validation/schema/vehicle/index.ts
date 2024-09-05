import { number, object, string } from 'yup';
import type { InferType } from 'yup';

export const vehicleSchema = object().shape({
  licensePlate: string().required('O campo placa é obrigatório'),
  serialNumber: string().required('O campo código do veículo é obrigatório'),
  typeOfFuel: string().required('O tipo de combustível é obrigatório'),
  vehicleBrandId: number().required('A marca é obrigatório'),
  vehicleModelId: number().required('O modelo do veículo é obrigatório')
});

export type VehicleRequest = InferType<typeof vehicleSchema>;
