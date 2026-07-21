# Design System

## Direction

The homepage follows the proven information architecture of
`luost26/academic-homepage`: a compact identity sidebar and a denser academic
content column. The implementation is original and intentionally quieter,
using verified research records as the primary visual material.

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

- Desktop: sticky 16rem profile sidebar plus a flexible content column.
- Main content: About, Education & Honors, Updates, Research, Publications.
- Mobile: one column; the profile card becomes a compact horizontal block.
- The portrait and publication image positions are deliberately blank until
  real, authorized images are supplied.

## Components

- Sticky top navigation with text destinations.
- Profile card with bilingual name, affiliation, and verified ORCID/DBLP links.
- Flat content cards with 8px or smaller corner radii.
- Year-grouped update timeline.
- Research areas distinguished by blue, teal, and gold rules.
- Publication rows with blank 4:3 image slots, metadata, authors, venue, award,
  and stable DOI/PDF links.
- Compact topic filters that progressively enhance the static paper list.

## Motion And Accessibility

Only short color and underline transitions are used. Keyboard focus is always
visible, reduced-motion preferences disable transitions, and print removes
navigation and blank image positions. Layout supports widths down to 320px
without horizontal scrolling.

## Absolute Avoids

No fabricated email or Scholar profile, fake citation counts, gradients,
glass effects, nested cards, decorative images, negative letter spacing,
layout-shifting hover motion, or unverified academic claims.
