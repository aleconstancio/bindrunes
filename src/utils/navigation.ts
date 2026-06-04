import type { Component } from 'svelte';
import type { NavGroup, NavItem } from '../shared-types';
import { isSafeRedirect } from './url';

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
export function deriveOmnibarOptions(
  groups: NavGroup[],
  options?: { idPrefix?: string; goto?: (to: string) => void }
) {
  return groups.flatMap(group =>
    group.items.map(item => ({
      id: options?.idPrefix ? `${options.idPrefix}${item.to}` : item.to.split('/').pop() ?? item.to,
      label: item.title,
      description: item.description,
      category: group.label,
      action: () => {
        if (options?.goto) {
          options.goto(item.to);
        } else if (isSafeRedirect(item.to)) {
          window.location.href = item.to;
        }
      },
    }))
  );
}
