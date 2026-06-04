import { setContext, getContext } from 'svelte';

const KEY = Symbol('landing');

export interface LandingState {
  billingAnnual: boolean;
  activeSection: string;
  menuOpen: boolean;
}

export function createLandingState(): LandingState {
  const state = $state<LandingState>({
    billingAnnual: false,
    activeSection: '',
    menuOpen: false,
  });
  setContext(KEY, state);
  return state;
}

export function useLanding(): LandingState {
  return getContext<LandingState>(KEY);
}
