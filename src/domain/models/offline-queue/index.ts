import type { SelectProps } from '../database';

export interface OfflineQueue {
  id: number;
  route: unknown;
  body: unknown;
  requestId?: number;
  entityId?: number;
  entity?: string;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
}

export const selectAllOfflineQueue: SelectProps<'offline_queue'> = {
  body: true,
  entity: true,
  entityId: true,
  id: true,
  method: true,
  requestId: true,
  route: true
};
