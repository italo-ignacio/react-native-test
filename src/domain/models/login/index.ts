export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: 'account' | 'driver';
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  companyId: string;
  user: UserProps;
}
