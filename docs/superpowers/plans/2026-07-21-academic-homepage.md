# Shizhang Wang Academic Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, accessible, no-build GitHub Pages site that presents Shizhang Wang's verified academic identity, research focus, award, and publications in reverse chronological order.

**Architecture:** The page ships as semantic static HTML with complete publication fallback content. A structured browser-compatible data file provides validation and filter metadata, while a small dependency-free script progressively enhances filtering, active navigation, and the code-native chip visual. Node's built-in test runner verifies bibliography integrity and interaction logic without introducing a package manager.

**Tech Stack:** HTML5, modern CSS, vanilla JavaScript, Node.js `node:test`, GitHub Pages, Playwright or the in-app browser for visual QA.

---

## File Structure

- `index.html`: metadata, semantic content, complete no-JavaScript publication list, research and education sections.
- `styles.css`: design tokens, layout, publication timeline, chip visual, accessibility, print, and responsive rules.
- `data/publications.js`: frozen verified bibliography records and filter categories.
- `script.js`: pure sorting/filtering helpers plus DOM progressive enhancement.
- `assets/favicon.svg`: routing-grid identity mark.
- `tests/publications.test.js`: bibliography identity, chronology, DOI, award, and exclusion tests.
- `tests/site.test.js`: static content, CSS guardrails, and interaction helper tests.
- `README.md`: preview, data maintenance, content placeholders, and GitHub Pages deployment.

### Task 1: Lock The Verified Bibliography

**Files:**
- Create: `tests/publications.test.js`
- Create: `data/publications.js`

- [ ] **Step 1: Write the failing bibliography tests**

Create `tests/publications.test.js` with Node's built-in runner. The test must require `../data/publications.js`, assert exactly five records, require years `[2026, 2026, 2025, 2024, 2024]`, check all five DOI URLs, verify the ICCAD award string, verify every record contains `Shizhang Wang`, and reject the quadrotor title.

```js
const test = require('node:test');
const assert = require('node:assert/strict');

const publications = require('../data/publications.js');

test('contains the five verified publications in reverse chronology', () => {
  assert.equal(publications.length, 5);
  assert.deepEqual(publications.map(({ year }) => year), [2026, 2026, 2025, 2024, 2024]);
});

test('uses the verified DOI set', () => {
  assert.deepEqual(new Set(publications.map(({ doi }) => doi)), new Set([
    'https://doi.org/10.1145/3747182',
    'https://doi.org/10.1587/elex.22.20250120',
    'https://doi.org/10.1145/3658617.3703638',
    'https://doi.org/10.1145/3676536.3676753',
    'https://doi.org/10.1109/MLCAD62225.2024.10740256',
  ]));
});

test('preserves authorship and the verified ICCAD award', () => {
  for (const publication of publications) {
    assert.ok(publication.authors.includes('Shizhang Wang'));
  }
  const iccad = publications.find(({ venueShort }) => venueShort === 'ICCAD');
  assert.equal(iccad.award, 'ACM/IEEE William J. McCalla ICCAD Best Paper Award, Front-End');
});

test('excludes the unrelated 2020 quadrotor record', () => {
  assert.ok(publications.every(({ title, year }) => year >= 2024 && !/quadrotor/i.test(title)));
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/publications.test.js`

Expected: FAIL with `MODULE_NOT_FOUND` for `data/publications.js`.

- [ ] **Step 3: Implement the publication data**

Create a CommonJS/browser-compatible array with these exact record IDs and metadata: `zlibboost`, `riscv-audio`, `aspdac-library`, `iccad-llm`, and `mlcad-subgraph`. Each record contains `id`, `year`, `title`, `authors`, `venue`, `venueShort`, `doi`, `links`, `topics`, and optional `award`. Assign it to `globalThis.PUBLICATIONS`, freeze records and the array, and export it when `module.exports` exists.

