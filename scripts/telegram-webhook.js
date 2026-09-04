import { resolve } from "node:path";
import { loadEnvFile } from "node:process";
import { parseArgs } from "node:util";

const envFilePath = resolve(import.meta.dirname, "..", ".env");
const telegramApiBaseUrl = "https://api.telegram.org/bot";
const webhookPath = "/api/telegram/webhook";
const allowedUpdates = ["message"];
const cliOptions = {
  "drop-pending-updates": { type: "boolean", default: false },
  help: { type: "boolean", short: "h", default: false },
};
const usage = `Usage:
  npm run telegram:webhook:set -- https://example.com [--drop-pending-updates]
  npm run telegram:webhook:info
  npm run telegram:webhook:delete -- [--drop-pending-updates]

Options:
  -h, --help               Show this help
  --drop-pending-updates   Discard queued updates when setting or deleting the webhook`;

try {
  const { values, positionals } = parseArgs({
    options: cliOptions,
    allowPositionals: true,
    strict: true,
  });
  const [command, ...args] = positionals;

  if (!command || command === "help" || values.help) {
    console.log(usage);
  } else {
    try {
      loadEnvFile(envFilePath);
    } catch (error) {
      if (!isRecord(error) || error.code !== "ENOENT") {
        throw error;
      }
    }

    const token = requireEnvironment("TELEGRAM_BOT_TOKEN");
    const dropPendingUpdates = values["drop-pending-updates"];

    switch (command) {
      case "set":
        await setWebhook(token, args, dropPendingUpdates);
        break;
      case "info":
        await showWebhookInfo(token, args, dropPendingUpdates);
        break;
      case "delete":
        await deleteWebhook(token, args, dropPendingUpdates);
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  }
} catch (error) {
  console.error(
    error instanceof Error ? error.message : "Telegram webhook command failed.",
  );
  process.exitCode = 1;
}

async function setWebhook(token, args, dropPendingUpdates) {
  if (args.length !== 1) {
    throw new Error(
      "Usage: npm run telegram:webhook:set -- https://example.com [--drop-pending-updates]",
    );
  }

  const secret = requireEnvironment("TELEGRAM_WEBHOOK_SECRET");
  validateWebhookSecret(secret);
  const url = webhookUrlFromBaseUrl(args[0]);

  await callTelegram(token, "setWebhook", {
    url,
    secret_token: secret,
    allowed_updates: allowedUpdates,
    drop_pending_updates: dropPendingUpdates,
  });

  console.log(`Telegram webhook set to ${url}`);
  console.log(`Allowed updates: ${allowedUpdates.join(", ")}`);
  console.log(`Pending updates dropped: ${dropPendingUpdates ? "yes" : "no"}`);
}

async function showWebhookInfo(token, args, dropPendingUpdates) {
  if (dropPendingUpdates || args.length !== 0) {
    throw new Error("Usage: npm run telegram:webhook:info");
  }

  const result = await callTelegram(token, "getWebhookInfo");
  const safeInfo = {
    url: result.url,
    pending_update_count: result.pending_update_count,
    last_error_date: result.last_error_date
      ? new Date(result.last_error_date * 1000).toISOString()
      : undefined,
    last_error_message: result.last_error_message,
    max_connections: result.max_connections,
    allowed_updates: result.allowed_updates,
  };

  console.log(JSON.stringify(safeInfo, null, 2));
}

async function deleteWebhook(token, args, dropPendingUpdates) {
  if (args.length !== 0) {
    throw new Error(
      "Usage: npm run telegram:webhook:delete -- [--drop-pending-updates]",
    );
  }

  await callTelegram(token, "deleteWebhook", {
    drop_pending_updates: dropPendingUpdates,
  });

  console.log("Telegram webhook deleted.");
  console.log(`Pending updates dropped: ${dropPendingUpdates ? "yes" : "no"}`);
}

async function callTelegram(token, method, parameters = {}) {
  let response;
  try {
    response = await fetch(`${telegramApiBaseUrl}${token}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parameters),
    });
  } catch {
    throw new Error(`Telegram ${method} request failed.`);
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(`Telegram ${method} returned an invalid response.`);
  }

  if (!response.ok || !isRecord(body) || body.ok !== true) {
    const description =
      isRecord(body) && typeof body.description === "string"
        ? `: ${body.description}`
        : ".";
    throw new Error(`Telegram ${method} failed${description}`);
  }

  return body.result;
}

function webhookUrlFromBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("The webhook base URL must be a valid absolute URL.");
  }

  if (url.protocol !== "https:") {
    throw new Error("The webhook base URL must use HTTPS.");
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error(
      "The webhook base URL cannot contain credentials, a query, or a hash.",
    );
  }

  if (url.pathname !== "/") {
    throw new Error("Pass the site base URL without a path.");
  }

  if (url.port && !["443", "80", "88", "8443"].includes(url.port)) {
    throw new Error("Telegram webhooks support ports 443, 80, 88, and 8443.");
  }

  url.pathname = webhookPath;
  return url.toString();
}

function validateWebhookSecret(secret) {
  if (!/^[A-Za-z0-9_-]{1,256}$/.test(secret)) {
    throw new Error(
      "TELEGRAM_WEBHOOK_SECRET must be 1-256 characters using only A-Z, a-z, 0-9, _ and -.",
    );
  }
}

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `${name} is not set. Add it to .env or the process environment.`,
    );
  }

  return value;
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object";
}
