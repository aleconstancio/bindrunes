import { getContext, setContext } from 'svelte';
import { browser } from './sidebar-constants';

export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export type SidebarState = ReturnType<typeof createSidebarState>;

const KEY = Symbol('bindrunes-sidebar');

export function setSidebarContext(ctx: SidebarState) {
  setContext(KEY, ctx);
}

export function getSidebarContext(): SidebarState {
  return getContext(KEY);
}

export function createSidebarState(initialOpen = true) {
		let open = $state<boolean>(initialOpen);
		let openMobile = $state<boolean>(false);
		let isMobile = $state<boolean>(false);

  let state = $derived(open ? 'expanded' as const : 'collapsed' as const);

  $effect(() => {
    if (browser) {
      document.documentElement.style.setProperty('--sidebar-width', open ? '16rem' : '3rem');
    }
  });

  $effect(() => {
    if (browser) {
      function handleKeydown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
          e.preventDefault();
          open = !open;
        }
      }
      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }
  });

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
