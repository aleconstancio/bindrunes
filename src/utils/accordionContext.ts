import { getContext } from 'svelte';

type AccordionContext = {
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
  multiple: boolean;
};

export function getAccordionContext(): AccordionContext {
  return getContext('accordion');
}
