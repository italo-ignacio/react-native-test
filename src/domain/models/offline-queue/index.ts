export interface OfflineQueue {
  id: number;
  route: unknown;
  body: unknown;
  requestId?: number;
  entityId?: number;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
}