```js
(function exposePublications(global) {
  const records = [
    {
      id: 'zlibboost', year: 2026,
      title: 'ZlibBoost: An Efficient and Flexible Open-Source Framework for Standard Cell Characterization',
      authors: ['Zhengrui Chen', 'Chengjun Guo', 'Shizhang Wang', 'Guozhu Feng', 'Zixuan Song', 'Zhenhua Wu', 'Xunzhao Yin', 'Weiquan Song', 'Li Zhang', 'Zheyu Yan', 'Cheng Zhuo'],
      venue: 'ACM Transactions on Design Automation of Electronic Systems, 31(4), Article 74',
      venueShort: 'TODAES', doi: 'https://doi.org/10.1145/3747182',
      links: [{ label: 'DOI', url: 'https://doi.org/10.1145/3747182' }],
      topics: ['ai-eda'], award: '',
    },
    {
      id: 'riscv-audio', year: 2026,
      title: 'A High-Efficiency RISC-V Microprocessor Architecture Optimized for Audio Noise Suppression',
      authors: ['Hao Gao', 'Yifei Jin', 'Shizhang Wang', 'Boyan Duan', 'Boqu Zhang', 'Yue Zheng', 'Zhuo Yang', 'Li Zhang'],
      venue: 'IEICE Electronics Express, 23(2)', venueShort: 'ELEX',
      doi: 'https://doi.org/10.1587/elex.22.20250120',
      links: [{ label: 'DOI', url: 'https://doi.org/10.1587/elex.22.20250120' }],
      topics: ['hardware', 'low-power'], award: '',
    },
    {
      id: 'aspdac-library', year: 2025,
      title: 'Invited Paper: Boosting Standard Cell Library Characterization with Machine Learning',
      authors: ['Zhengrui Chen', 'Chengjun Guo', 'Zixuan Song', 'Guozhu Feng', 'Shizhang Wang', 'Li Zhang', 'Xunzhao Yin', 'Zhenhua Wu', 'Zheyu Yan', 'Cheng Zhuo'],
      venue: '30th Asia and South Pacific Design Automation Conference, pp. 385-391', venueShort: 'ASP-DAC',
      doi: 'https://doi.org/10.1145/3658617.3703638',
      links: [{ label: 'DOI', url: 'https://doi.org/10.1145/3658617.3703638' }],
      topics: ['ai-eda'], award: '',
    },
    {
      id: 'iccad-llm', year: 2024,
      title: 'An Agile Framework for Efficient LLM Accelerator Development and Model Inference',
      authors: ['Lvcheng Chen', 'Ying Wu', 'Chenyi Wen', 'Shizhang Wang', 'Li Zhang', 'Bei Yu', 'Qi Sun', 'Cheng Zhuo'],
      venue: '43rd IEEE/ACM International Conference on Computer-Aided Design, Article 200', venueShort: 'ICCAD',
      doi: 'https://doi.org/10.1145/3676536.3676753',
      links: [
        { label: 'DOI', url: 'https://doi.org/10.1145/3676536.3676753' },
        { label: 'Paper', url: 'https://www.cse.cuhk.edu.hk/~byu/papers/C234-ICCAD2024-BinaryLLM.pdf' },
      ],
      topics: ['ai-eda', 'hardware', 'low-power'],
      award: 'ACM/IEEE William J. McCalla ICCAD Best Paper Award, Front-End',
    },
    {
      id: 'mlcad-subgraph', year: 2024,
      title: 'Efficient Subgraph Matching Framework for Fast Subcircuit Identification',
      authors: ['Bohao Li', 'Shizhang Wang', 'Tinghuan Chen', 'Qi Sun', 'Cheng Zhuo'],
      venue: 'ACM/IEEE 6th Symposium on Machine Learning for CAD', venueShort: 'MLCAD',
      doi: 'https://doi.org/10.1109/MLCAD62225.2024.10740256',
      links: [{ label: 'DOI', url: 'https://doi.org/10.1109/MLCAD62225.2024.10740256' }],
      topics: ['ai-eda'], award: '',
    },
  ].map((record) => Object.freeze(record));

  const publications = Object.freeze(records);
  global.PUBLICATIONS = publications;
  if (typeof module !== 'undefined' && module.exports) module.exports = publications;
}(typeof globalThis !== 'undefined' ? globalThis : window));
```

- [ ] **Step 4: Run bibliography tests and verify GREEN**

Run: `node --test tests/publications.test.js`

Expected: 4 tests pass, 0 fail.

- [ ] **Step 5: Commit the bibliography slice**

```bash
git add data/publications.js tests/publications.test.js
git commit -m "feat: add verified publication data"
```

### Task 2: Build The No-JavaScript Academic Page

**Files:**
- Create: `tests/site.test.js`
- Create: `index.html`
- Create: `assets/favicon.svg`

- [ ] **Step 1: Write failing static content tests**

