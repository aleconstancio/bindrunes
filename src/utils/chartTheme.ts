import { DRACULA_DEFAULTS } from './theme-defaults';

export function useChartTheme() {
  if (typeof document === 'undefined') {
    return {
      primary: DRACULA_DEFAULTS.primary,
      accent: DRACULA_DEFAULTS.accent,
      destructive: DRACULA_DEFAULTS.destructive,
      muted: 'oklch(0.55 0.03 280)',
      background: DRACULA_DEFAULTS.background,
    };
  }
  const style = getComputedStyle(document.documentElement);
  return {
    primary: style.getPropertyValue('--primary').trim() || DRACULA_DEFAULTS.primary,
    accent: style.getPropertyValue('--accent').trim() || DRACULA_DEFAULTS.accent,
    destructive: style.getPropertyValue('--destructive').trim() || DRACULA_DEFAULTS.destructive,
    muted: style.getPropertyValue('--muted-foreground').trim() || 'oklch(0.55 0.03 280)',
    background: style.getPropertyValue('--background').trim() || DRACULA_DEFAULTS.background,
  };
}
