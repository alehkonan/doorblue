import { env } from "$env/dynamic/private";
import { handleTelegramWebhook } from "$lib/server/telegram/webhook";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = ({ request }) =>
  handleTelegramWebhook(request, {
    botToken: env.TELEGRAM_BOT_TOKEN,
    webhookSecret: env.TELEGRAM_WEBHOOK_SECRET,
  });
