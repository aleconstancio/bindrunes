import { getContext, setContext } from 'svelte';
import { browser } from './sidebar-constants.js';

export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export type SidebarState = ReturnType<typeof createSidebarState>;

const KEY = Symbol('thoth-sidebar');

export function setSidebarContext(ctx: SidebarState) {
  setContext(KEY, ctx);
}

export function getSidebarContext(): SidebarState {
  return getContext(KEY);
}

export function createSidebarState(initialOpen = true) {
  let open = $state(initialOpen);
  let openMobile = $state(false);
  let isMobile = $state(false);

  let state = $derived(open ? 'expanded' as const : 'collapsed' as const);

  $effect(() => {
    if (browser) {
      document.documentElement.style.setProperty('--sidebar-width', open ? '16rem' : '3rem');
    }
  });

  if (browser) {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault();
        open = !open;
      }
    });
  }

  function toggle() { open = !open; }
  function toggleMobile() { openMobile = !openMobile; }

  return {
    get open() { return open; },
    set open(v: boolean) { open = v; },
    get openMobile() { return openMobile; },
    set openMobile(v: boolean) { openMobile = v; },
    get isMobile() { return isMobile; },
    set isMobile(v: boolean) { isMobile = v; },
    get state() { return state; },
    toggle,
    toggleMobile,
  };
}
