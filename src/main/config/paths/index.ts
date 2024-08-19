/* eslint-disable sort-keys-fix/sort-keys-fix */

export const paths = {
  login: 'login',
  register: 'register',
  recoverPassword: 'recoverPassword',
  updatePassword: 'updatePassword',
  home: 'home'
} as const;

export const apiPaths = {
  auth: '/login',
  register: '/register',
  default: 'default'
};
