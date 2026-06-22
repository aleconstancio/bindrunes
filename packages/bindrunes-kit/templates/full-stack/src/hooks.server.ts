import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
  // TODO: Add your auth logic here
  event.locals.session = null;
  event.locals.user = null;
  return resolve(event);
};

export const handle = sequence(auth);
