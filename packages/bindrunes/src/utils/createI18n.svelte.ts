export interface Dict {
	[key: string]: string | ((...args: unknown[]) => string);
}

export type { TFunction } from "../shared-types";

export interface I18nOptions {
	default: string;
	dicts: Record<string, Dict>;
	fallback?: string;
}

export interface I18nResult {
	readonly locale: string;
	readonly locales: string[];
	t(key: string, params?: Record<string, string | number>): string;
	setLocale(locale: string): void;
}

export function createI18n(options: I18nOptions): I18nResult {
	let locale = $state<string>(options.default);
	const locales = Object.keys(options.dicts);
	const fallback = options.fallback ?? options.default;

	function resolve(key: string, params?: Record<string, string | number>): string {
		const dict = options.dicts[locale] ?? options.dicts[fallback];
		const entry = dict?.[key] ?? options.dicts[fallback]?.[key];
		if (entry === undefined) return key;
		if (typeof entry === "function") return entry(params);
		if (params) {
			return entry.replace(/\{(\w+)\}/g, (_, name) => {
				const val = params[name];
				return val !== undefined ? String(val) : `{${name}}`;
			});
		}
		return entry;
	}

	function setLocale(newLocale: string) {
		if (options.dicts[newLocale]) {
			locale = newLocale;
		}
	}

	return {
		get locale() {
			return locale;
		},
		get locales() {
			return locales;
		},
		t: resolve,
		setLocale,
	};
}
