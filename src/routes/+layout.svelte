<script lang="ts">
  import { site } from "$lib/data/site";

  let { children } = $props();
</script>

<svelte:head>
  <meta name="theme-color" content="#172033" />
</svelte:head>

<header class="site-header">
  <a class="brand" href="/">{site.shortName}</a>
  <nav aria-label="Main navigation">
    <a href="/">About</a>
    <a href="/donations">Donations</a>
  </nav>
</header>

<div class="site-shell">
  {@render children()}
</div>

<footer class="site-footer">
  <p>{site.name} · Tbilisi</p>
  <a href={site.telegramUrl}>Follow on Telegram</a>
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(:root) {
    --accent-color: #102a43;
  }
  :global(body) {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    color: var(--accent-color);
    background: #f5f7fb;
  }
  :global(a) {
    color: inherit;
  }
  .site-header,
  .site-footer,
  .site-shell {
    max-width: 72rem;
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .brand {
    font-size: 1.25rem;
    font-weight: 800;
    text-decoration: none;
  }
  nav {
    display: flex;
    gap: 1.25rem;
    font-size: 0.95rem;
  }
  nav a {
    text-decoration: none;
  }
  nav a:hover,
  :global(.text-link:hover),
  .site-footer a:hover {
    text-decoration: underline;
  }
  .site-shell {
    min-height: calc(100vh - 9rem);
    padding-top: 3rem;
    padding-bottom: 5rem;
  }
  .site-footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 2rem;
    border-top: 1px solid #dce2ec;
    color: var(--accent-color);
    opacity: 0.7;
    font-size: 0.9rem;
  }
  .site-footer p {
    margin: 0;
  }
  .site-footer a {
    color: var(--accent-color);
  }
  :global(.eyebrow) {
    margin: 0 0 0.75rem;
    color: var(--accent-color);
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  :global(.button) {
    display: inline-block;
    padding: 0.8rem 1rem;
    border-radius: 0.7rem;
    color: white;
    background: var(--accent-color);
    text-decoration: none;
    font-weight: 700;
  }
  :global(.button.secondary) {
    color: var(--accent-color);
    background: #e3e9f5;
  }
  :global(.text-link) {
    font-weight: 700;
  }
  @media (max-width: 32rem) {
    .site-header,
    .site-footer {
      align-items: flex-start;
      flex-direction: column;
      padding-top: 1rem;
      padding-bottom: 1.25rem;
    }
    .site-header {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    .site-shell {
      padding-top: 1.5rem;
      padding-bottom: 2rem;
    }
    nav {
      flex-wrap: wrap;
    }
  }
</style>
