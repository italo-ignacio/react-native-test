export interface OfflineQueue {
  route: unknown;
  body: unknown;
  method: 'delete' | 'get' | 'patch' | 'post' | 'put';
}
