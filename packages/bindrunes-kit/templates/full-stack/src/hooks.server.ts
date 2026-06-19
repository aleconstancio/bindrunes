import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const handle: Handle = async ({ event, resolve }) => {
  // Add your auth middleware here
  event.locals.session = null;
  return resolve(event);
};

export const handle = sequence(handle);
