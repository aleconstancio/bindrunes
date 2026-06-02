/**
 * Centralized formatters. Use these instead of inline toLocaleString calls
 * so all projects share the same locale and formatting style.
 */
export const LOCALE = 'pt-BR';

export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(LOCALE, options).format(new Date(date));
}

export function formatDateShort(date: Date | string | number): string {
  return formatDate(date, { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDateTime(date: Date | string | number): string {
  return formatDate(date, {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function formatTime(date: Date | string | number): string {
  return formatDate(date, { hour: '2-digit', minute: '2-digit' });
}

export function formatRelative(date: Date | string | number): string {
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'agora';
  if (minutes === 1) return '1 minuto atrás';
  if (minutes < 60) return `${minutes} minutos atrás`;
  if (hours === 1) return '1 hora atrás';
  if (hours < 24) return `${hours} horas atrás`;
  if (days === 1) return 'ontem';
  if (days < 30) return `${days} dias atrás`;
  return formatDateShort(date);
}

export function formatNumber(n: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(LOCALE, options).format(n);
}

export function formatPercentage(n: number): string {
  return formatNumber(n, { style: 'percent', maximumFractionDigits: 1 });
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}
