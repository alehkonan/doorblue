<script lang="ts">
  import { resolve } from "$app/paths";
  import { onDestroy } from "svelte";
  import { site } from "$lib/data/site";
  import { getI18n } from "$lib/i18n.svelte";

  type CopyField = "account" | "accountHolder";
  type CopyState = {
    field: CopyField;
    status: "success" | "error";
  };

  const i18n = getI18n();
  const account = import.meta.env.VITE_DONATION_ACCOUNT ?? "";
  const accountHolder = import.meta.env.VITE_DONATION_ACCOUNT_HOLDER ?? "";

  let copyState = $state<CopyState | null>(null);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  function clearCopyState(delay: number) {
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copyState = null), delay);
  }

  async function copyValue(value: string, field: CopyField) {
    try {
      await navigator.clipboard.writeText(value);
      copyState = { field, status: "success" };
      clearCopyState(1800);
    } catch {
      copyState = { field, status: "error" };
      clearCopyState(4000);
    }
  }

  function buttonLabel(field: CopyField) {
    if (copyState?.field !== field)
      return i18n.messages.donations.transfer.copy;
    return copyState.status === "success"
      ? i18n.messages.donations.transfer.copied
      : i18n.messages.donations.transfer.copyManually;
  }

  onDestroy(() => clearTimeout(copyTimer));
</script>

<svelte:head>
  <title>{i18n.messages.donations.metadata.title}</title>
  <meta
    name="description"
    content={i18n.messages.donations.metadata.description}
  />
</svelte:head>

<section class="hero" aria-labelledby="donations-title">
  <div class="hero-copy">
    <a class="back-link" href={resolve("/")}
      >{i18n.messages.donations.hero.backAction}</a
    >
    <h1 id="donations-title">{i18n.messages.donations.hero.title}</h1>
    <p>{i18n.messages.donations.hero.description}</p>
  </div>

  <div class="threshold" aria-hidden="true">
    <span class="threshold-note">{i18n.messages.donations.hero.note}</span>
    <div class="door-frame">
      <div class="door">
        <span>Door</span>
        <span>Blue</span>
        <span>Space</span>
        <i></i>
      </div>
    </div>
  </div>
</section>

