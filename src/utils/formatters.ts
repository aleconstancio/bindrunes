/**
 * Centralized formatters. Use these instead of inline toLocaleString calls
 * so all projects share the same locale and formatting style.
 */
export let LOCALE = typeof navigator !== "undefined" ? navigator.language : "en";

export function setLocale(locale: string) {
	LOCALE = locale;
}

export function formatDate(
	date: Date | string | number,
	options?: Intl.DateTimeFormatOptions,
): string {
	return new Intl.DateTimeFormat(LOCALE, options).format(new Date(date));
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

const RELATIVE_STRINGS: Record<
	string,
	{
		now: string;
		min: string;
		mins: string;
		hour: string;
		hours: string;
		yesterday: string;
		days: string;
	}
> = {
	pt: {
		now: "agora",
		min: "1 minuto atrás",
		mins: "{n} minutos atrás",
		hour: "1 hora atrás",
		hours: "{n} horas atrás",
		yesterday: "ontem",
		days: "{n} dias atrás",
	},
	en: {
		now: "now",
		min: "1 minute ago",
		mins: "{n} minutes ago",
		hour: "1 hour ago",
		hours: "{n} hours ago",
		yesterday: "yesterday",
		days: "{n} days ago",
	},
	es: {
		now: "ahora",
		min: "hace 1 minuto",
		mins: "hace {n} minutos",
		hour: "hace 1 hora",
		hours: "hace {n} horas",
		yesterday: "ayer",
		days: "hace {n} días",
	},
};

function getRelativeStrings() {
	const lang = LOCALE.split("-")[0];
	return RELATIVE_STRINGS[lang] ?? RELATIVE_STRINGS["en"];
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
	return new Intl.NumberFormat(LOCALE, options).format(n);
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