Create `tests/site.test.js`. Read `index.html` as text and assert the bilingual name, five publication IDs, required section anchors, ORCID, DBLP, best-paper wording, all DOI URLs, and absence of `quadrotor`, fake email links, and fake citation metrics.

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = () => fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('renders the verified identity and core sections', () => {
  const source = html();
  for (const value of ['Shizhang Wang', '王诗章', 'id="research"', 'id="publications"', 'id="recognition"', 'id="education"']) {
    assert.ok(source.includes(value), `missing ${value}`);
  }
});

test('ships all five publications without JavaScript', () => {
  const source = html();
  for (const id of ['zlibboost', 'riscv-audio', 'aspdac-library', 'iccad-llm', 'mlcad-subgraph']) {
    assert.ok(source.includes(`data-publication-id="${id}"`));
  }
  assert.equal((source.match(/data-publication-id=/g) || []).length, 5);
});

test('contains scholarly links and no unsupported claims', () => {
  const source = html();
  assert.ok(source.includes('https://orcid.org/0009-0005-5853-4931'));
  assert.ok(source.includes('https://dblp.org/pid/264/1048'));
  assert.ok(source.includes('William J. McCalla ICCAD Best Paper Award'));
  assert.doesNotMatch(source, /quadrotor|citation count|mailto:/i);
});
```

- [ ] **Step 2: Run static tests and verify RED**

Run: `node --test tests/site.test.js`

Expected: FAIL with `ENOENT` for `index.html`.

- [ ] **Step 3: Implement semantic HTML and fallback publications**

Create `index.html` with `header`, `main`, `section`, `article`, `nav`, and `footer`. Include skip navigation, a visible bilingual identity, the approved introduction, three research themes, five complete publication articles in reverse chronology, the award section, affiliation/education timeline, ORCID and DBLP links, and the hero chip diagram as decorative DOM elements inside a labelled `figure`. Load `data/publications.js` before deferred `script.js`.

Every external link must include `target="_blank" rel="noreferrer"`. Publication filter buttons use `data-filter="all|ai-eda|hardware|low-power"`, and the default page remains complete if scripts fail.

- [ ] **Step 4: Create the deterministic favicon**

Create `assets/favicon.svg` with a 32-by-32 viewBox, tinted near-black background, signal-green routing line, and copper contact nodes. Use no text and no embedded external resources.

- [ ] **Step 5: Run static tests and verify GREEN**

Run: `node --test tests/site.test.js`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 6: Commit the semantic page slice**

```bash
git add index.html assets/favicon.svg tests/site.test.js
git commit -m "feat: add semantic academic profile"
```

### Task 3: Add Tested Progressive Enhancement

**Files:**
- Modify: `tests/site.test.js`
- Create: `script.js`

- [ ] **Step 1: Write failing helper tests**

Add tests that require `../script.js` and assert `filterPublications(publications, 'all')` returns all five, `ai-eda` returns four, `hardware` returns two, `low-power` returns two, an unknown filter returns all five, and `sortPublications` returns descending years without mutating input.

```js
const publications = require('../data/publications.js');
const { filterPublications, sortPublications } = require('../script.js');

test('filters publications by known topic and fails open for unknown topics', () => {
  assert.equal(filterPublications(publications, 'all').length, 5);
  assert.equal(filterPublications(publications, 'ai-eda').length, 4);
  assert.equal(filterPublications(publications, 'hardware').length, 2);
  assert.equal(filterPublications(publications, 'low-power').length, 2);
  assert.equal(filterPublications(publications, 'unknown').length, 5);
});