<section class="transfer" aria-labelledby="transfer-title">
  <div class="transfer-heading">
    <h2 id="transfer-title">{i18n.messages.donations.transfer.title}</h2>
    <p>{i18n.messages.donations.transfer.instructions}</p>
  </div>

  <div class="transfer-body">
    {#if account && accountHolder}
      <div class="bank-details">
        <div class="bank-summary">
          <p>{i18n.messages.donations.transfer.bankName}</p>
          <p>{i18n.messages.donations.transfer.currency}</p>
        </div>

        <dl>
          <div class="detail-row">
            <dt>{i18n.messages.donations.transfer.accountLabel}</dt>
            <dd>
              <code>{account}</code>
              <button
                type="button"
                aria-label={i18n.messages.donations.transfer.copyAccountLabel}
                onclick={() => copyValue(account, "account")}
              >
                {buttonLabel("account")}
              </button>
            </dd>
          </div>

          <div class="detail-row">
            <dt>{i18n.messages.donations.transfer.accountHolderLabel}</dt>
            <dd>
              <span class="detail-value">{accountHolder}</span>
              <button
                type="button"
                aria-label={i18n.messages.donations.transfer
                  .copyAccountHolderLabel}
                onclick={() => copyValue(accountHolder, "accountHolder")}
              >
                {buttonLabel("accountHolder")}
              </button>
            </dd>
          </div>
        </dl>

        <p class="copy-status" aria-live="polite">
          {#if copyState?.status === "success"}
            {i18n.messages.donations.transfer.copiedStatus}
          {:else if copyState?.status === "error"}
            {i18n.messages.donations.transfer.copyError}
          {/if}
        </p>
      </div>

      <aside
        class="transfer-notes"
        aria-label={i18n.messages.donations.transfer.feesLabel}
      >
        <h3>{i18n.messages.donations.transfer.feesTitle}</h3>
        <p>{i18n.messages.donations.transfer.sameBankFee}</p>
        <p>{i18n.messages.donations.transfer.otherBankFee}</p>
      </aside>
    {:else}
      <div class="unavailable">
        <h3>{i18n.messages.donations.transfer.unavailableTitle}</h3>
        <p>{i18n.messages.donations.transfer.unavailableDescription}</p>
        <a href={site.links.contact} target="_blank" rel="external noreferrer"
          >{i18n.messages.donations.transfer.unavailableAction}</a
        >
      </div>
    {/if}
  </div>

  <div class="transfer-help">
    <p>{i18n.messages.donations.transfer.helpPrompt}</p>
    <a href={site.links.contact} target="_blank" rel="external noreferrer"
      >{i18n.messages.donations.transfer.helpAction}</a
    >
  </div>
</section>

<section class="support" aria-labelledby="support-title">
  <div class="support-heading">
    <h2 id="support-title">{i18n.messages.donations.support.title}</h2>
    <p>{i18n.messages.donations.support.description}</p>
  </div>

  <div class="support-uses">
    {#each i18n.messages.donations.support.items as item (item.title)}
      <article class="support-use">
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </article>
    {/each}
  </div>
</section>

<style>
  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }

  h1,
  h2,
  h3 {
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  h1 {
    max-width: 9ch;
    margin-bottom: 1.75rem;
    font-size: clamp(3.6rem, 8vw, 6rem);
    line-height: 0.9;
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: clamp(2.5rem, 5.5vw, 4.75rem);
    line-height: 0.94;
  }

  h3 {
    margin-bottom: 0.75rem;
    font-size: clamp(1.75rem, 3vw, 2.75rem);
    line-height: 1;
  }

  p {
    text-wrap: pretty;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(18rem, 5fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: stretch;
    min-height: clamp(38rem, calc(100svh - 5rem), 48rem);
    padding-block: clamp(3rem, 8vw, 6rem);
  }

  .hero-copy {
    min-width: 0;
    align-self: center;
    padding-block: 2rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
    color: var(--secondary-text);
    font-size: 0.9rem;
    font-weight: 700;
    text-underline-offset: 0.25em;
  }

  .back-link:hover {
    color: var(--accent-color);
  }

  .hero-copy p {
    max-width: 37rem;
    margin-bottom: 0;
    color: var(--secondary-text);
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    line-height: 1.55;
  }

  .threshold {
    position: relative;
    display: grid;
    grid-template-columns: 4.25rem minmax(0, 1fr);
    min-height: 32rem;
    padding: 1rem 1rem 0;
    background: var(--apartment-blue-haze);
    overflow: hidden;
  }

  .threshold-note {
    display: flex;
    align-items: center;
    padding-block: 0.5rem;
    color: var(--accent-color);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    writing-mode: vertical-rl;
  }

  .threshold-note::after {
    position: absolute;
    top: 2rem;
    bottom: 2rem;
    left: 3.2rem;
    width: 1px;
    background: var(--soft-slate-line);
    content: "";
  }

  .door-frame {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: clamp(1rem, 3vw, 2.5rem) clamp(0.5rem, 2vw, 1.5rem) 0;
    border: 1px solid var(--soft-slate-line);
    border-bottom: 0;
  }

  .door {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: min(100%, 17rem);
    height: 90%;
    min-height: 26rem;
    padding: 2rem;
    color: var(--clean-white);
    background: var(--accent-color);
    font-size: clamp(3.5rem, 8vw, 6rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.78;
    transform-origin: left center;
    transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hero:hover .door {
    transform: perspective(70rem) rotateY(-5deg);
  }

  .door i {
    position: absolute;
    top: 52%;
    right: 1.25rem;
    width: 0.65rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--clean-white);
  }

  .support {
    padding-block: clamp(5rem, 10vw, 9rem);
    border-top: 1px solid var(--soft-slate-line);
  }

  .support-heading {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(16rem, 5fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
    margin-bottom: clamp(4rem, 8vw, 7rem);
  }

  .support-heading h2 {
    max-width: 10ch;
    margin-bottom: 0;
  }

  .support-heading p {
    max-width: 34rem;
    margin-bottom: 0;
    color: var(--secondary-text);
    font-size: 1.1rem;
    line-height: 1.65;
  }

  .support-uses {
    border-bottom: 1px solid var(--accent-color);
  }

  .support-use {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(18rem, 7fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: baseline;
    padding-block: clamp(2rem, 5vw, 3.75rem);
    border-top: 1px solid var(--accent-color);
  }

  .support-use h3,
  .support-use p {
    margin-bottom: 0;
  }

  .support-use p {
    max-width: 36rem;
    color: var(--secondary-text);
    font-size: 1.05rem;
    line-height: 1.65;
  }

  .transfer {
    margin-inline: calc(-1 * var(--shell-gutter));
    padding: clamp(5rem, 10vw, 9rem) var(--shell-gutter) clamp(4rem, 8vw, 7rem);
    color: var(--clean-white);
    background: var(--night-threshold);
  }

  .transfer-heading,
  .transfer-body,
  .transfer-help {
    width: min(100%, calc(var(--shell-width) - 2 * var(--shell-gutter)));
    margin-inline: auto;
  }

  .transfer-heading {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(16rem, 5fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
    margin-bottom: clamp(4rem, 8vw, 7rem);
  }

  .transfer-heading h2 {
    max-width: 9ch;
    margin-bottom: 0;
  }

  .transfer-heading p {
    max-width: 34rem;
    margin-bottom: 0;
    color: var(--clean-white-62);
    font-size: 1.1rem;
    line-height: 1.65;
  }

  .transfer-body {
    display: grid;
    grid-template-columns: minmax(0, 8fr) minmax(16rem, 4fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: stretch;
  }

  .bank-details,
  .unavailable {
    padding: clamp(1.5rem, 4vw, 3rem);
    color: var(--accent-color);
    background: var(--cool-plaster);
  }

  .bank-summary {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    padding-bottom: clamp(2rem, 4vw, 3.5rem);
  }

  .bank-summary p {
    margin-bottom: 0;
  }

  .bank-summary p:first-child {
    font-size: clamp(1.75rem, 3vw, 2.75rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1;
  }

  .bank-summary p:last-child {
    color: var(--secondary-text);
    font-size: 0.85rem;
    font-weight: 800;
    text-align: right;
    text-transform: uppercase;
  }

  dl {
    margin: 0;
    border-bottom: 1px solid var(--accent-color);
  }

  .detail-row {
    padding-block: 1.4rem;
    border-top: 1px solid var(--accent-color);
  }

  dt {
    margin-bottom: 0.6rem;
    color: var(--secondary-text);
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  dd {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: center;
    margin: 0;
  }

  code,
  .detail-value {
    min-width: 0;
    color: var(--accent-color);
    font: inherit;
    font-size: clamp(1.05rem, 2vw, 1.35rem);
    font-weight: 700;
    line-height: 1.4;
    overflow-wrap: anywhere;
    user-select: all;
  }

  button {
    min-width: 6.5rem;
    min-height: 2.75rem;
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--accent-color);
    border-radius: 0.5rem;
    color: var(--accent-color);
    background: transparent;
    cursor: pointer;
    font: inherit;
    font-size: 0.85rem;
    font-weight: 800;
    transition:
      color 180ms ease,
      background 180ms ease;
  }

  button:hover {
    color: var(--clean-white);
    background: var(--accent-color);
  }

  .copy-status {
    min-height: 1.5rem;
    margin: 1rem 0 0;
    color: var(--secondary-text);
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .transfer-notes {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--accent-color);
    background: var(--apartment-blue-haze);
  }

  .transfer-notes h3,
  .unavailable h3 {
    font-size: clamp(1.75rem, 3vw, 2.75rem);
  }

  .transfer-notes p {
    margin-bottom: 0;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .transfer-notes p + p {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--soft-slate-line);
  }

  .unavailable {
    grid-column: 1 / -1;
  }

  .unavailable h3 {
    max-width: 18ch;
  }

  .unavailable p {
    max-width: 42rem;
    margin-bottom: 1.5rem;
    color: var(--secondary-text);
    font-size: 1.05rem;
    line-height: 1.65;
  }

  .unavailable a,
  .transfer-help a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    font-weight: 800;
  }

  .transfer-help {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-top: clamp(2.5rem, 5vw, 4rem);
    padding-top: 1.5rem;
    border-top: 1px solid var(--clean-white-24);
  }

  .transfer-help p {
    margin-bottom: 0;
    color: var(--clean-white-62);
  }

  .transfer :global(a:focus-visible) {
    outline-color: currentColor;
  }

  @media (max-width: 48rem) {
    h1 {
      max-width: 12ch;
      font-size: clamp(3.25rem, 17vw, 4.6rem);
    }

    :global(html[lang="ru"]) h1 {
      font-size: clamp(2.75rem, 14.25vw, 4.6rem);
    }

    h2 {
      font-size: clamp(2.5rem, 12vw, 3.75rem);
    }

    .hero,
    .support-heading,
    .support-use,
    .transfer-heading,
    .transfer-body {
      grid-template-columns: 1fr;
    }

    .hero {
      min-height: 0;
      padding-block: 2.25rem 2.75rem;
    }

    .hero-copy {
      padding-block: 0;
    }

    .threshold {
      display: none;
    }

    .transfer {
      padding-top: 1.5rem;
      padding-bottom: 3rem;
    }

    .transfer-heading {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }

    .support-heading,
    .transfer-heading {
      align-items: start;
    }

    .support-heading h2,
    .transfer-heading h2 {
      margin-bottom: 0;
    }

    .support-use {
      gap: 1rem;
    }

    .bank-summary {
      gap: 1rem;
    }

    .transfer-help {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  @media (max-width: 32rem) {
    .threshold {
      grid-template-columns: 3.25rem minmax(0, 1fr);
      min-height: 24rem;
      padding: 0.75rem 0.75rem 0;
    }

    .threshold-note::after {
      left: 2.45rem;
    }

    .door {
      min-height: 20rem;
      padding: 1.25rem;
    }

    .bank-details,
    .unavailable,
    .transfer-notes {
      padding: 1.25rem;
    }

    dd {
      grid-template-columns: 1fr;
    }

    button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .door,
    button {
      transition: none;
    }

    .hero:hover .door {
      transform: none;
    }
  }
</style>
