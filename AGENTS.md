# Technical stack

- Build the application with Svelte 5, SvelteKit 2, TypeScript, and Vite. Follow the existing Svelte 5 runes and event-attribute conventions.
- Use SvelteKit filesystem routing under `src/routes` and shared modules under `src/lib`; prefer existing `$lib` imports and project patterns over new abstractions.
- Deploy to Cloudflare Workers with `@sveltejs/adapter-cloudflare` and Wrangler. Keep server code compatible with the Cloudflare runtime; use Node-only APIs only when they are supported by the configured `nodejs_compat` flag.
- Use Node.js 24 and npm. Treat `package-lock.json` as the dependency source of truth and prefer existing dependencies before adding packages.
- Style components with scoped Svelte CSS and the shared custom properties defined by the root layout. The project does not use Tailwind or a component framework.
- Public UI supports English, Russian, and Georgian through the existing `$lib/i18n` implementation. When changing public copy, update every locale and verify layouts with the longest translations.

# Development workflow

- The development server runs at `http://localhost:4015`.
- Before browser or UI verification that needs the server, probe that URL and reuse the existing server when it is reachable.
- If the URL is unreachable, report that result and offer to start the development server on port `4015`; start it only after the user agrees.
- Run `npm run check` for Svelte and TypeScript diagnostics. Run `npm run build` when validating production or Cloudflare-related changes.
- Use Conventional Commits for commit messages and split unrelated changes into separate commits by feature or concern.
