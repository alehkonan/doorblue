import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  const expectedSecret = platform?.env?.TELEGRAM_WEBHOOK_SECRET;
  const receivedSecret = request.headers.get('x-telegram-bot-api-secret-token');

  if (expectedSecret && receivedSecret !== expectedSecret) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const update = await request.json();

  // Telegram delivery is acknowledged here; bot handling will be added separately.
  console.info('Telegram update received', update);

  return json({ ok: true });
};
