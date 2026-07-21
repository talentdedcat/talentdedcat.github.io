# Design System

## Direction

The page should feel like a carefully annotated semiconductor lab notebook translated into a contemporary web interface. It uses a rigorous grid, concise scientific labels, and a code-native chip-floorplan visual instead of stock photography or decorative illustration.

## Theme

Light theme. A researcher opens the page on a bright office monitor between reading papers, expecting immediate legibility, reliable links, and a calm surface that supports focused comparison.

## Color Strategy

Restrained, with tinted near-neutrals and two small functional accents.

- Canvas: warm mineral white, `oklch(0.975 0.006 95)`
- Surface: pale technical gray, `oklch(0.94 0.008 225)`
- Ink: carbon, `oklch(0.20 0.012 240)`
- Muted ink: `oklch(0.48 0.015 235)`
- Signal: controlled green, `oklch(0.58 0.13 158)`
- Conductor: muted copper, `oklch(0.62 0.10 55)`
- Rule: `oklch(0.84 0.012 225)`

Accent color should stay below roughly 12 percent of the visible surface. Green marks current research and interactive states; copper marks dates, awards, and publication metadata.

## Typography

- Display and interface: Sora, a geometric sans with compact technical forms.
- Reading text: Source Sans 3, optimized for long-form screen legibility.
- Data labels: Recursive Mono, used sparingly for years, DOI fragments, and figure annotations.

Headings use a clear modular scale without negative letter spacing. Body copy is capped near 70 characters per line.

## Layout

- A 12-column desktop grid becomes a single-column mobile flow.
- The first viewport pairs identity and research summary with an unframed chip-layout field.
- Publications use a chronological rail rather than repeated cards.
- Education and recognition form concise full-width bands below the publication record.
- Container widths remain consistent, with deliberate asymmetry inside the hero.

## Components

- Floating compact navigation with text links and icon-only theme or menu controls only when useful.
- Research tags rendered as plain inline taxonomy, not pill-heavy decoration.
- Publication entries with year, venue, title, author line, status, and direct links.
- Award callout integrated into the publication chronology, not isolated as a vanity metric.
- Footer with verified ORCID and DBLP links; GitHub and email appear only after real values are configured.

## Motion

Use one subtle page-load reveal and a slow signal-path movement in the hero diagram. Hover and focus transitions last 160-220 ms. Disable nonessential motion under `prefers-reduced-motion: reduce`.

## Responsive Behavior

At narrow widths, the visual moves below the identity block, chronology labels remain left-aligned, and publication actions wrap without truncating titles. Navigation collapses only if links cannot fit without overlap.

## Absolute Avoids

No gradient text, glass cards, nested cards, colored side stripes, fake citation counts, generic hero metrics, emoji icons, layout-shifting hover effects, or decorative scientific claims presented as data.
