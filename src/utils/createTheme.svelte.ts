import { createStorage } from './createStorage';

const THEMES = [
	'editorial',
	'dracula',
	'nord',
	'catppuccin',
	'rose-pine',
	'github',
] as const;
export type Theme = (typeof THEMES)[number];

function detectInitialTheme(defaultTheme: Theme = 'editorial'): Theme {
	if (typeof window === 'undefined') return defaultTheme;
	return (storageGet('bindrunes', 'theme') as Theme) ?? defaultTheme;
}

function storageGet(prefix: string, key: string): string | null {
	try {
		const raw = localStorage.getItem(`${prefix}_${key}`);
		return raw ? (JSON.parse(raw) as string) : null;
	} catch {
		return null;
	}
}

export function createTheme(options?: { default?: Theme }) {
	const storage = createStorage('bindrunes');
	let theme = $state<Theme>(detectInitialTheme(options?.default));

	$effect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		storage.set('theme', theme);
	});

	return {
		get theme() {
			return theme;
		},
		setTheme(t: Theme) {
			theme = t;
		},
		themes: THEMES,
	};
}
