/* ─────────────────────────────────────────────────────
 * bindrunes Design Token — TypeScript Autocomplete
 *
 * This file provides IDE intellisense for CSS custom
 * properties. Many editors (VS Code, WebStorm) will
 * autocomplete these in CSS files and style blocks.
 *
 * Usage in any CSS context:
 *   background: var(--background);
 *   color: var(--foreground);
 *   border-radius: var(--radius);
 *
 * Type imports are for documentation only — CSS custom
 * properties are always strings at runtime. The `syntax`
 * comments reference the @property declaration type.
 * ───────────────────────────────────────────────────── */

/** Page background color. Type: <color> */
declare const _background: never;
/** Page text color. Type: <color> */
declare const _foreground: never;

/** Card/panel background. Type: <color> */
declare const _card: never;
/** Text on card surfaces. Type: <color> */
declare const _cardForeground: never;

/** Primary accent (buttons, links, active states). Type: <color> */
declare const _primary: never;
/** Text on primary backgrounds. Type: <color> */
declare const _primaryForeground: never;

/** Secondary surface (hover states, subtle backgrounds). Type: <color> */
declare const _secondary: never;
/** Text on secondary surfaces. Type: <color> */
declare const _secondaryForeground: never;

/** Muted surfaces (low-emphasis elements). Type: <color> */
declare const _muted: never;
/** Muted text (labels, descriptions, placeholders). Type: <color> */
declare const _mutedForeground: never;

/** Glass/hover accent (border glow, tertiary actions). Type: <color> */
declare const _accent: never;
/** Text on accent surfaces. Type: <color> */
declare const _accentForeground: never;

/** Destructive/error color. Type: <color> */
declare const _destructive: never;
/** Text on destructive surfaces. Type: <color> */
declare const _destructiveForeground: never;

/** Default border color. Type: <color> */
declare const _border: never;
/** Input element background. Type: <color> */
declare const _input: never;
/** Focus outline/ring color. Type: <color> */
declare const _ring: never;

/** Default border radius. Type: <length>. Registered @property. */
declare const _radius: never;

/** Glass surface background. Type: <color>. Omit to disable glass. */
declare const _glassSurface: never;
/** Glass backdrop-filter blur. Type: <length>. Set to 0px to disable. */
declare const _glassBlur: never;
/** Glass panel border color. Type: <color> */
declare const _glassBorder: never;

/** Snappy transition duration (150ms). Type: <time>. Registered @property. */
declare const _durationSnappy: never;
/** Fluid transition duration (250ms). Type: <time>. Registered @property. */
declare const _durationFluid: never;
/** Slow transition duration (400ms). Type: <time>. Registered @property. */
declare const _durationSlow: never;
/** Default easing curve. Type: <easing-function>. */
declare const _easingDefault: never;

/** Sidebar background. Type: <color> */
declare const _sidebarBackground: never;
/** Sidebar text color. Type: <color> */
declare const _sidebarForeground: never;
/** Sidebar primary accent. Type: <color> */
declare const _sidebarPrimary: never;
/** Sidebar primary text. Type: <color> */
declare const _sidebarPrimaryForeground: never;
/** Sidebar hover/accent background. Type: <color> */
declare const _sidebarAccent: never;
/** Sidebar hover/accent text. Type: <color> */
declare const _sidebarAccentForeground: never;
/** Sidebar border color. Type: <color> */
declare const _sidebarBorder: never;
/** Sidebar focus ring. Type: <color> */
declare const _sidebarRing: never;

/** Sidebar z-index. Type: <integer>. Registered @property. */
declare const _zSidebar: never;
/** Modal/dropdown overlay z-index. Type: <integer>. Registered @property. */
declare const _zOverlay: never;
/** Toast notification z-index. Type: <integer>. Registered @property. */
declare const _zToast: never;
/** Omnibar/command palette z-index. Type: <integer>. Registered @property. */
declare const _zOmnibar: never;
