# Shizhang Wang Academic Homepage Design

## Summary

Build a production-ready, no-build static academic homepage for Shizhang Wang (王诗章). The site will present a concise research profile, verified publications in reverse chronological order, the ACM/IEEE William J. McCalla ICCAD 2024 Best Paper Award, education and affiliation context, and durable scholarly links. It must deploy directly through GitHub Pages and remain easy to update without a framework.

## Audience And Primary Outcome

Faculty, EDA researchers, graduate students, conference attendees, and potential collaborators should be able to answer four questions quickly:

1. Who is Shizhang Wang?
2. What problems does he work on?
3. Which peer-reviewed papers and awards establish the record?
4. Where can the original papers and scholarly profiles be found?

The most important action is opening a publication DOI, paper PDF, DBLP record, or ORCID profile after scanning the research through-line.

## Content Voice

The profile will use factual first-person academic English with a bilingual name lockup. Proposed introduction:

> I am an early-career researcher working at the intersection of artificial intelligence and electronic design automation. My research focuses on AI for EDA, efficient hardware design, and low-power optimization, with particular interest in making chip design and accelerator development faster, more reliable, and more energy-efficient. I have contributed to peer-reviewed work published at ICCAD, ASP-DAC, MLCAD, ACM TODAES, and IEICE Electronics Express. Our work on agile LLM accelerator development received the ACM/IEEE William J. McCalla ICCAD 2024 Best Paper Award in the Front-End category.

The copy avoids unsupported claims about citation counts, author rank, degree status, or current role. Contact email and GitHub links are omitted from the public interface until the author supplies real values; `README.md` documents where to add them.

## Verified Identity

- Display name: Shizhang Wang
- Chinese name: 王诗章
- ORCID: `0009-0005-5853-4931`
- Public ORCID employment record: Zhejiang University
- Undergraduate evidence: Hubei University of Technology, Integrated Circuit Design and Integrated Systems
- DBLP profile: `https://dblp.org/pid/264/1048`

The 2020 quadrotor paper currently merged into the same DBLP profile will be excluded because its topic, coauthor graph, and publication date do not align with the verified identity chain.

## Publication Record

Display the following entries in descending publication year. Highlight `Shizhang Wang` in every author list.

### 2026

1. **ZlibBoost: An Efficient and Flexible Open-Source Framework for Standard Cell Characterization**
   - Venue: ACM Transactions on Design Automation of Electronic Systems, Volume 31, Issue 4, Article 74
   - DOI: `https://doi.org/10.1145/3747182`
   - Affiliation evidence: Zhejiang University in ACM metadata
   - Research label: Standard-cell characterization, AI for EDA

2. **A High-Efficiency RISC-V Microprocessor Architecture Optimized for Audio Noise Suppression**
   - Venue: IEICE Electronics Express, Volume 23, Issue 2
   - DOI: `https://doi.org/10.1587/elex.22.20250120`
   - Affiliation evidence: Hubei University of Technology in J-STAGE metadata
   - Research label: RISC-V, low-power optimization

### 2025

3. **Invited Paper: Boosting Standard Cell Library Characterization with Machine Learning**
   - Venue: ASP-DAC 2025, pages 385-391
   - DOI: `https://doi.org/10.1145/3658617.3703638`
   - Affiliation evidence: Zhejiang University in the official ASP-DAC program and Crossref metadata
   - Research label: Machine learning, library characterization

### 2024

4. **An Agile Framework for Efficient LLM Accelerator Development and Model Inference**
   - Venue: ICCAD 2024, Article 200, pages 1-9
   - DOI: `https://doi.org/10.1145/3676536.3676753`
   - Open paper: `https://www.cse.cuhk.edu.hk/~byu/papers/C234-ICCAD2024-BinaryLLM.pdf`
   - Award: ACM/IEEE William J. McCalla ICCAD Best Paper Award, Front-End category
   - Affiliation evidence: Hubei University of Technology in the paper metadata
   - Research label: LLM acceleration, design-space exploration

5. **Efficient Subgraph Matching Framework for Fast Subcircuit Identification**
   - Venue: ACM/IEEE MLCAD 2024
   - DOI: `https://doi.org/10.1109/MLCAD62225.2024.10740256`
   - DBLP: `https://dblp.org/rec/conf/mlcad/LiWC0Z24`
   - Research label: Graph matching, subcircuit identification

