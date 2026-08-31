<script lang="ts">
  import { site } from "$lib/data/site";

  type CopyField = "account" | "accountHolder";
  const account = import.meta.env.VITE_DONATION_ACCOUNT ?? "";
  const accountHolder = import.meta.env.VITE_DONATION_ACCOUNT_HOLDER ?? "";
  let copiedField = $state<CopyField | null>(null);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function copyValue(value: string, field: CopyField) {
    try {
      await navigator.clipboard.writeText(value);
      copiedField = field;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copiedField = null), 1000);
    } catch {
      copiedField = null;
    }
  }
</script>

<svelte:head>
  <title>Donations · {site.name}</title>
  <meta name="description" content="Support Door Blue Space." />
</svelte:head>

<section class="page-intro">
  <h1>Support us</h1>
</section>

<section class="donation-box" aria-labelledby="bank-title">
  <h2 id="bank-title">For donations</h2>
  {#if account && accountHolder}
    <dl>
      <div>
        <dt>Account</dt>
        <dd>
          <code>{account}</code>
          <span class="copy-control">
            <button type="button" onclick={() => copyValue(account, "account")}
              >Copy</button
            >
            {#if copiedField === "account"}<span class="tooltip" role="status"
                >Copied</span
              >{/if}
          </span>
        </dd>
      </div>
      <div>
        <dt>Account holder</dt>
        <dd>
          {accountHolder}
          <span class="copy-control">
            <button
              type="button"
              onclick={() => copyValue(accountHolder, "accountHolder")}
              >Copy</button
            >
            {#if copiedField === "accountHolder"}<span
                class="tooltip"
                role="status">Copied</span
              >{/if}
          </span>
        </dd>
      </div>
    </dl>
  {:else}
    <p>Donation details are not configured yet.</p>
  {/if}
</section>

<style>
  .page-intro {
    padding: 3rem 0 4rem;
  }
  h1 {
    margin: 0;
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 0.95;
  }
  h2 {
    margin: 0 0 1.5rem;
    font-size: clamp(2rem, 4vw, 3rem);
  }
  .donation-box {
    max-width: 48rem;
    padding: 2rem;
    border-radius: 1rem;
    color: var(--accent-color);
    background: #e8eef7;
  }
  dl {
    margin: 0;
  }
  dl div {
    padding: 1rem 0;
    border-top: 1px solid rgb(16 42 67 / 25%);
  }
  dt {
    margin-bottom: 0.35rem;
    font-size: 0.85rem;
    opacity: 0.7;
  }
  dd {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
    font-weight: 700;
    overflow-wrap: anywhere;
  }
  .copy-control {
    position: relative;
    display: inline-flex;
  }
  button {
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--accent-color);
    border-radius: 0.5rem;
    color: var(--accent-color);
    background: transparent;
    cursor: pointer;
    font: inherit;
    font-size: 0.85rem;
  }
  button:hover {
    color: white;
    background: var(--accent-color);
  }
  .tooltip {
    position: absolute;
    right: 0;
    bottom: calc(100% + 0.5rem);
    z-index: 1;
    padding: 0.45rem 0.6rem;
    border-radius: 0.4rem;
    color: white;
    background: var(--accent-color);
    font-size: 0.8rem;
    white-space: nowrap;
  }
  @media (max-width: 42rem) {
    .page-intro {
      padding-top: 1rem;
      padding-bottom: 2rem;
    }
    .donation-box {
      padding: 1rem;
    }
  }
</style>
