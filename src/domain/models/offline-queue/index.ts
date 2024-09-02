export interface OfflineQueue {
  id: number;
  route: unknown;
  body: unknown;
  requestId?: number;
  entityId?: number;
  entity?: string;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
}
