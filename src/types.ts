import type { ComponentType } from 'svelte';
import { isSafeRedirect } from './utils/url.ts';

/**
 * A single navigation item.
 * `match` defaults to `to` if not provided.
 * `icon` can be a Svelte component or a string (emoji).
 */
export interface NavItem {
  title: string;
  /** Route path (e.g. /dashboard/triage) */
  to: string;
  /** Path prefix for active detection (defaults to `to`) */
  match?: string;
  description: string;
  icon: ComponentType | string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * Derives active page title/description from navigation config.
 * Usage: $derived(derivePageInfo(pathname, navigationGroups))
 */
export function derivePageInfo(
  pathname: string,
  groups: NavGroup[],
  fallback = { title: 'Home', description: '' }
) {
  for (const group of groups) {
    for (const item of group.items) {
      if (pathname.startsWith(item.match ?? item.to)) {
        return { title: item.title, description: item.description };
      }
    }
  }
  return fallback;
}

/**
 * Derives Omnibar/command palette options from navigation groups.
 * Usage: const omnibarOptions = deriveOmnibarOptions(navigationGroups);
 */
export function deriveOmnibarOptions(groups: NavGroup[], options?: { idPrefix?: string }) {
  return groups.flatMap(group =>
    group.items.map(item => ({
      id: options?.idPrefix ? `${options.idPrefix}${item.to}` : item.to.split('/').pop() ?? item.to,
      label: item.title,
      description: item.description,
      category: group.label,
      action: () => { if (isSafeRedirect(item.to)) window.location.href = item.to; },
    }))
  );
}
