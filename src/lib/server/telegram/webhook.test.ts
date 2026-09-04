import assert from "node:assert/strict";
import test from "node:test";

import { handleTelegramWebhook } from "./webhook.ts";

const webhookUrl = "https://doorblue.example/api/telegram/webhook";
const webhookSecret = "test-webhook-secret";
const botToken = "123456:test-bot-token";

function telegramRequest(update: unknown, secret = webhookSecret) {
  return new Request(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-telegram-bot-api-secret-token": secret,
    },
    body: JSON.stringify(update),
  });
}

test("a visitor can start the bot in Russian", async () => {
  const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
  const fetchTelegram: typeof fetch = async (input, init) => {
    calls.push({ input, init });
    return Response.json({ ok: true, result: { message_id: 1 } });
  };

  const response = await handleTelegramWebhook(
    telegramRequest({
      update_id: 42,
      message: {
        message_id: 7,
        from: { id: 100, is_bot: false, language_code: "ru" },
        chat: { id: 100, type: "private" },
        text: "/start campaign",
      },
    }),
    { botToken, webhookSecret, fetchTelegram },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0]?.input,
    `https://api.telegram.org/bot${botToken}/sendMessage`,
  );
  assert.equal(calls[0]?.init?.method, "POST");
  assert.deepEqual(JSON.parse(String(calls[0]?.init?.body)), {
    chat_id: 100,
    text: "Добро пожаловать в Door Blue Space 👋",
  });
});

test("the greeting follows the visitor's Telegram language", async () => {
  const cases = [
    ["ka", "კეთილი იყოს თქვენი მობრძანება Door Blue Space-ში 👋"],
    ["ru-RU", "Добро пожаловать в Door Blue Space 👋"],
    ["en", "Welcome to Door Blue Space 👋"],
    ["de", "Welcome to Door Blue Space 👋"],
    [undefined, "Welcome to Door Blue Space 👋"],
  ] as const;

  for (const [languageCode, expectedGreeting] of cases) {
    let sentBody: unknown;
    const fetchTelegram: typeof fetch = async (_input, init) => {
      sentBody = JSON.parse(String(init?.body));
      return Response.json({ ok: true, result: { message_id: 1 } });
    };

    const response = await handleTelegramWebhook(
      telegramRequest({
        update_id: 42,
        message: {
          message_id: 7,
          from: { id: 100, is_bot: false, language_code: languageCode },
          chat: { id: 100, type: "private" },
          text: "/start",
        },
      }),
      { botToken, webhookSecret, fetchTelegram },
    );

    assert.equal(response.status, 200);
    assert.deepEqual(sentBody, { chat_id: 100, text: expectedGreeting });
  }
});

test("updates outside private /start are acknowledged without a reply", async () => {
  const updates = [
    {
      update_id: 1,
      message: {
        from: { id: 100, is_bot: false },
        chat: { id: -100, type: "group" },
        text: "/start",
      },
    },
    {
      update_id: 2,
      message: {
        from: { id: 100, is_bot: false },
        chat: { id: 100, type: "private" },
        text: "/help",
      },
    },
    {
      update_id: 3,
      message: {
        from: { id: 100, is_bot: false },
        chat: { id: 100, type: "private" },
        text: "Hello",
      },
    },
    {
      update_id: 4,
      message: {
        from: { id: 100, is_bot: false },
        chat: { id: 100, type: "private" },
        sticker: { file_id: "sticker" },
      },
    },
    {
      update_id: 5,
      message: {
        from: { id: 200, is_bot: true },
        chat: { id: 200, type: "private" },
        text: "/start",
      },
    },
    { update_id: 6, callback_query: { id: "callback" } },
  ];
  let callCount = 0;
  const fetchTelegram: typeof fetch = async () => {
    callCount += 1;
    return Response.json({ ok: true });
  };

  for (const update of updates) {
    const response = await handleTelegramWebhook(telegramRequest(update), {
      botToken,
      webhookSecret,
      fetchTelegram,
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
  }

  assert.equal(callCount, 0);
});

test("the webhook fails closed when credentials are missing or invalid", async () => {
  const update = {
    update_id: 42,
    message: {
      from: { id: 100, is_bot: false, language_code: "en" },
      chat: { id: 100, type: "private" },
      text: "/start",
    },
  };
  let callCount = 0;
  const fetchTelegram: typeof fetch = async () => {
    callCount += 1;
    return Response.json({ ok: true });
  };

  const missingSecret = await handleTelegramWebhook(telegramRequest(update), {
    botToken,
    webhookSecret: undefined,
    fetchTelegram,
  });
  const missingToken = await handleTelegramWebhook(telegramRequest(update), {
    botToken: undefined,
    webhookSecret,
    fetchTelegram,
  });
  const invalidSecret = await handleTelegramWebhook(
    telegramRequest(update, "wrong-secret"),
    { botToken, webhookSecret, fetchTelegram },
  );

  assert.equal(missingSecret.status, 503);
  assert.equal(missingToken.status, 503);
  assert.equal(invalidSecret.status, 401);
  assert.equal(callCount, 0);
});

test("Telegram Bot API failures return 502 so Telegram can retry", async () => {
  const update = {
    update_id: 42,
    message: {
      from: { id: 100, is_bot: false, language_code: "en" },
      chat: { id: 100, type: "private" },
      text: "/start",
    },
  };
  const failures: Array<typeof fetch> = [
    async () => Response.json({ ok: false, description: "Bad Request" }),
    async () => Response.json({ error: "upstream failure" }, { status: 500 }),
    async () => {
      throw new Error("network failure");
    },
  ];

  for (const fetchTelegram of failures) {
    const response = await handleTelegramWebhook(telegramRequest(update), {
      botToken,
      webhookSecret,
      fetchTelegram,
    });

    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      error: "Telegram Bot API request failed",
    });
  }
});
