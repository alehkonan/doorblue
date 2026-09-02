declare global {
  interface Env {
    ASSETS: Fetcher;
    TELEGRAM_BOT_TOKEN?: string;
    TELEGRAM_WEBHOOK_SECRET?: string;
  }

  namespace App {
    interface Locals {
      locale: import("$lib/i18n").Locale;
    }

    interface Platform {
      env: Env;
      cf?: IncomingRequestCfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};
