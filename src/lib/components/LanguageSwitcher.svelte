<script lang="ts">
  import { localeOptions, type Locale } from "$lib/i18n";
  import { getI18n } from "$lib/i18n.svelte";

  const i18n = getI18n();

  let isOpen = $state(false);
  let activeIndex = $state(0);
  let root: HTMLDivElement;
  let trigger: HTMLButtonElement;

  function optionButtons() {
    return Array.from(
      root.querySelectorAll<HTMLButtonElement>("[role='menuitemradio']"),
    );
  }

  function openMenu(focusTarget: "current" | "first" | "last" = "current") {
    const currentIndex = localeOptions.findIndex(
      (option) => option.code === i18n.locale,
    );

    activeIndex =
      focusTarget === "first"
        ? 0
        : focusTarget === "last"
          ? localeOptions.length - 1
          : currentIndex;
    isOpen = true;
    queueMicrotask(() => optionButtons()[activeIndex]?.focus());
  }

  function closeMenu(restoreFocus = false) {
    isOpen = false;
    if (restoreFocus) queueMicrotask(() => trigger.focus());
  }

  function selectLocale(locale: Locale) {
    i18n.selectLocale(locale);
    closeMenu(true);
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu("first");
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu("last");
    }
  }

  function handleOptionKeydown(event: KeyboardEvent, index: number) {
    const buttons = optionButtons();
    let nextIndex: number | undefined;

    if (event.key === "ArrowDown") nextIndex = (index + 1) % buttons.length;
    if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + buttons.length) % buttons.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = buttons.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      activeIndex = nextIndex;
      buttons[nextIndex]?.focus();
    }
  }

  function handleDocumentClick(event: MouseEvent) {
    if (isOpen && !root.contains(event.target as Node)) closeMenu();
  }

  function handleDocumentKeydown(event: KeyboardEvent) {
    if (isOpen && event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
    }
  }

  function handleFocusOut(event: FocusEvent) {
    const nextTarget = event.relatedTarget as Node | null;
    if (isOpen && nextTarget && !root.contains(nextTarget)) closeMenu();
  }
</script>

<svelte:document
  onclick={handleDocumentClick}
  onkeydown={handleDocumentKeydown}
/>

<div class="language-switcher" bind:this={root} onfocusout={handleFocusOut}>
  <button
    class="language-trigger"
    type="button"
    bind:this={trigger}
    aria-label={`${i18n.messages.common.language.current}: ${localeOptions.find((option) => option.code === i18n.locale)?.name}. ${i18n.messages.common.language.label}`}
    aria-expanded={isOpen}
    aria-haspopup="menu"
    aria-controls="language-menu"
    onclick={() => (isOpen ? closeMenu() : openMenu())}
    onkeydown={handleTriggerKeydown}
  >
    {localeOptions.find((option) => option.code === i18n.locale)?.shortLabel}
    <span class="chevron" aria-hidden="true"></span>
  </button>

  {#if isOpen}
    <div
      id="language-menu"
      class="language-menu"
      role="menu"
      aria-label={i18n.messages.common.language.label}
    >
      {#each localeOptions as option, index (option.code)}
        <button
          type="button"
          role="menuitemradio"
          aria-checked={option.code === i18n.locale}
          class:current={option.code === i18n.locale}
          lang={option.code}
          tabindex={index === activeIndex ? 0 : -1}
          onclick={() => selectLocale(option.code)}
          onfocus={() => (activeIndex = index)}
          onkeydown={(event) => handleOptionKeydown(event, index)}
        >
          <span>{option.name}</span>
          <span class="short-label" aria-hidden="true">{option.shortLabel}</span
          >
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-switcher {
    position: relative;
    z-index: 10;
    flex: 0 0 auto;
  }

  button {
    color: inherit;
    font: inherit;
  }

  .language-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 4.2rem;
    min-height: 2.75rem;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--soft-slate-line);
    border-radius: 0.7rem;
    background: transparent;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    transition:
      border-color 180ms ease,
      background 180ms ease;
  }

  .language-trigger:hover,
  .language-trigger[aria-expanded="true"] {
    border-color: var(--accent-color);
    background: var(--apartment-blue-haze);
  }

  .chevron {
    width: 0.42rem;
    height: 0.42rem;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: translateY(-0.12rem) rotate(45deg);
    transition: transform 180ms ease;
  }

  .language-trigger[aria-expanded="true"] .chevron {
    transform: translateY(0.12rem) rotate(225deg);
  }

  .language-menu {
    position: absolute;
    top: calc(100% + 0.55rem);
    right: 0;
    width: min(12rem, calc(100vw - 2rem));
    padding: 0.4rem;
    border: 1px solid var(--soft-slate-line);
    border-radius: 0.7rem;
    background: var(--clean-white);
    box-shadow: 0 0.8rem 2rem rgb(48 74 100 / 16%);
  }

  .language-menu button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    min-height: 2.75rem;
    padding: 0.65rem 0.75rem;
    border: 0;
    border-radius: 0.5rem;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }

  .language-menu button:hover,
  .language-menu button:focus-visible,
  .language-menu button.current {
    background: var(--apartment-blue-haze);
  }

  .language-menu button.current {
    font-weight: 750;
  }

  .short-label {
    color: var(--secondary-text);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  @media (prefers-reduced-motion: reduce) {
    .language-trigger,
    .chevron {
      transition: none;
    }
  }
</style>
