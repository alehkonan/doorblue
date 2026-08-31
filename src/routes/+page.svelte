<script lang="ts">
  import { site } from "$lib/data/site";
</script>

<svelte:head>
  <title>{site.name} · Tbilisi</title>
  <meta name="description" content={site.description} />
</svelte:head>

<section class="hero">
  <h1>Creative space in Tbilisi</h1>
  <p class="lead">Films, music, workshops and community.</p>
</section>

<section class="location" aria-labelledby="location-title">
  <div>
    <p class="eyebrow">Our address</p>
    <h2 id="location-title">{site.address}</h2>
  </div>
  <p>{site.directions}</p>
</section>

<style>
  .hero {
    max-width: 52rem;
    padding: 4rem 0 6rem;
  }
  h1 {
    max-width: 48rem;
    margin: 0;
    font-size: clamp(3rem, 8vw, 6.5rem);
    line-height: 0.95;
  }
  h2 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1;
  }
  .lead {
    margin: 2rem 0;
    color: var(--accent-color);
    opacity: 0.7;
    font-size: 1.25rem;
  }
  .location {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem;
    padding: 4rem 0;
    border-top: 1px solid #dce2ec;
  }
  .location p {
    max-width: 34rem;
    margin: 0;
    color: var(--accent-color);
    opacity: 0.7;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  @media (max-width: 42rem) {
    .hero {
      padding-top: 1rem;
      padding-bottom: 2rem;
    }
    .location {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