## Information Architecture

1. Compact floating navigation: About, Research, Publications, Recognition, Education.
2. First viewport: bilingual identity, role line, introduction, scholarly links, and an unframed interactive chip-floorplan visual.
3. Research focus: three connected themes, AI for EDA, low-power optimization, and efficient hardware systems.
4. Publications: reverse-chronological timeline with venue, authors, tags, award status, DOI, and paper links.
5. Recognition: the ICCAD 2024 award presented with its exact official name and paper association.
6. Education and affiliation: Hubei University of Technology followed by Zhejiang University, with conservative wording where degree status is not public.
7. Footer: verified ORCID and DBLP links, with GitHub and email included only when configured.

## Visual Direction

Use a restrained light theme that resembles an annotated semiconductor lab notebook rather than a generic academic template. A researcher reads it on a bright office monitor while comparing papers, so hierarchy and contrast take priority over atmosphere.

- Canvas: warm mineral white.
- Ink: carbon with high contrast.
- Signal green: interactive states and current research paths.
- Muted copper: years, venues, and award annotations.
- Typography: Sora for interface and headlines, Source Sans 3 for reading, Recursive Mono only for data labels.
- Layout: asymmetric 12-column hero, strict baseline rhythm, and a chronological publication rail.
- Graphic: deterministic HTML/CSS/SVG-like DOM composition representing a chip floorplan, routing paths, and standard-cell regions. It is explicitly decorative, carries accessible alternative text, and contains no fake performance data.

No gradient text, glassmorphism, large-radius card grids, fake citations, neon cyberpunk styling, emoji icons, or side-stripe accents.

## Interaction Model

- Navigation scrolls to anchored sections and updates the visible state without hiding content.
- Publication filters allow All, AI for EDA, Hardware, and Low Power, while the default shows the complete chronological record.
- External links open in a new tab with clear accessible labels.
- The hero visual responds subtly to pointer position on precise devices and remains static for touch or reduced-motion users.
- Copy-email is disabled until a real email address is supplied; no dead action is presented as functional.

## Key States

- Default: all verified publications visible in reverse chronology.
- Filtered: only matching publications visible, with an accessible live result count.
- No JavaScript: all content remains readable and all links work; filtering and visual motion are progressive enhancements.
- Reduced motion: entrance and pointer-following effects disabled.
- Narrow viewport: single-column hero, wrapped actions, compact navigation, and no horizontal overflow.
- Missing contact data: GitHub and email are omitted from the interface and documented as optional configuration in `README.md`.

## Architecture

- `index.html`: semantic page structure and metadata.
- `styles.css`: design tokens, responsive layout, motion, and print styles.
- `script.js`: publication rendering/filtering, active navigation, and optional hero motion.
- `data/publications.js`: readable structured publication data available without a fetch request.
- `assets/favicon.svg`: deterministic project mark derived from routing geometry.
- `README.md`: local preview, content editing, and GitHub Pages deployment instructions.

No package manager, framework, CDN JavaScript, analytics, backend, or runtime API is required. Google Fonts may be loaded with system-font fallbacks; content must remain usable if font loading fails.

## Error Handling And Integrity

- Structured data validation runs in the browser during development and fails soft by preserving static fallback markup.
- Links use DOI URLs or stable institutional/DBLP records.
- Future unverified papers remain outside the published data until their author and affiliation records are checked.
- The site never fabricates citations, positions, dates, or current availability.

## Verification

1. Automated HTML and link checks for required headings, DOI URLs, chronological order, and exclusion of the 2020 paper.
2. JavaScript tests for filtering and publication ordering.
3. Keyboard and semantic checks for navigation, focus states, live-region behavior, and link labels.
4. Browser screenshots at 375x812, 768x1024, 1440x1000, and a wide desktop viewport.
5. Visual inspection for overlap, clipping, empty hero graphics, horizontal scroll, and reduced-motion behavior.
6. Static-server smoke test and GitHub Pages-compatible path validation.

## Optional Content To Configure Later

- GitHub username and profile URL
- Public email address
- Optional portrait or laboratory image
- Exact current program and degree title at Zhejiang University
- Optional CV PDF and Google Scholar profile

These optional fields must be documented in `README.md`, omitted from the interface while unavailable, and must not block publishing the verified core profile.
