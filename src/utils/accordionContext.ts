import { getContext } from 'svelte';

export interface AccordionContext {
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
  multiple: boolean;
}

export const ACCORDION_KEY = Symbol('accordion');

export function getAccordionContext(): AccordionContext {
  return getContext<AccordionContext>(ACCORDION_KEY);
}
