// src/tailwind-plugin.ts
import type { Config } from 'tailwindcss';

const plugin = {
  name: 'bindrunes',
  config: {
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: {
            DEFAULT: 'var(--card)',
            foreground: 'var(--card-foreground)',
          },
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
          },
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          accent: {
            DEFAULT: 'var(--accent)',
            foreground: 'var(--accent-foreground)',
          },
          destructive: {
            DEFAULT: 'var(--destructive)',
            foreground: 'var(--destructive-foreground)',
          },
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
          'glass-surface': 'var(--glass-surface)',
          'glass-border': 'var(--glass-border)',
          success: 'var(--success)',
          warning: 'var(--warning)',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        borderRadius: {
          DEFAULT: 'var(--radius)',
        },
        transitionDuration: {
          snappy: 'var(--duration-snappy)',
          fluid: 'var(--duration-fluid)',
          slow: 'var(--duration-slow)',
        },
        zIndex: {
          sidebar: 'var(--z-sidebar)',
          overlay: 'var(--z-overlay)',
          toast: 'var(--z-toast)',
          omnibar: 'var(--z-omnibar)',
        },
      },
    },
    plugins: [
      ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) => {
        addUtilities({
          '.glass-panel': {
            background: 'var(--glass-surface, oklch(0 0 0 / 0.4))',
            'backdrop-filter': 'blur(var(--glass-blur, 16px))',
            '-webkit-backdrop-filter': 'blur(var(--glass-blur, 16px))',
            border: '1px solid var(--glass-border, oklch(1 0 0 / 0.08))',
            'border-radius': 'var(--radius, 0.625rem)',
            transition: 'border-color var(--duration-snappy, 150ms), background-color var(--duration-snappy, 150ms), box-shadow var(--duration-snappy, 150ms), transform var(--duration-snappy, 150ms)',
          },
          '.glass-interactive': {
            cursor: 'pointer',
          },
          '.glass-interactive:hover': {
            'box-shadow': '0 0 30px oklch(from var(--primary, oklch(0.75 0.21 310)) l c h / 0.2)',
            transform: 'translateY(-2px)',
          },
          '.text-gradient-violet': {
            background: 'linear-gradient(135deg, var(--foreground, oklch(0.95 0.01 290)) 30%, var(--primary, oklch(0.75 0.21 310)) 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          },
          '.text-gradient-gold': {
            background: 'linear-gradient(135deg, var(--foreground, oklch(0.95 0.01 290)) 30%, var(--warning, oklch(0.8 0.18 85)) 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          },
          '.mono': {
            'font-family': "'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace",
          },
        });
      },
    ],
  } satisfies Config,
};

export default plugin;
