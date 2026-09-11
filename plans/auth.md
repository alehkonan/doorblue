Нужно интегрировать аутентификацию в Door Blue.

### Текущий стек

- Cloudflare Workers
- Cloudflare D1
- Backend работает внутри Worker
- Не хочется поднимать отдельный auth-service без необходимости

### Решение

Использовать **Better Auth** непосредственно внутри Cloudflare Worker с хранением пользователей, сессий и связанных аккаунтов в D1.

Архитектура:

```text
Frontend
   │
   ▼
Cloudflare Worker
   ├── application API
   ├── Better Auth
   │    ├── password
   │    ├── Google OAuth
   │    ├── Telegram OIDC
   │    └── Passkey / WebAuthn
   └── D1
```

Отдельный auth microservice пока не нужен.

### Этап 1 — password authentication

Сначала реализовать:

- регистрация;
- login;
- logout;
- sessions;
- email verification;
- password reset.

Использовать стандартный `emailAndPassword` Better Auth.

Если нужен отдельный `username`, использовать официальный username plugin, но email всё равно хранить как основной идентификатор пользователя.

Пример общей конфигурации:

```ts
betterAuth({
  database: env.DB,

  emailAndPassword: {
    enabled: true,
  },

  plugins: [username()],
});
```

Auth routes держать внутри того же Worker, например:

```text
/api/auth/*
```

### Этап 2 — Google OAuth

Добавить Google как `socialProvider` Better Auth.

```ts
socialProviders: {
  google: {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  },
}
```

Важно использовать существующую модель Better Auth `user -> accounts`, чтобы password, Google, Telegram и passkey могли принадлежать одному пользователю.

### Этап 3 — Telegram

Использовать современный **Telegram OIDC Authorization Code Flow + PKCE**, а не старый Telegram Login Widget.

Telegram можно подключить через Better Auth Generic OAuth/OIDC.

Discovery endpoint:

```text
https://oauth.telegram.org/.well-known/openid-configuration
```

Пример:

```ts
genericOAuth({
  config: [
    {
      providerId: "telegram",
      clientId: env.TELEGRAM_CLIENT_ID,
      clientSecret: env.TELEGRAM_CLIENT_SECRET,
      discoveryUrl:
        "https://oauth.telegram.org/.well-known/openid-configuration",
      scopes: ["openid", "profile"],
    },
  ],
});
```

#### Важный нюанс Telegram

Telegram OIDC не предоставляет обычный `email` scope, тогда как Better Auth ориентируется на наличие email у `user`.

Поэтому на первом этапе Telegram лучше реализовать как:

```text
existing user
   ↓
Connect Telegram
   ↓
Telegram account linked to existing user
```

То есть не разрешать сразу создавать аккаунт только через Telegram.

Позже можно добавить самостоятельный Telegram signup через onboarding:

```text
Telegram login
   ↓
temporary user
   ↓
request email
   ↓
verify email
   ↓
complete account
```

Если потребуется, для внутреннего flow можно использовать стабильный placeholder email на `.invalid`, но пользователю потом нужно предложить указать реальный email.

### Этап 4 — Passkeys

После стабилизации обычной authentication добавить официальный Better Auth passkey plugin.

```ts
plugins: [passkey()];
```

Passkeys используют WebAuthn.

Перед их включением желательно уже иметь окончательный production domain, поскольку WebAuthn credentials связаны с RP ID/domain.

### Account linking

Нужно избегать автоматического объединения аккаунтов только по совпадению email без проверки.

Желаемая модель:

```text
User
 ├── credential/password account
 ├── Google account
 ├── Telegram account
 └── passkeys
```

Все способы входа должны вести к одной записи пользователя.

Особенно осторожно обрабатывать OAuth providers, которые могут не предоставлять подтверждённый email.

### Sessions

Использовать sessions Better Auth, а не самостоятельно реализованные JWT.

Для браузерного приложения предпочтительны secure HTTP-only cookies.

В production:

```text
Secure
HttpOnly
SameSite
HTTPS only
```

Если frontend и API находятся на разных subdomain, отдельно проверить cookie domain, SameSite и CORS настройки.

### Email

Better Auth не является email provider.

Для:

- verification email;
- password reset;
- security notifications

потребуется внешний transactional email provider.

### Cloudflare/D1

Better Auth можно запускать непосредственно в Workers и использовать D1 как database.

Нет необходимости создавать отдельный Node.js server.

Не менять password hashing без необходимости. Стандартный hashing Better Auth подходит для Workers и позволяет избежать проблем с Node-specific Argon2 implementations.

### Что не делать

Пока не писать собственную authentication систему.

Собственный auth быстро потребует реализации и аудита:

- password hashing;
- password reset;
- verification;
- session rotation;
- session revocation;
- CSRF;
- rate limiting;
- OAuth state;
- PKCE;
- OIDC validation;
- account linking;
- WebAuthn;
- recovery;
- token/key rotation.

Better Auth уже закрывает большую часть этой инфраструктуры, при этом данные остаются в собственной D1.

### Итоговое решение

Использовать:

```text
Cloudflare Worker
+
Better Auth
+
Cloudflare D1
```

Порядок внедрения:

```text
1. email/password + sessions
2. email verification / password reset
3. Google OAuth
4. Telegram account linking через OIDC
5. Telegram signup onboarding
6. Passkeys
```

Не выделять отдельный auth-service, пока не появится реальная архитектурная необходимость.
