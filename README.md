# Doorblue

SvelteKit application deployed to Cloudflare Workers with Cloudflare Static Assets.

## Requirements

- Node.js 24 (the repository includes `.node-version`)
- npm
- Wrangler authentication for deployment

## Development

```sh
fnm use 24
npm install
cp .env.example .env
npm run dev
```

Set the public donation and contact details in `.env`:

```sh
VITE_DONATION_ACCOUNT="your-donation-account"
VITE_DONATION_ACCOUNT_HOLDER="your-account-holder"
VITE_TELEGRAM_CONTACT="https://t.me/your-contact"
```

The contact value is used for direct questions about coworking, rental, directions,
and donations. When it is not configured, contact links fall back to the public
Instagram profile.

The `VITE_` prefix makes these values available to the public client bundle. They are
not secret credentials; the donation values are displayed on the donations page and
the Telegram URL is used in public links.

The Telegram bot uses private values without the `VITE_` prefix. Add them to `.env`
for local SvelteKit development:

```sh
TELEGRAM_BOT_TOKEN="replace-with-your-bot-token"
TELEGRAM_WEBHOOK_SECRET="replace-with-a-random-secret"
```

Generate a webhook secret containing only characters accepted by Telegram:

```sh
openssl rand -hex 32
```

Do not commit either value. `TELEGRAM_BOT_TOKEN` authorizes outgoing Bot API calls;
`TELEGRAM_WEBHOOK_SECRET` authenticates incoming webhook requests.

Local Worker runtime uses `.dev.vars` instead of `.env`:

```sh
cp .dev.vars.example .dev.vars
npm run build
npx wrangler dev
```

Telegram requires a public HTTPS webhook URL, so it cannot deliver updates directly
to `localhost`. The handler can still be tested locally with `npm test`. An authenticated
update that intentionally requires no bot response can also be sent to the development
server:

```sh
curl --request POST http://localhost:4015/api/telegram/webhook \
  --header 'content-type: application/json' \
  --header 'x-telegram-bot-api-secret-token: replace-with-your-webhook-secret' \
  --data '{"update_id":1,"message":{"from":{"id":1,"is_bot":false,"language_code":"en"},"chat":{"id":1,"type":"private"},"text":"Hello"}}'
```

Use a separate development bot and a public tunnel or staging Worker if real Telegram
delivery needs to be tested without replacing the production bot's webhook.

## Localization

The public interface supports English (`en`), Russian (`ru`), and Georgian (`ka`).
On the first visit, the server chooses the first supported language from the browser's
`Accept-Language` header and falls back to English. A visitor's explicit choice is
stored under `doorblue_locale` in both `localStorage` and a functional cookie so SSR
can render the preferred language without a flash of different content.

Translation dictionaries live in `src/lib/translations/en.json`, `ru.json`, and
`ka.json`; locale types and resolution helpers remain in `src/lib/i18n.ts`. Russian
and Georgian translations are drafts and should be reviewed by native speakers
before final publication.

## Deployment

```sh
npx wrangler login
npm run deploy
```

Set production secrets with Wrangler rather than committing them:

```sh
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_WEBHOOK_SECRET
```

## Telegram bot

The Telegram endpoint is `POST /api/telegram/webhook`. It requires Telegram's
`X-Telegram-Bot-Api-Secret-Token` header and responds only to `/start` messages in
private chats. The greeting follows the visitor's Telegram language (`en`, `ru`, or
`ka`, with English as the fallback). All other updates are acknowledged without a bot
response.

After the Worker is deployed, register its webhook once from a machine whose `.env`
contains `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_SECRET`:

```sh
npm run telegram:webhook:set -- https://example.com
```

Telegram stores this configuration and sends subsequent updates directly to the Worker.
Changing bot response code only requires another deploy. Run `setWebhook` again only
when the webhook URL, `TELEGRAM_WEBHOOK_SECRET`, or `allowed_updates` changes.

Pending updates are preserved by default. Discard them explicitly for a clean start:

```sh
npm run telegram:webhook:set -- https://example.com --drop-pending-updates
```

Inspect Telegram's stored webhook status or disable delivery with:

```sh
npm run telegram:webhook:info
npm run telegram:webhook:delete
```

`telegram:webhook:delete` also accepts `--drop-pending-updates` when the queued updates
should be discarded intentionally.

The external database is intentionally not provisioned by this project. Add a database
client and optionally Cloudflare Hyperdrive after the database connection strategy is
settled.
