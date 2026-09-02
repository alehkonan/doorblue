import { localeCookieName, resolveRequestLocale } from "$lib/i18n";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const locale = resolveRequestLocale(
    event.cookies.get(localeCookieName),
    event.request.headers.get("accept-language"),
  );

  event.locals.locale = locale;

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", locale),
  });
};
