<script lang="ts">
  import { site } from "$lib/data/site";
  import { getI18n } from "$lib/i18n.svelte";

  const i18n = getI18n();
</script>

<svelte:head>
  <title>{i18n.messages.home.metadata.title}</title>
  <meta name="description" content={i18n.messages.home.metadata.description} />
</svelte:head>

<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <h1 id="hero-title">{i18n.messages.home.hero.title}</h1>
    <p class="hero-lead">{i18n.messages.home.hero.lead}</p>
    <div class="hero-actions">
      <a
        class="primary-action"
        href={site.telegramUrl}
        target="_blank"
        rel="noreferrer">{i18n.messages.home.hero.telegramAction}</a
      >
      <a class="quiet-action" href="#find-us"
        >{i18n.messages.home.hero.directionsAction}</a
      >
    </div>
    <p class="hero-note">{i18n.messages.home.hero.note}</p>
  </div>

  <div class="threshold" aria-hidden="true">
    <div class="threshold-route">
      {#each i18n.messages.home.hero.route as step}
        <span>{step}</span>
      {/each}
    </div>
    <div class="door-frame">
      <div class="door">
        <span class="door-number">14</span>
        <span class="door-handle"></span>
      </div>
    </div>
  </div>
</section>

<section id="events" class="events" aria-labelledby="events-title">
  <div class="events-intro">
    <h2 id="events-title">{i18n.messages.home.events.title}</h2>
    <p>{i18n.messages.home.events.description}</p>
  </div>
  <div class="events-action">
    <p>{i18n.messages.home.events.invitation}</p>
    <a href={site.telegramUrl} target="_blank" rel="noreferrer"
      >{i18n.messages.home.events.programmeAction}</a
    >
  </div>
</section>

<section id="use-space" class="uses" aria-labelledby="uses-title">
  <div class="uses-heading">
    <h2 id="uses-title">{i18n.messages.home.uses.title}</h2>
    <p>{i18n.messages.home.uses.description}</p>
  </div>

  <div class="use-rows">
    <article class="use-row">
      <div>
        <h3>{i18n.messages.home.uses.coworking.title}</h3>
        <p class="use-facts">{i18n.messages.home.uses.coworking.facts}</p>
      </div>
      <div>
        <p>{i18n.messages.home.uses.coworking.description}</p>
        <a href={site.telegramUrl} target="_blank" rel="noreferrer"
          >{i18n.messages.home.uses.coworking.action}</a
        >
      </div>
    </article>

    <article class="use-row">
      <div>
        <h3>{i18n.messages.home.uses.rental.title}</h3>
        <p class="use-facts">{i18n.messages.home.uses.rental.facts}</p>
      </div>
      <div>
        <p>{i18n.messages.home.uses.rental.description}</p>
        <a href={site.telegramUrl} target="_blank" rel="noreferrer"
          >{i18n.messages.home.uses.rental.action}</a
        >
      </div>
    </article>
  </div>
</section>

<section id="find-us" class="journey" aria-labelledby="journey-title">
  <div class="journey-heading">
    <h2 id="journey-title">{i18n.messages.home.journey.title}</h2>
    <p>{i18n.messages.home.journey.address}</p>
  </div>

  <div class="journey-body">
    <ol class="waypoints">
      {#each i18n.messages.home.journey.waypoints as waypoint, index}
        <li>
          <span class="waypoint-number" aria-hidden="true">{index + 1}</span>
          <span>{waypoint}</span>
        </li>
      {/each}
    </ol>

    <div class="arrival">
      <div class="arrival-door" aria-hidden="true">
        <span>Door</span>
        <span>Blue</span>
        <span>Space</span>
        <i></i>
      </div>
      <div class="arrival-copy">
        <p>{i18n.messages.home.journey.arrival}</p>
        <a href={site.telegramUrl} target="_blank" rel="noreferrer"
          >{i18n.messages.home.journey.helpAction}</a
        >
      </div>
    </div>
  </div>
</section>

<section class="closing" aria-labelledby="closing-title">
  <h2 id="closing-title">{i18n.messages.home.closing.title}</h2>
  <div class="closing-copy">
    <p>{i18n.messages.home.closing.description}</p>
    <div class="closing-actions">
      <a
        class="closing-primary"
        href={site.telegramUrl}
        target="_blank"
        rel="noreferrer">{i18n.messages.home.closing.contactAction}</a
      >
      <a href="/donations">{i18n.messages.home.closing.supportAction}</a>
    </div>
  </div>
</section>

<style>
  :global(body) {
    overflow-x: hidden;
  }

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
    max-width: 8ch;
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
    min-height: clamp(42rem, calc(100svh - 5rem), 50rem);
    padding-block: clamp(3rem, 8vw, 6rem);
  }

  .hero-copy {
    align-self: center;
    padding-block: 2rem;
  }

  .hero-lead {
    max-width: 36rem;
    margin-bottom: 2rem;
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    line-height: 1.55;
  }

  .hero-actions,
  .closing-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    align-items: center;
  }

  .primary-action,
  .closing-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.25rem;
    padding: 0.85rem 1.1rem;
    border: 1px solid var(--accent-color);
    border-radius: 0.7rem;
    color: var(--clean-white);
    background: var(--accent-color);
    font-weight: 800;
    text-decoration: none;
    transition:
      color 220ms ease,
      background 220ms ease;
  }

  .primary-action:hover,
  .closing-primary:hover {
    color: var(--accent-color);
    background: transparent;
  }

  .quiet-action,
  .events-action a,
  .use-row a,
  .arrival-copy a,
  .closing-actions > a:not(.closing-primary) {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    font-weight: 800;
  }

  .hero-note {
    max-width: 34rem;
    margin: 1.75rem 0 0;
    color: var(--secondary-text);
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .threshold {
    position: relative;
    display: grid;
    grid-template-columns: 4.5rem minmax(0, 1fr);
    min-height: 34rem;
    padding: 1rem;
    color: var(--clean-white);
    background: var(--apartment-blue-haze);
    overflow: hidden;
  }

  .threshold-route {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding-block: 0.5rem;
    color: var(--accent-color);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    writing-mode: vertical-rl;
  }

  .threshold-route::before {
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
    width: min(100%, 16rem);
    height: 88%;
    min-height: 26rem;
    color: var(--clean-white);
    background: var(--accent-color);
    transform-origin: left center;
    transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hero:has(.primary-action:hover) .door,
  .hero:has(.primary-action:focus-visible) .door {
    transform: perspective(70rem) rotateY(-7deg);
  }

  .door-number {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .door-handle,
  .arrival-door i {
    position: absolute;
    top: 52%;
    right: 1.25rem;
    width: 0.65rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--clean-white);
  }

  .events {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(16rem, 5fr);
    gap: clamp(2rem, 6vw, 6rem);
    padding-block: clamp(5rem, 10vw, 9rem);
    border-top: 1px solid var(--soft-slate-line);
  }

  .events-intro p,
  .uses-heading p {
    max-width: 34rem;
    margin-bottom: 0;
    color: var(--secondary-text);
    font-size: 1.1rem;
    line-height: 1.65;
  }

  .events-action {
    align-self: end;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--clean-white);
    background: var(--accent-color);
  }

  .events-action p {
    margin-bottom: 2.5rem;
    font-size: clamp(1.35rem, 2.5vw, 2rem);
    font-weight: 700;
    line-height: 1.15;
  }

  .events-action a {
    color: var(--clean-white);
  }

  .events-action a:focus-visible,
  .arrival-copy a:focus-visible,
  .closing :global(a:focus-visible) {
    outline-color: currentColor;
  }

  .uses {
    padding-block: clamp(5rem, 10vw, 9rem);
    border-top: 1px solid var(--soft-slate-line);
  }

  .uses-heading {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(16rem, 5fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
    margin-bottom: clamp(4rem, 8vw, 7rem);
  }

  .use-rows {
    border-bottom: 1px solid var(--accent-color);
  }

  .use-row {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(18rem, 7fr);
    gap: clamp(2rem, 6vw, 6rem);
    padding-block: clamp(2rem, 5vw, 4rem);
    border-top: 1px solid var(--accent-color);
  }

  .use-row > div:last-child {
    max-width: 38rem;
  }

  .use-row > div:last-child p {
    margin-bottom: 1.25rem;
    color: var(--secondary-text);
    font-size: 1.05rem;
    line-height: 1.65;
  }

  .use-facts {
    margin-bottom: 0;
    color: var(--secondary-text);
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .journey {
    margin-inline: calc(-1 * var(--shell-gutter));
    padding: clamp(5rem, 10vw, 9rem) var(--shell-gutter) 0;
    color: var(--clean-white);
    background: var(--night-threshold);
  }

  .journey-heading,
  .journey-body {
    width: min(100%, calc(var(--shell-width) - 2 * var(--shell-gutter)));
    margin-inline: auto;
  }

  .journey-heading {
    display: grid;
    grid-template-columns: minmax(0, 8fr) minmax(16rem, 4fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
    margin-bottom: clamp(4rem, 9vw, 7rem);
  }

  .journey-heading h2 {
    max-width: 10ch;
  }

  .journey-heading p {
    margin-bottom: 1.5rem;
    color: var(--soft-slate-line);
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .journey-body {
    display: grid;
    grid-template-columns: minmax(18rem, 5fr) minmax(0, 7fr);
    gap: clamp(3rem, 8vw, 8rem);
    align-items: stretch;
  }

  .waypoints {
    margin: 0 0 clamp(4rem, 9vw, 8rem);
    padding: 0;
    list-style: none;
    counter-reset: waypoint;
  }

  .waypoints li {
    position: relative;
    display: grid;
    grid-template-columns: 2.75rem 1fr;
    gap: 1rem;
    align-items: start;
    min-height: 5.5rem;
    padding-bottom: 1.5rem;
    font-size: clamp(1.05rem, 2vw, 1.35rem);
    line-height: 1.35;
  }

  .waypoints li:not(:last-child)::after {
    position: absolute;
    top: 2.75rem;
    bottom: 0;
    left: 1.35rem;
    width: 1px;
    background: var(--clean-white-38);
    content: "";
  }

  .waypoint-number {
    display: grid;
    place-items: center;
    width: 2.75rem;
    aspect-ratio: 1;
    border: 1px solid var(--clean-white-62);
    border-radius: 50%;
    font-size: 0.82rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .arrival {
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 42rem;
    background: var(--accent-color);
  }

  .arrival-door {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(2rem, 5vw, 4rem);
    border: 1px solid var(--clean-white-24);
    border-bottom: 0;
    font-size: clamp(3.5rem, 8vw, 6rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.78;
  }

  .arrival-door i {
    right: clamp(1.5rem, 4vw, 3rem);
    width: 0.8rem;
  }

  .arrival-copy {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    padding: 1.5rem clamp(1.5rem, 4vw, 3rem);
    border-top: 1px solid var(--clean-white-24);
  }

  .arrival-copy p {
    margin: 0;
    color: var(--soft-slate-line);
  }

  .arrival-copy a {
    justify-self: end;
    color: var(--clean-white);
    text-align: right;
  }

  .closing {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(16rem, 5fr);
    gap: clamp(2rem, 6vw, 6rem);
    padding-block: clamp(6rem, 12vw, 11rem);
  }

  .closing h2 {
    max-width: 10ch;
    margin-bottom: 0;
  }

  .closing-copy {
    align-self: end;
  }

  .closing-copy > p {
    max-width: 32rem;
    margin-bottom: 2rem;
    color: var(--secondary-text);
    font-size: 1.1rem;
    line-height: 1.65;
  }

  @media (max-width: 52rem) {
    .hero,
    .events,
    .uses-heading,
    .journey-heading,
    .journey-body,
    .closing {
      grid-template-columns: 1fr;
    }

    .hero {
      min-height: 0;
    }

    .hero-copy {
      padding-block: 1rem;
    }

    .threshold {
      min-height: 34rem;
    }

    .events-action {
      max-width: 36rem;
    }

    .use-row {
      grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
    }

    .journey-heading p {
      max-width: 28rem;
      margin-bottom: 0;
    }

    .arrival {
      min-height: 38rem;
    }

    .closing-copy {
      max-width: 38rem;
    }
  }

  @media (max-width: 38rem) {
    h1 {
      font-size: clamp(3.25rem, 17vw, 4.6rem);
    }

    h2 {
      font-size: clamp(2.5rem, 12vw, 3.75rem);
    }

    .hero {
      gap: 3rem;
      padding-block: 3rem 5rem;
    }

    .hero-actions,
    .closing-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .primary-action,
    .closing-primary,
    .quiet-action,
    .closing-actions > a:not(.closing-primary) {
      justify-content: center;
      width: 100%;
      text-align: center;
    }

    .threshold {
      grid-template-columns: 3.25rem minmax(0, 1fr);
      min-height: 30rem;
      padding: 0.75rem;
    }

    .threshold-route::before {
      left: 2.35rem;
    }

    .door {
      min-height: 23rem;
    }

    .events,
    .uses,
    .journey,
    .closing {
      padding-block-start: 5rem;
    }

    .use-row {
      grid-template-columns: 1fr;
      gap: 1.25rem;
      padding-block: 2.5rem;
    }

    .journey-body {
      gap: 1rem;
    }

    .arrival {
      min-height: 34rem;
    }

    .arrival-copy {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .arrival-copy a {
      justify-self: start;
      text-align: left;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .door,
    .primary-action,
    .closing-primary {
      transition: none;
    }
  }
</style>
