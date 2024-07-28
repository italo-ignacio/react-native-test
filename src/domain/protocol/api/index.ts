export interface ApiProps {
  route: unknown;
  body?: unknown;
  id?: string;
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  queryParams?: unknown;
  isFormData?: boolean;
}
