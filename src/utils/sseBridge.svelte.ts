import { invalidateQuery } from './queryCache';

export type SSEEventRouter = {
  [eventType: string]: string | string[];
};

/** @deprecated Application-specific defaults; provide routes explicitly via handleSSEEvent() */
export const DEFAULT_SSE_ROUTES: SSEEventRouter = {
  'event.created': '/api/events',
  'event.promoted': '/api/events',
  'dossier.updated': '/api/dossiers',
  'ingestion.update': '/api/ingestion',
  'audit.new': '/api/audit/logs',
};

export function handleSSEEvent(type: string, routes?: SSEEventRouter): void {
  const router = routes ?? DEFAULT_SSE_ROUTES;
  const cacheKey = router[type];
  if (cacheKey) {
    if (Array.isArray(cacheKey)) {
      cacheKey.forEach(key => invalidateQuery(key));
    } else {
      invalidateQuery(cacheKey);
    }
  }
}
