export interface UserProps {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginResponse {
  token: string;
}
