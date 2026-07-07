/**
 * Centralized formatters. Use these instead of inline toLocaleString calls
 * so all projects share the same locale and formatting style.
 *
 * NOTE: `LOCALE` is module-level state. In SSR environments with concurrent
 * requests, calling `setLocale()` will affect all requests sharing the same
 * module instance. Prefer using `useI18n()` for scoped, reactive locale
 * management in components.
 */
let _locale = typeof navigator !== "undefined" ? navigator.language : "en";

export function getLocale(): string {
	return _locale;
}

export function setLocale(locale: string) {
	_locale = locale;
}

export function formatDate(
	date: Date | string | number,
	options?: Intl.DateTimeFormatOptions,
): string {
	return new Intl.DateTimeFormat(_locale, options).format(new Date(date));
}

export function formatDateShort(date: Date | string | number): string {
	return formatDate(date, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatDateTime(date: Date | string | number): string {
	return formatDate(date, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function formatTime(date: Date | string | number): string {
	return formatDate(date, { hour: "2-digit", minute: "2-digit" });
}

const DEFAULT_RELATIVE_STRINGS: {
	now: string;
	min: string;
	mins: string;
	hour: string;
	hours: string;
	yesterday: string;
	days: string;
} = {
	now: "now",
	min: "1 minute ago",
	mins: "{n} minutes ago",
	hour: "1 hour ago",
	hours: "{n} hours ago",
	yesterday: "yesterday",
	days: "{n} days ago",
};

const RELATIVE_STRINGS: Record<string, typeof DEFAULT_RELATIVE_STRINGS> = {
	pt: {
		now: "agora",
		min: "1 minuto atrás",
		mins: "{n} minutos atrás",
		hour: "1 hora atrás",
		hours: "{n} horas atrás",
		yesterday: "ontem",
		days: "{n} dias atrás",
	},
	en: DEFAULT_RELATIVE_STRINGS,
};

function getRelativeStrings() {
	const lang = _locale.split("-")[0] ?? "en";
	return RELATIVE_STRINGS[lang] ?? DEFAULT_RELATIVE_STRINGS;
}

export function formatRelative(date: Date | string | number): string {
	const now = Date.now();
	const diff = now - new Date(date).getTime();
	const minutes = Math.floor(diff / 60000);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const r = getRelativeStrings();

	if (minutes < 1) return r.now;
	if (minutes === 1) return r.min;
	if (minutes < 60) return r.mins.replace("{n}", String(minutes));
	if (hours === 1) return r.hour;
	if (hours < 24) return r.hours.replace("{n}", String(hours));
	if (days === 1) return r.yesterday;
	if (days < 30) return r.days.replace("{n}", String(days));
	return formatDateShort(date);
}

export function formatNumber(n: number, options?: Intl.NumberFormatOptions): string {
	return new Intl.NumberFormat(_locale, options).format(n);
}

export function formatPercentage(n: number): string {
	return formatNumber(n, { style: "percent", maximumFractionDigits: 1 });
}

export function formatBytes(bytes: number): string {
	if (bytes === 0) return "0 B";
	const units = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / 1024 ** i).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}
