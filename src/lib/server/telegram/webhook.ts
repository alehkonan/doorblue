export interface TelegramWebhookConfig {
  botToken: string | undefined;
  webhookSecret: string | undefined;
  fetchTelegram?: typeof fetch;
}

const greetings = {
  en: "Welcome to Door Blue Space 👋",
  ru: "Добро пожаловать в Door Blue Space 👋",
  ka: "კეთილი იყოს თქვენი მობრძანება Door Blue Space-ში 👋",
} as const;

interface TelegramMessageUpdate {
  update_id: number;
  message: {
    from?: {
      is_bot?: boolean;
      language_code?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
  };
}

function jsonResponse(body: object, status = 200) {
  return Response.json(body, { status });
}

function isTelegramMessageUpdate(
  value: unknown,
): value is TelegramMessageUpdate {
  if (!value || typeof value !== "object") return false;

  const message = Reflect.get(value, "message");
  if (!message || typeof message !== "object") return false;

  const chat = Reflect.get(message, "chat");
  return (
    Boolean(chat) &&
    typeof chat === "object" &&
    typeof Reflect.get(chat, "id") === "number" &&
    typeof Reflect.get(chat, "type") === "string"
  );
}

export async function handleTelegramWebhook(
  request: Request,
  config: TelegramWebhookConfig,
): Promise<Response> {
  if (!config.webhookSecret || !config.botToken) {
    return jsonResponse({ error: "Telegram webhook is not configured" }, 503);
  }

  if (
    request.headers.get("x-telegram-bot-api-secret-token") !==
    config.webhookSecret
  ) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  let update: unknown;
  try {
    update = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  if (!isTelegramMessageUpdate(update)) {
    return jsonResponse({ ok: true });
  }

  const { message } = update;
  const command = message.text?.trim().split(/\s+/, 1)[0]?.split("@", 1)[0];
  if (
    message.chat.type !== "private" ||
    message.from?.is_bot ||
    command !== "/start"
  ) {
    return jsonResponse({ ok: true });
  }

  const language = message.from?.language_code
    ?.trim()
    .toLowerCase()
    .split(/[-_]/, 1)[0];
  const text =
    language === "ru" || language === "ka" ? greetings[language] : greetings.en;
  const fetchTelegram = config.fetchTelegram ?? fetch;
  let telegramResponse: Response;

  try {
    telegramResponse = await fetchTelegram(
      `https://api.telegram.org/bot${config.botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: message.chat.id, text }),
      },
    );
  } catch {
    return jsonResponse({ error: "Telegram Bot API request failed" }, 502);
  }

  if (!telegramResponse.ok) {
    return jsonResponse({ error: "Telegram Bot API request failed" }, 502);
  }

  try {
    const result: unknown = await telegramResponse.json();
    if (
      !result ||
      typeof result !== "object" ||
      Reflect.get(result, "ok") !== true
    ) {
      return jsonResponse({ error: "Telegram Bot API request failed" }, 502);
    }
  } catch {
    return jsonResponse({ error: "Telegram Bot API request failed" }, 502);
  }

  return jsonResponse({ ok: true });
}
