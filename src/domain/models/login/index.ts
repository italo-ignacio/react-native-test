export interface UserProps {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  role: 'admin' | 'common';
}

export interface LoginResponse {
  token: string;
}
