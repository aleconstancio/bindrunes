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
 * properties are always string at runtime. The `syntax`
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
/** Solid card background. Type: <color> */
declare const _cardSolid: never;

/** Surface level 1. Type: <color> */
declare const _surface1: never;
/** Surface level 2. Type: <color> */
declare const _surface2: never;
/** Surface level 3. Type: <color> */
declare const _surface3: never;

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
/** Destructive soft variant. Type: <color> */
declare const _destructiveSoft: never;

/** Success/green color. Type: <color> */
declare const _success: never;
/** Text on success surfaces. Type: <color> */
declare const _successForeground: never;
/** Success soft variant. Type: <color> */
declare const _successSoft: never;

/** Warning/amber color. Type: <color> */
declare const _warning: never;
/** Text on warning surfaces. Type: <color> */
declare const _warningForeground: never;
/** Warning soft variant. Type: <color> */
declare const _warningSoft: never;

/** Info color. Type: <color> */
declare const _info: never;
/** Text on info surfaces. Type: <color> */
declare const _infoForeground: never;
/** Info soft variant. Type: <color> */
declare const _infoSoft: never;

/** Default border color. Type: <color> */
declare const _border: never;
/** Strong border color. Type: <color> */
declare const _borderStrong: never;
/** Subtle border color. Type: <color> */
declare const _borderSubtle: never;
/** Input element background. Type: <color> */
declare const _input: never;
/** Focus outline/ring color. Type: <color> */
declare const _ring: never;

/** Overlay background. Type: <color> */
declare const _overlay: never;
/** Strong overlay background. Type: <color> */
declare const _overlayStrong: never;

/** Glass surface background. Type: <color>. Omit to disable glass. */
declare const _glassSurface: never;
/** Glass panel border color. Type: <color> */
declare const _glassBorder: never;

/** Glass backdrop-filter blur. Type: <length>. Set to 0px to disable. */
declare const _glassBlur: never;

/** Default border radius. Type: <length>. Registered @property. */
declare const _radius: never;
/** Extra-small radius. Type: <length> */
declare const _radiusXs: never;
/** Small radius. Type: <length> */
declare const _radiusSm: never;
/** Medium radius. Type: <length> */
declare const _radiusMd: never;
/** Large radius. Type: <length> */
declare const _radiusLg: never;
/** Extra-large radius. Type: <length> */
declare const _radiusXl: never;

/** Shadow xs. Type: <shadow> */
declare const _shadowXs: never;
/** Shadow sm. Type: <shadow> */
declare const _shadowSm: never;
/** Shadow md. Type: <shadow> */
declare const _shadowMd: never;
/** Shadow lg. Type: <shadow> */
declare const _shadowLg: never;
/** Primary glow shadow. Type: <shadow> */
declare const _shadowGlowPrimary: never;
/** Destructive glow shadow. Type: <shadow> */
declare const _shadowGlowDestructive: never;
/** Inset subtle shadow. Type: <shadow> */
declare const _shadowInsetSubtle: never;

/** Duration instant (50ms). Type: <time>. Registered @property. */
declare const _durationInstant: never;
/** Snappy transition duration (120ms). Type: <time>. Registered @property. */
declare const _durationSnappy: never;
/** Fluid transition duration (220ms). Type: <time>. Registered @property. */
declare const _durationFluid: never;
/** Slow transition duration (360ms). Type: <time>. Registered @property. */
declare const _durationSlow: never;
/** Default easing curve. Type: <easing-function>. */
declare const _easingDefault: never;

/** Standard easing. Type: <easing-function> */
declare const _easeStandard: never;
/** Emphasized easing. Type: <easing-function> */
declare const _easeEmphasized: never;
/** Decelerated easing. Type: <easing-function> */
declare const _easeDecelerated: never;
/** Accelerated easing. Type: <easing-function> */
declare const _easeAccelerated: never;
/** Spring easing. Type: <easing-function> */
declare const _easeSpring: never;

/** Spacing 0. Type: <length> */
declare const _space0: never;
/** Spacing 1 (0.25rem). Type: <length> */
declare const _space1: never;
/** Spacing 2 (0.5rem). Type: <length> */
declare const _space2: never;
/** Spacing 3 (0.75rem). Type: <length> */
declare const _space3: never;
/** Spacing 4 (1rem). Type: <length> */
declare const _space4: never;
/** Spacing 5 (1.25rem). Type: <length> */
declare const _space5: never;
/** Spacing 6 (1.5rem). Type: <length> */
declare const _space6: never;
/** Spacing 8 (2rem). Type: <length> */
declare const _space8: never;
/** Spacing 10 (3rem). Type: <length> */
declare const _space10: never;
/** Spacing 12 (4rem). Type: <length> */
declare const _space12: never;
/** Spacing 16 (5rem). Type: <length> */
declare const _space16: never;
/** Spacing 20 (6rem). Type: <length> */
declare const _space20: never;

/** Aesthetic hook: button treatment. Type: <string> */
declare const _buttonTreatment: never;
/** Aesthetic hook: button background. Type: <color> */
declare const _buttonBg: never;
/** Aesthetic hook: destructive button background. Type: <color> */
declare const _buttonBgDestructive: never;
/** Aesthetic hook: card treatment. Type: <string> */
declare const _cardTreatment: never;
/** Aesthetic hook: surface texture. Type: <string> */
declare const _surfaceTexture: never;
/** Aesthetic hook: hero translate. Type: <length> */
declare const _heroTranslate: never;
/** Aesthetic hook: shadow emphasis. Type: <string> */
declare const _shadowEmphasis: never;

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
/** Popover z-index. Type: <integer>. Registered @property. */
declare const _zPopover: never;
/** Tooltip z-index. Type: <integer>. Registered @property. */
declare const _zTooltip: never;

/** Font sans family. Type: <family-name> */
declare const _fontSans: never;
