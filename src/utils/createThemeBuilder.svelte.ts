type ThemeBuilderOptions = {
  primary: string;          // OKLCH color string
  accent?: string;          // defaults to primary with shifted hue
  destructive?: string;     // defaults to oklch(0.65 0.24 30)
  background?: string;      // defaults to derived dark
  radius?: string;          // defaults to 0.625rem
  glassBlur?: string;       // defaults to 16px
};

function deriveFromPrimary(primary: string, lightnessOffset: number, chromaScale: number): string {
  // Parse OKLCH: oklch(L C H)
  const match = primary.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) return primary;
  const l = Math.max(0, Math.min(1, parseFloat(match[1]) + lightnessOffset));
  const c = parseFloat(match[2]) * chromaScale;
  const h = parseFloat(match[3]);
  return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${h})`;
}

export function createThemeBuilder(options: ThemeBuilderOptions) {
  const primary = options.primary;
  const accent = options.accent ?? deriveFromPrimary(primary, -0.03, 1.2);
  const destructive = options.destructive ?? 'oklch(0.65 0.24 30)';
  const background = options.background ?? deriveFromPrimary(primary, -0.68, 0.1);
  const radius = options.radius ?? '0.625rem';
  const glassBlur = options.glassBlur ?? '16px';

  // Derive other tokens from primary
  const foreground = deriveFromPrimary(primary, 0.5, 0.05);
  const muted = deriveFromPrimary(primary, -0.02, 0.02);
  const mutedForeground = deriveFromPrimary(primary, -0.15, 0.05);
  const secondary = deriveFromPrimary(primary, -0.03, 0.04);
  const border = deriveFromPrimary(primary, -0.01, 0.04);
  const ring = primary;
  const glassSurface = `oklch(0 0 0 / 0.4)`;

  const tokens = {
    '--background': background,
    '--foreground': foreground,
    '--card': deriveFromPrimary(primary, 0, 0.03),
    '--card-foreground': foreground,
    '--muted': `oklch(1 0 0 / 0.04)`,
    '--muted-foreground': mutedForeground,
    '--secondary': secondary,
    '--secondary-foreground': foreground,
    '--primary': primary,
    '--primary-foreground': deriveFromPrimary(primary, -0.55, 0.1),
    '--accent': accent,
    '--accent-foreground': deriveFromPrimary(accent, -0.55, 0.1),
    '--destructive': destructive,
    '--destructive-foreground': 'oklch(0.95 0 0)',
    '--border': border,
    '--input': deriveFromPrimary(primary, -0.02, 0.03),
    '--ring': ring,
    '--glass-surface': glassSurface,
    '--glass-border': border,
    '--success': 'oklch(0.65 0.2 145)',
    '--warning': 'oklch(0.80 0.18 85)',
    '--radius': radius,
    '--glass-blur': glassBlur,
  };

  const cssText = Object.entries(tokens)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  function apply(target: HTMLElement = document.documentElement) {
    for (const [key, value] of Object.entries(tokens)) {
      target.style.setProperty(key, value);
    }
  }

  function toCSS(selector = ':root'): string {
    return `${selector} {\n${cssText}\n}`;
  }

  return {
    tokens,
    cssText,
    apply,
    toCSS,
  };
}
