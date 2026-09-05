<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { onMount, type Snippet } from "svelte";
  import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
  import { site } from "$lib/data/site";
  import { I18nState, setI18n } from "$lib/i18n.svelte";
  import type { Locale } from "$lib/i18n";

  interface Props {
    data: { locale: Locale };
    children: Snippet;
  }

  let { data, children }: Props = $props();

  const i18n = new I18nState(() => data.locale);
  const isDonationsPage = $derived(page.url.pathname === "/donations");

  setI18n(i18n);
  onMount(() => i18n.syncFromBrowser());
</script>

<svelte:head>
  <meta name="theme-color" content="#355f91" />
</svelte:head>

<header class="site-header">
  <a
    class="brand"
    href={resolve("/")}
    aria-label={i18n.messages.common.navigation.brandHomeLabel}>{site.name}</a
  >
  <nav
    class="primary-navigation"
    aria-label={i18n.messages.common.navigation.mainLabel}
  >
    <div class="section-navigation">
      <a href={resolve("/#events")}>{i18n.messages.common.navigation.events}</a>
      <a href={resolve("/#use-space")}
        >{i18n.messages.common.navigation.useSpace}</a
      >
      <a href={resolve("/#find-us")}>{i18n.messages.common.navigation.findUs}</a
      >
    </div>
    <a
      class="support-link"
      class:current={isDonationsPage}
      href={resolve("/donations")}
      aria-current={isDonationsPage ? "page" : undefined}
      >{i18n.messages.common.navigation.supportUs}</a
    >
  </nav>
  <LanguageSwitcher />
</header>

<main class="site-shell">
  {@render children()}
</main>

<footer class="site-footer">
  <p>{site.name} · {i18n.messages.common.footer.city}</p>
  <nav
    class="social-links"
    aria-label={i18n.messages.common.footer.socialLinksLabel}
  >
    <a href={site.links.instagram} target="_blank" rel="external me noreferrer"
      >{i18n.messages.common.footer.instagramLink}</a
    >
    <a
      href={site.links.announcements}
      target="_blank"
      rel="external me noreferrer"
      >{i18n.messages.common.footer.telegramAnnouncementsLink}</a
    >
  </nav>
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(:root) {
    --accent-color: #355f91;
    --night-threshold: #304a64;
    --cool-plaster: #f8f1e6;
    --apartment-blue-haze: #e8d8c5;
    --quiet-periwinkle: #d9b995;
    --soft-slate-line: #cdbdaa;
    --clean-white: #fff9ef;
    --clean-white-24: rgb(255 249 239 / 24%);
    --clean-white-38: rgb(255 249 239 / 38%);
    --clean-white-62: rgb(255 249 239 / 62%);
    --secondary-text: #526a76;
    --foliage-muted: #677a78;
    --shell-width: 72rem;
    --shell-gutter: 1.5rem;
  }

  :global(html) {
    scroll-behavior: smooth;
    scrollbar-color: var(--accent-color) var(--cool-plaster);
  }

  :global(body) {
    margin: 0;
    color: var(--accent-color);
    background: var(--cool-plaster);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    line-height: 1.5;
    text-rendering: optimizeLegibility;
  }

  :global(::selection) {
    color: var(--clean-white);
    background: var(--accent-color);
  }

  :global(a) {
    color: inherit;
    text-underline-offset: 0.22em;
    text-decoration-thickness: 0.08em;
  }

  :global(a:focus-visible),
  :global(button:focus-visible) {
    outline: 3px solid var(--accent-color);
    outline-offset: 4px;
  }

  .site-header,
  .site-footer,
  .site-shell {
    width: min(100%, var(--shell-width));
    margin: 0 auto;
    padding-inline: var(--shell-gutter);
  }

  .site-header {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 2rem;
    min-height: 5rem;
    border-bottom: 1px solid var(--soft-slate-line);
  }

  .brand {
    flex: 0 0 auto;
    padding-block: 0.65rem;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-decoration: none;
  }

  .primary-navigation,
  .section-navigation,
  .social-links {
    display: flex;
    align-items: center;
  }

  .primary-navigation {
    justify-content: flex-end;
    gap: 1rem;
    font-size: 0.9rem;
  }

  .section-navigation {
    gap: 0.35rem;
  }

  .primary-navigation a,
  .site-footer a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
  }

  .primary-navigation a {
    padding-inline: 0.65rem;
    text-decoration: none;
  }

  .primary-navigation .support-link {
    min-height: 2.5rem;
    padding-inline: 0.9rem;
    border: 1px solid var(--accent-color);
    border-radius: 0.7rem;
    font-weight: 750;
    transition:
      color 180ms ease,
      background 180ms ease;
  }

  .primary-navigation .support-link:hover,
  .primary-navigation .support-link.current {
    color: var(--clean-white);
    background: var(--accent-color);
    text-decoration: none;
  }

  .primary-navigation a:hover,
  .site-footer a:hover,
  :global(.text-link:hover) {
    text-decoration: underline;
  }

  .site-shell {
    min-height: calc(100svh - 12rem);
  }

  .site-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    min-height: 7rem;
    border-top: 1px solid var(--soft-slate-line);
    font-size: 0.9rem;
  }

  .site-footer p {
    margin: 0;
  }

  .social-links {
    justify-content: flex-end;
    gap: 1.5rem;
  }

  .site-footer a {
    font-weight: 700;
  }

  :global(.button) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.8rem 1rem;
    border-radius: 0.7rem;
    color: var(--clean-white);
    background: var(--accent-color);
    text-decoration: none;
    font-weight: 700;
  }

  :global(.button.secondary) {
    color: var(--accent-color);
    background: var(--quiet-periwinkle);
  }

  :global(.text-link) {
    font-weight: 700;
  }

  @media (max-width: 64rem) {
    .site-header {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0.35rem 1rem;
      padding-block: 0.75rem;
    }

    .primary-navigation {
      grid-column: 1 / -1;
      grid-row: 2;
      justify-content: flex-start;
      gap: 0.65rem;
      width: calc(100% + 1.3rem);
      margin-inline: -0.65rem;
      padding-inline: 0.65rem;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .primary-navigation::-webkit-scrollbar {
      display: none;
    }

    .section-navigation,
    .primary-navigation a {
      flex: 0 0 auto;
      white-space: nowrap;
    }
  }

  @media (max-width: 32rem) {
    :global(:root) {
      --shell-gutter: 1rem;
    }

    .site-footer {
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      gap: 0.25rem;
      padding-block: 1.25rem;
    }

    .social-links {
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 0 1.25rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }
  }
</style>
