/* eslint-disable sort-keys-fix/sort-keys-fix */

export const paths = {
  login: 'login',
  register: 'register',
  recoverPassword: 'recoverPassword',
  updatePassword: 'updatePassword',
  home: 'home',
  homeRoutes: 'homeRoutes',
  vehicle: 'vehicle',
  vehicleRoutes: 'vehicleRoutes',
  bluetooth: 'bluetooth',
  vehicleRegister: 'vehicleRegister',
  vehicleEdit: 'vehicleEdit',
  vehicleDiagnostic: 'vehicleDiagnostic',
  vehicleActiveDiagnostic: 'vehicleActiveDiagnostic',
  brandRoutes: 'brandRoutes',
  brand: 'brand',
  brandRegister: 'brandRegister',
  brandEdit: 'brandEdit',
  model: 'model',
  modelRoutes: 'modelRoutes',
  modelRegister: 'modelRegister',
  modelEdit: 'modelEdit',
  profile: 'profile'
} as const;

export const apiPaths = {
  login: '/login',
  user: '/user',
  vehicleBrand: '/vehicle-brand',
  vehicle: '/vehicle',
  register: '/user',
  vehicleModelByBrand: (brandId: number): string => `/vehicle-brand/${brandId}/vehicle-model`,
  vehicleModel: '/vehicle-model',
  default: 'default'
};
