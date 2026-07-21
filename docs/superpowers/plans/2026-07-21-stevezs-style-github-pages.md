# Stevezs-Style GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a production-ready academic homepage at `https://talentdedcat.github.io/` with the supplied reference layout, official university marks, and primary-paper architecture figures.

**Architecture:** Keep the dependency-free static HTML/CSS/JavaScript stack. Store optimized visual assets locally, preserve complete no-JavaScript publication content, and use the existing data module only for filter metadata and validation.

**Tech Stack:** HTML5, CSS, browser JavaScript, Node built-in test runner, Poppler/PDF image tools, GitHub Pages.

---

### Task 1: Record the confirmed design and asset contract

**Files:**
- Create: `docs/superpowers/specs/2026-07-21-stevezs-style-github-pages-design.md`
- Create: `docs/superpowers/plans/2026-07-21-stevezs-style-github-pages.md`

- [x] **Step 1: Save the design specification**

Record the exact reference, deployment URL, verified content boundary, official
logo requirement, and primary-paper figure requirement.

- [x] **Step 2: Self-review the documents**

Run:

```bash
rg -n "TBD|TODO|implement later|fill in details" docs/superpowers/specs/2026-07-21-stevezs-style-github-pages-design.md docs/superpowers/plans/2026-07-21-stevezs-style-github-pages.md
```

Expected: no unresolved design or implementation placeholder.

- [x] **Step 3: Commit the design contract**

```bash
git add docs/superpowers/specs/2026-07-21-stevezs-style-github-pages-design.md docs/superpowers/plans/2026-07-21-stevezs-style-github-pages.md
git commit -m "docs: specify deployed academic homepage redesign"
```

### Task 2: Acquire and verify primary visual assets

**Files:**
- Create: `assets/institutions/zhejiang-university.png`
- Create: `assets/institutions/hubei-university-of-technology.png`
- Create: `assets/publications/zlibboost.webp`
- Create: `assets/publications/riscv-audio.webp`
- Create: `assets/publications/aspdac-library.webp`
- Create: `assets/publications/iccad-llm.webp`
- Create: `assets/publications/mlcad-subgraph.webp`
- Create: `assets/SOURCES.md`

- [x] **Step 1: Download official marks and primary papers**

Use Zhejiang University and Hubei University of Technology official identity
pages for marks. Use the ACM, J-STAGE, author-hosted ICCAD PDF, and author or
conference paper sources for publication figures.

- [x] **Step 2: Render and inspect paper pages**

Run `pdfinfo` and `pdftoppm -png -r 160` for each PDF. Inspect the rendered
pages and select the figure that best communicates the paper's architecture or
workflow rather than automatically selecting page one.

- [x] **Step 3: Crop and optimize figures**

Export each selected region as WebP with a stable 640px-wide canvas. Preserve
diagram labels and use white padding rather than cropping labels or legends.

- [x] **Step 4: Record provenance**

Add source URL, paper title, selected figure number or description, and access
date for all seven visual assets to `assets/SOURCES.md`.

- [x] **Step 5: Verify assets**

Run:

```bash
file assets/institutions/* assets/publications/*
du -h assets/institutions/* assets/publications/*
```

Expected: two readable PNG marks, five readable WebP figures, and no oversized
multi-megabyte web asset.

### Task 3: Test the deployed-layout content contract

**Files:**
- Modify: `tests/site.test.js`

- [x] **Step 1: Write failing structural and asset tests**

Require the charcoal navigation structure, profile portrait slot, two official
institution image paths, all five publication image paths, lazy loading,
descriptive alt text, source documentation, and the five stable scholarly
links.

- [x] **Step 2: Verify RED**

Run:

```bash
node --test tests/site.test.js
```

Expected: FAIL because official marks and publication figures are not yet
referenced by the page.

### Task 4: Implement the reference-aligned homepage

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Modify: `DESIGN.md`
- Modify: `README.md`

- [x] **Step 1: Recompose semantic HTML**

Build the compact charcoal header, sticky left profile card, About panel,
combined Education and Awards panel, year-grouped Updates panel, Research panel,
and image-led Publications panel. Keep all five papers in static HTML.

- [x] **Step 2: Attach official and paper images**

Use fixed `width` and `height`, meaningful `alt`, `decoding="async"`, and
`loading="lazy"` for publication images. Institution marks remain eager because
they are near the first viewport.

- [x] **Step 3: Match the reference visual system**

Use a 56px charcoal top bar, centered desktop shell, 255/825px column rhythm,
8px cards, light page gray, blue links, compact body type, and content-driven
responsive breakpoints. Preserve focus, reduced-motion, and print behavior.

- [x] **Step 4: Remove stale behavior**

Keep filtering and active navigation only. Do not add modal image viewers,
animations, client-side rendering, or build dependencies.

- [x] **Step 5: Verify GREEN**

Run:

```bash
node --test tests/*.test.js
git diff --check
```

Expected: all tests pass and whitespace validation exits zero.

### Task 5: Browser critique and responsive correction

**Files:**
- Modify as needed: `index.html`
- Modify as needed: `styles.css`

- [x] **Step 1: Inspect desktop against the reference**

Compare at 1280x720 and 1440x1000. Check the navigation height, column widths,
panel geometry, image legibility, paper density, and visible first-fold content.

- [x] **Step 2: Inspect tablet and mobile**

Check 768x1024 and 375x812. Require zero horizontal overflow, readable figure
labels, stable navigation, and no clipped title or author text.

- [x] **Step 3: Exercise publication filters**

Verify Hardware shows two publications, All restores five, focus remains
visible, and the console has no warnings or errors.

- [x] **Step 4: Apply one critique-and-fix pass**

Patch every material mismatch discovered in the first browser pass, then repeat
the affected screenshots and measurements.

### Task 6: Publish to account-level GitHub Pages

**Files:**
- Modify: Git remote configuration

- [ ] **Step 1: Create the public repository**

Create `talentdedcat/talentdedcat.github.io` through the authenticated GitHub
session without initializing it with a README, license, or `.gitignore`.

- [ ] **Step 2: Merge the verified feature branch to main**

Fast-forward or merge only after the full test suite passes. Re-run tests on
`main` before publishing.

- [ ] **Step 3: Add the remote and push**

```bash
git remote add origin git@github.com:talentdedcat/talentdedcat.github.io.git
git push -u origin main
```

Expected: push succeeds and the remote branch is `main`.

- [ ] **Step 4: Verify the deployed site**

Open `https://talentdedcat.github.io/`, wait for Pages deployment, and confirm
the title, five publications, seven visual assets, zero console errors, and zero
horizontal overflow at desktop and mobile widths.

- [ ] **Step 5: Commit any deployment documentation update**

If the live URL or deployment behavior differs from this plan, update README
with the verified values, commit, and push the final documentation change.
