# Stevezs-Style GitHub Pages Design

## Feature Summary

Redesign Shizhang Wang's academic homepage to closely follow the visual and
information hierarchy of `https://stevezs315.github.io/`, while preserving the
verified publication, affiliation, and award data already in the repository.
The finished site will be published as the account-level GitHub Pages site at
`https://talentdedcat.github.io/`.

## Primary User Action

A researcher should be able to identify Shizhang Wang's affiliation and
research focus, then scan publications and open the corresponding DOI or paper
without navigating to another page first.

## Confirmed Design Direction

- Production-ready, responsive academic homepage.
- Restrained light palette: charcoal navigation, cool gray page, white cards,
  blue academic links, and small green/gold metadata accents.
- Exact visual anchor: `stevezs315.github.io`, including its compact top bar,
  left profile card, right content column, rounded white panels, and dense
  publication rows.
- The user's supplied reference is the north-star visual, so generated visual
  probes and mockups are not needed.
- Type uses a fast-loading humanist sans stack. Typography remains compact and
  readable instead of adopting a marketing or editorial hero.

## Layout Strategy

Desktop uses a centered 1110-1160px shell. A 255px profile column remains
sticky beneath the navigation; an approximately 825px content column contains
About, Education and Awards, Updates, Research, and Publications panels.
Mobile collapses to one column, keeps the identity block first, and turns each
publication into an image-first row without horizontal scrolling.

## Image Requirements

- Use official Zhejiang University and Hubei University of Technology marks
  obtained from their institutional websites or visual-identity downloads.
- Each publication uses a representative architecture or workflow figure from
  the primary paper, not a generic cover image.
- Figures are cropped for legibility, exported as local WebP assets, and linked
  to a source record in `assets/SOURCES.md`.
- Below-fold paper images use `loading="lazy"`, fixed dimensions, meaningful
  alt text, and an object-fit treatment that never distorts diagrams.

## Content And Interaction

- Keep the verified bilingual name, Zhejiang University affiliation, Hubei
  University of Technology education record, research description, ORCID, and
  DBLP links.
- Keep five publications in reverse chronological order.
- Preserve topic filters and their accessible pressed state.
- Keep the ICCAD 2024 William J. McCalla Best Paper recognition visible in both
  the awards area and the relevant publication entry.
- No fabricated email, Scholar ID, CV, citation counts, positions, dates, or
  education details.

## States And Accessibility

- Static HTML contains all content if JavaScript is disabled.
- Filtered publication states announce the visible result count.
- Images have useful alternative text; institutional marks use institution
  names, while architecture figures describe the depicted system.
- Keyboard focus remains visible. Reduced motion and print styles remain
  supported. Mobile widths down to 320px must not overflow.
- If a source paper cannot legally or technically provide a figure, the site
  uses a neutral labeled diagram slot and records the limitation instead of
  inventing an image. This is a last resort, not the intended final state.

## Deployment

Create the public repository `talentdedcat/talentdedcat.github.io`, push the
verified `main` branch, and confirm the deployed Pages URL returns the expected
homepage. The local repository remains the maintainable source of truth.

## Open Questions

None. The GitHub account, repository name, visual reference, paper set,
institutional marks, and figure requirements are confirmed.
