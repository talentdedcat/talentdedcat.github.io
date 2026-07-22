# Design System

## Direction

The homepage follows the information rhythm of
[`stevezs315.github.io`](https://stevezs315.github.io/): a charcoal navigation
bar, compact identity sidebar, and a dense academic content column. The
implementation is original and uses verified research records and primary-paper
figures as its scientific visual material.

## Theme

Light theme with a cool gray page, white content surfaces, graphite text, and
small scientific accents. The interface should feel familiar to researchers
who scan academic homepages for affiliation, topics, awards, and papers.

## Color Strategy

- Page: cool technical gray, `oklch(0.965 0.004 240)`
- Card: near white, `oklch(0.995 0.002 240)`
- Ink: graphite, `oklch(0.22 0.018 255)`
- Muted text: `oklch(0.50 0.018 255)`
- Primary: scientific blue, `oklch(0.57 0.16 250)`
- Secondary: teal for institutional and invited-paper metadata
- Award: muted gold for the ICCAD Best Paper label

## Typography

- Headings and identity: Source Serif 4, with Georgia fallback.
- Interface and reading text: Inter, with Segoe UI fallback.
- Sizes are discrete and do not scale with viewport width.
- Body copy remains close to 70 characters per line on desktop.

## Layout

- Desktop: sticky 255px profile sidebar plus an approximately 825px content column.
- Main content: About, Education & Honors, Updates, Research, Publications.
- Mobile: one column; the profile card becomes a compact horizontal block.
- The supplied portrait uses a stable 2:3 desktop frame and a face-aware mobile crop.
- Institution marks come from official university sources; publication visuals
  show core architecture or workflow figures from the primary papers.

## Components

- Sticky top navigation with text destinations and a segmented language control.
- Profile card with a localized name, real portrait, affiliation, and verified ORCID/DBLP links.
- Flat content cards with 8px or smaller corner radii.
- Year-grouped update timeline.
- Research areas distinguished by blue, teal, and gold rules.
- Publication rows with optimized 8:5 architecture figures, metadata, authors,
  venue, award, and stable DOI/PDF links.
- Compact topic filters that progressively enhance the static paper list.

## Motion And Accessibility

Only short color and underline transitions are used. Keyboard focus is always
visible, reduced-motion preferences disable transitions, and print removes
navigation and the profile photograph. English is the default language; Chinese
interface copy is progressively applied without translating bibliographic
publication records. Layout supports widths down to 320px
without horizontal scrolling.

## Absolute Avoids

No fabricated email or Scholar profile, fake citation counts, gradients,
glass effects, nested cards, decorative images, negative letter spacing,
layout-shifting hover motion, or unverified academic claims.
