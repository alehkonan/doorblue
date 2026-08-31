# Doorblue

Doorblue is a public guide to the Doorblue event space in Tbilisi. It helps visitors understand the place, discover planned events, and find how to support the space; Telegram offers the same visitor-facing capabilities as the website.

## Public experience

**Place**:
The Doorblue physical event space in Tbilisi.
_Avoid_: Venue, location (when referring to Doorblue itself)

**Visitor**:
A person who uses the website or Telegram bot to learn about Doorblue, support it, or discover events.
_Avoid_: User (when referring to a person in the public domain)

**General information**:
The public description of Doorblue, including what the place is, where it is, and how to visit or contact it.
_Avoid_: Home content, landing page content

**Donation**:
A way for a visitor to financially support Doorblue.
_Avoid_: Booking, payment (unless referring to a concrete payment flow)

## Events

**Planned event**:
An event that Doorblue intends to hold and makes visible to visitors, including its schedule and public details.
_Avoid_: Listing, activity, appointment

**Event details**:
The public information describing a planned event, such as its title, description, date, time, and participation information.
_Avoid_: Event metadata

**Booking**:
A visitor's request to reserve a place at a planned event. Booking is a future capability and is not part of the initial static experience.
_Avoid_: Registration, reservation (unless the product later deliberately distinguishes them)

## Channels

**Website**:
The public web channel for general information, donations, and planned events.
_Avoid_: Frontend (when discussing the visitor experience)

**Telegram bot**:
The Telegram channel that provides the same public information and event discovery capabilities as the website, and will later support booking.
_Avoid_: Telegram webhook (the webhook is only the technical delivery mechanism)

## Current scope

- The initial website is static and does not use a database.
- The initial website starts with the general information page.
- A separate public page exists for donations.
- Event announcements currently live in the Telegram channel; website event listings may be added when database-backed content is introduced.
- The first release uses English; English, Russian and Georgian will be supported in the future.
- Images, advanced SEO and booking are intentionally deferred while this placeholder site is being built.
- Telegram integration is initially a delivery and presentation concern; its visitor-facing behavior should remain aligned with the website as capabilities are added.
- Expected traffic is approximately 100 website visits per day.
