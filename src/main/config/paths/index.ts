/* eslint-disable sort-keys-fix/sort-keys-fix */

export const paths = {
  login: 'login',
  register: 'register',
  recoverPassword: 'recoverPassword',
  updatePassword: 'updatePassword',
  home: 'home'
} as const;

export const apiPaths = {
  login: '/login',
  user: '/user',
  default: 'default'
};