test('sorts publications without mutating the source array', () => {
  const source = [{ year: 2024, id: 'b' }, { year: 2026, id: 'a' }];
  assert.deepEqual(sortPublications(source).map(({ year }) => year), [2026, 2024]);
  assert.deepEqual(source.map(({ year }) => year), [2024, 2026]);
});
```

- [ ] **Step 2: Run helper tests and verify RED**

Run: `node --test tests/site.test.js`

Expected: FAIL with `MODULE_NOT_FOUND` for `script.js`.

- [ ] **Step 3: Implement pure helpers and DOM enhancement**

Create a UMD-style closure that exports `filterPublications` and `sortPublications` under CommonJS and `globalThis.SiteApp` in browsers. On `DOMContentLoaded`, validate `PUBLICATIONS`, map record topics to existing publication elements, add filter-button pressed state and live result count, track active navigation using `IntersectionObserver`, and apply pointer position as CSS custom properties only when fine pointer and reduced motion is not requested.

Filtering must set the native `hidden` property on unmatched articles. Unknown filters must fail open to all records. If data is missing or malformed, return without altering the static page.

- [ ] **Step 4: Run all JavaScript tests and verify GREEN**

Run: `node --test tests/*.test.js`

Expected: 9 tests pass, 0 fail.

- [ ] **Step 5: Commit the interaction slice**

```bash
git add script.js tests/site.test.js
git commit -m "feat: add publication filtering"
```

### Task 4: Apply The Scientific Visual System

**Files:**
- Modify: `tests/site.test.js`
- Create: `styles.css`
- Modify: `index.html`

- [ ] **Step 1: Write failing CSS guardrail tests**

Read `styles.css` and assert it contains the approved OKLCH design tokens, focus-visible styling, reduced-motion rules, 375/768/1024 responsive coverage, publication timeline selectors, stable chip-figure aspect ratio, print styling, and no gradient text, backdrop filter, negative letter spacing, or colored side border wider than one pixel.

```js
test('implements the approved responsive and accessible CSS system', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  for (const rule of ['oklch(', ':focus-visible', 'prefers-reduced-motion', 'aspect-ratio', '@media print', '.publication']) {
    assert.ok(css.includes(rule), `missing ${rule}`);
  }
  assert.doesNotMatch(css, /background-clip\s*:\s*text|backdrop-filter|letter-spacing\s*:\s*-/i);
  assert.doesNotMatch(css, /border-(left|right)\s*:\s*[2-9]/i);
});
```

- [ ] **Step 2: Run CSS tests and verify RED**

Run: `node --test tests/site.test.js`

Expected: FAIL with `ENOENT` for `styles.css`.

- [ ] **Step 3: Implement the visual system**

Create `styles.css` with the tokens in `DESIGN.md`, discrete type sizes, a floating navigation with visible edge spacing, a 12-column asymmetric hero, an unframed 4:3 chip visualization, three unframed research themes, a full-width chronological publication rail, integrated award band, affiliation timeline, keyboard focus, hover feedback without transforms, reduced-motion overrides, and print rules.

Use maximum radius 8 pixels, no nested cards, no viewport-scaled font sizes, no negative letter spacing, and no horizontal overflow. Use system fallbacks behind Sora, Source Sans 3, and Recursive Mono.

- [ ] **Step 4: Connect the stylesheet and font preconnects**

Add the stylesheet link and Google Fonts stylesheet to `index.html`, with `preconnect` for `fonts.googleapis.com` and `fonts.gstatic.com`. Preserve usable system fallbacks if fonts fail.

- [ ] **Step 5: Run all tests and verify GREEN**

Run: `node --test tests/*.test.js`

Expected: all tests pass, 0 fail.

- [ ] **Step 6: Commit the visual slice**

```bash
git add styles.css index.html tests/site.test.js
git commit -m "feat: style scientific academic homepage"
```

### Task 5: Document, Serve, And Verify

**Files:**
- Create: `README.md`
- Modify: `docs/superpowers/plans/2026-07-21-academic-homepage.md`

- [ ] **Step 1: Write README requirements test**

Extend `tests/site.test.js` to require local preview commands, GitHub Pages publishing steps, publication-edit instructions, and explicit notes for adding GitHub, email, CV, Scholar, portrait, and exact Zhejiang program details.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/site.test.js`

Expected: FAIL with `ENOENT` for `README.md`.

- [ ] **Step 3: Write the maintenance and deployment guide**

Create `README.md` with `python3 -m http.server 4173`, the local URL, GitHub repository naming and Pages configuration, the two-file publication update rule, optional content insertion points, source provenance, and all test commands.

- [ ] **Step 4: Run automated verification**

Run: `node --test tests/*.test.js`

Expected: all tests pass, 0 fail.

Run: `git diff --check`

Expected: no output and exit 0.

- [ ] **Step 5: Start the static server**

Run: `python3 -m http.server 4173`

Expected: site available at `http://127.0.0.1:4173/`.

- [ ] **Step 6: Run browser verification**

Capture and inspect screenshots at 375x812, 768x1024, 1440x1000, and 1920x1080. Verify the hero visual is nonblank, the next section is hinted in the first viewport, filters work and update the live count, all text remains inside its container, no elements overlap, no horizontal scroll appears, focus is visible, external links are valid, and reduced-motion mode removes nonessential movement.

- [ ] **Step 7: Mark plan complete and commit**

Update every completed checkbox in this plan, then run:

```bash
git add README.md tests/site.test.js docs/superpowers/plans/2026-07-21-academic-homepage.md
git commit -m "docs: add homepage deployment guide"
```

Expected: clean worktree after the commit.
