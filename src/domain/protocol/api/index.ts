export interface ApiProps {
  route: unknown;
  body?: unknown;
  id?: number;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  queryParams?: unknown;
  token?: string;
  isFormData?: boolean;
}
