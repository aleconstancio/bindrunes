export function useChartTheme() {
  if (typeof document === 'undefined') {
    return {
      primary: 'oklch(0.75 0.21 310)',
      accent: 'oklch(0.72 0.30 340)',
      destructive: 'oklch(0.65 0.24 30)',
      muted: 'oklch(0.55 0.03 280)',
      background: 'oklch(0.05 0.01 290)',
    };
  }
  const style = getComputedStyle(document.documentElement);
  return {
    primary: style.getPropertyValue('--primary').trim() || 'oklch(0.75 0.21 310)',
    accent: style.getPropertyValue('--accent').trim() || 'oklch(0.72 0.30 340)',
    destructive: style.getPropertyValue('--destructive').trim() || 'oklch(0.65 0.24 30)',
    muted: style.getPropertyValue('--muted-foreground').trim() || 'oklch(0.55 0.03 280)',
    background: style.getPropertyValue('--background').trim() || 'oklch(0.05 0.01 290)',
  };
}
