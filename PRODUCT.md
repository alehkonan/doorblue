# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Door Blue Space primarily serves expats in Tbilisi. It also serves creative people who live in Tbilisi and travelers interested in the space.

Visitors need to understand what the space is for and find a reliable way to contact Door Blue Space for more information. In the future, visitors will also be able to book participation in planned events.

## Product Purpose

Door Blue Space is a public guide to a physical creative event space in Tbilisi. It explains the purpose and character of the space, helps visitors find it, and gives them ways to learn more or offer financial support.

Success means that a prospective visitor understands what Door Blue Space offers and can confidently contact it through the available public channel. Future success will also include discovering and booking planned events.

## Positioning

Door Blue Space is distinguished by a uniquely designed apartment that immerses visitors in an atmosphere of creativity. The physical environment is part of the experience, not merely a container for events.

## Operating Context

Door Blue Space is a physical place at 14 Luarsab Botsvadze Street, Tbilisi. Arrival requires specific directions: pass the construction site, use the Valeo entrance near the barrier, go to the fourth floor, turn right, and find the blue door.

The website is the public web guide for general information and donations. The Telegram channel is the confirmed contact and information channel for visitors. Planned event announcements currently live on Telegram.

Visitors may attend announced events without registering in advance. Weekday coworking is available from 10:00 to 18:00 by prior arrangement because the space may be rented during those hours. Renting the space also requires contacting Door Blue Space in advance.

## Capabilities and Constraints

- The current website explains the space, provides its address and arrival directions, links to Telegram, and provides donation information.
- The public website supports English, Russian, and Georgian. Russian and Georgian copy is initially draft translation pending native-speaker review.
- Event booking is a future capability and must not be presented as currently available.
- The initial website is static and does not use a database.
- Website event listings depend on future database-backed content.
- Attending an announced event does not require advance registration; this does not imply that every event is free.
- Weekday coworking runs from 10:00 to 18:00 by prior arrangement and is subject to the space’s rental availability.
- Space rental requires advance contact; no instant booking, public price, or availability claim is currently supported.
- The public term for the physical space is “place,” not “venue” or “location.”
- A person using the website or Telegram is a “visitor,” not a “user” in public-facing language.
- A future request to reserve a place at a planned event is a “booking.”

## Brand Commitments

The official public name is **Door Blue Space**.

The confirmed public identity centers on a creative space in Tbilisi and the distinctive blue door visitors use to find it. The existing Telegram channel is `https://t.me/doorbluespace`.

## Evidence on Hand

- Confirmed address and directions: `src/lib/data/site.ts`
- Confirmed Telegram channel and public source: `https://t.me/doorbluespace` and `https://t.me/s/doorbluespace`
- Confirmed logo source: the main channel picture on `https://t.me/s/doorbluespace`; future work may retrieve and adapt this asset but must not invent a replacement logo without approval.
- Donation details are supplied through the public `VITE_DONATION_ACCOUNT` and `VITE_DONATION_ACCOUNT_HOLDER` environment values.
- Current product copy and terminology: `CONTEXT.md` and `src/lib/data/site.ts`
- No testimonials, customer claims, benchmarks, press coverage, or case studies are present in the repository; future work must not fabricate them.

## Product Principles

1. **Make the place understandable.** Explain what Door Blue Space is for before asking a visitor to act.
2. **Translate atmosphere into useful context.** The creatively designed apartment is a core part of the experience, while practical information must remain clear.
3. **Make human contact easy.** Visitors should always have an obvious path to reliable, current information through Telegram.
4. **Respect the physical journey.** Preserve the exact address and unusual arrival directions wherever visit information appears.
5. **Present only current capabilities.** Clearly distinguish available information and donations from future event-listing and booking capabilities.
