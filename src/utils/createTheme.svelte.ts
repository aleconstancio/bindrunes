import { createStorage } from './createStorage';

const THEMES = ['dracula', 'akashic', 'martian', 'alchemy', 'druidic', 'obsidian', 'contrast'] as const;
export type Theme = (typeof THEMES)[number];

export function createTheme(options?: { default?: Theme }) {
  const storage = createStorage('bindrunes');
  let theme = $state<Theme>(
    (storage.get<string>('theme') as Theme) ?? options?.default ?? 'dracula'
  );

  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set('theme', theme);
  });

  return {
    get theme() { return theme; },
    setTheme(t: Theme) { theme = t; },
    themes: THEMES,
  };
}
