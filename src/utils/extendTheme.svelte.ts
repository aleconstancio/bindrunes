import { DRACULA_DEFAULTS } from './theme-defaults';
import { createThemeBuilder } from './createThemeBuilder.svelte';

type ExtendThemeOptions = {
  primary?: string;
  accent?: string;
  destructive?: string;
  background?: string;
  radius?: string;
  glassBlur?: string;
};

// Base tokens for each preset
const presetTokens: Record<string, Record<string, string>> = {
  dracula: { ...DRACULA_DEFAULTS },
  akashic: {
    primary: 'oklch(0.70 0.18 250)',
    accent: 'oklch(0.65 0.20 200)',
    destructive: 'oklch(0.65 0.24 30)',
    background: 'oklch(0.05 0.02 250)',
  },
  martian: {
    primary: 'oklch(0.65 0.28 30)',
    accent: 'oklch(0.75 0.22 55)',
    destructive: 'oklch(0.60 0.22 25)',
    background: 'oklch(0.05 0.01 30)',
  },
  alchemy: {
    primary: 'oklch(0.80 0.20 80)',
    accent: 'oklch(0.75 0.18 70)',
    destructive: 'oklch(0.65 0.24 30)',
    background: 'oklch(0.05 0.01 70)',
  },
  druidic: {
    primary: 'oklch(0.70 0.22 150)',
    accent: 'oklch(0.65 0.18 175)',
    destructive: 'oklch(0.65 0.24 30)',
    background: 'oklch(0.05 0.01 150)',
  },
  obsidian: {
    primary: 'oklch(0.55 0.02 260)',
    accent: 'oklch(0.50 0.01 260)',
    destructive: 'oklch(0.65 0.24 30)',
    background: 'oklch(0.05 0.01 260)',
  },
  contrast: {
    primary: 'oklch(0.80 0.22 310)',
    accent: 'oklch(0.78 0.28 340)',
    destructive: 'oklch(0.70 0.26 30)',
    background: 'oklch(0.02 0.005 260)',
  },
};

export function extendTheme(
  baseTheme: string,
  overrides: ExtendThemeOptions
) {
  const base = presetTokens[baseTheme];
  if (!base) {
    console.warn(`Unknown theme: ${baseTheme}. Available: ${Object.keys(presetTokens).join(', ')}`);
    return createThemeBuilder({
      primary: overrides.primary ?? DRACULA_DEFAULTS.primary,
      ...overrides,
    });
  }

  return createThemeBuilder({
    primary: overrides.primary ?? base.primary,
    accent: overrides.accent ?? base.accent,
    destructive: overrides.destructive ?? base.destructive,
    background: overrides.background ?? base.background,
    radius: overrides.radius,
    glassBlur: overrides.glassBlur,
  });
}
