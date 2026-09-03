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

Local Worker runtime:

```sh
npm run build
npx wrangler dev
```

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

The initial Telegram endpoint is `POST /api/telegram/webhook`. It validates Telegram's
`X-Telegram-Bot-Api-Secret-Token` header when `TELEGRAM_WEBHOOK_SECRET` is configured,
acknowledges the update, and leaves bot processing for the next slice.

The external database is intentionally not provisioned by this project. Add a database
client and optionally Cloudflare Hyperdrive after the database connection strategy is
settled.
