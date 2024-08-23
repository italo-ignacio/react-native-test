/* eslint-disable sort-keys-fix/sort-keys-fix */

export const paths = {
  login: 'login',
  register: 'register',
  recoverPassword: 'recoverPassword',
  updatePassword: 'updatePassword',
  home: 'home',
  vehicle: 'vehicle',
  vehicleBrand: 'vehicleBrand',
  vehicleModel: 'vehicleModel',
  profile: 'profile'
} as const;

export const apiPaths = {
  login: '/login',
  user: '/user',
  vehicleBrand: '/vehicle-brand',
  vehicle: '/vehicle',
  vehicleModel: '/vehicle-model',
  default: 'default'
};
