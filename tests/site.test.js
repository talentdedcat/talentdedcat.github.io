const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const readProjectFile = (file) =>
  fs.readFileSync(path.join(root, file), 'utf8');
const publications = require('../data/publications.js');
const { filterPublications, sortPublications } = require('../script.js');

test('renders the verified identity and core sections', () => {
  const source = readProjectFile('index.html');
  for (const value of [
    'Shizhang Wang',
    'id="research"',
    'id="publications"',
    'id="recognition"',
    'id="education"',
  ]) {
    assert.ok(source.includes(value), `missing ${value}`);
  }
});

test('uses a tightly cropped ZJU emblem', () => {
  const source = readProjectFile('index.html');
  const zjuMark = fs.readFileSync(
    path.join(root, 'assets/institutions/zhejiang-university.png'),
  );
  const width = zjuMark.readUInt32BE(16);
  const height = zjuMark.readUInt32BE(20);

  assert.equal(width, height, 'ZJU emblem asset should be square');
  assert.ok(width >= 320, 'ZJU emblem should retain enough source resolution');
  assert.doesNotMatch(source, /accelerate conventional EDA workflows/i);
  assert.doesNotMatch(source, /with the goal of making chip design/i);
});

test('keeps the AI-for-EDA research summary concise', () => {
  const source = readProjectFile('index.html');

  assert.ok(source.includes('Machine learning for cell characterization.'));
  assert.doesNotMatch(source, /circuit understanding|design-space exploration/i);
});

test('ships an English-only default view with bilingual controls', () => {
  const source = readProjectFile('index.html');

  assert.doesNotMatch(source, /[\u3400-\u9fff]/u);
  assert.match(source, /data-language="en"[^>]*aria-pressed="true"/);
  assert.match(source, /data-language="zh"[^>]*aria-pressed="false"/);
  assert.ok(source.includes('data-i18n="profile.name"'));
  assert.ok(source.includes('data-i18n="about.body1"'));
  assert.ok(source.includes('data-i18n-aria-label="language.label"'));
});

test('keeps verified publication records outside the translation layer', () => {
  const source = readProjectFile('index.html');
  const publicationList = source.match(
    /<div class="publication-list">([\s\S]*?)<\/section>/,
  )?.[1] ?? '';

  assert.ok(publicationList.includes(
    'ZlibBoost: An Efficient and Flexible Open-Source Framework',
  ));
  assert.ok(publicationList.includes(
    'An Agile Framework for Efficient LLM Accelerator Development',
  ));
  assert.doesNotMatch(publicationList, /<h3[^>]*data-i18n/);
  assert.doesNotMatch(publicationList, /class="authors"[^>]*data-i18n/);
  assert.doesNotMatch(publicationList, /class="venue"[^>]*data-i18n/);
});

test('uses the refined research and profile copy', () => {
  const source = readProjectFile('index.html').replace(/\s+/g, ' ');

  assert.ok(source.includes(
    'Processor architecture optimization and accelerator design.',
  ));
  assert.ok(source.includes('I study AI for EDA and low-power optimization.'));
  assert.doesNotMatch(
    source,
    /Agile accelerator and processor design for language models/i,
  );
});

test('uses the approved reference layout and real visual assets', () => {
  const source = readProjectFile('index.html');
  for (const value of [
    'class="page-grid"',
    'class="profile-card"',
    'class="profile-photo"',
    'class="content-card about-card"',
    'id="updates"',
    'class="publication-figure"',
    'assets/institutions/zhejiang-university.png',
    'assets/institutions/hubei-university-of-technology.png',
    'assets/publications/zlibboost.webp',
    'assets/publications/riscv-audio.webp',
    'assets/publications/aspdac-library.webp',
    'assets/publications/iccad-llm.webp',
    'assets/publications/mlcad-subgraph.webp',
  ]) {
    assert.ok(source.includes(value), `missing reference-layout element: ${value}`);
  }
  assert.equal((source.match(/loading="lazy"/g) || []).length, 5);
  assert.equal((source.match(/decoding="async"/g) || []).length, 5);
  assert.match(source, /alt="[^"]*(framework|architecture|design flow)[^"]*"/i);
  assert.doesNotMatch(source, /chip-figure|chip-canvas/i);
});

test('uses the supplied portrait with stable responsive framing', () => {
  const source = readProjectFile('index.html');
  const css = readProjectFile('styles.css');

  assert.ok(source.includes('src="assets/profile/shizhang-wang.jpg"'));
  assert.match(
    source,
    /class="profile-photo"[\s\S]*width="800"[\s\S]*height="1200"/,
  );
  assert.ok(css.includes('.profile-photo'));
  assert.match(css, /\.profile-photo[\s\S]*object-fit:\s*cover/);
  assert.match(css, /\.profile-photo[\s\S]*height:\s*auto/);
  assert.match(
    css,
    /\.language-switch[\s\S]*button\[aria-pressed="true"\]/,
  );
});

test('documents the official marks and primary-paper figure sources', () => {
  const sources = readProjectFile('assets/SOURCES.md');
  for (const value of [
    'www.zju.edu.cn',
    'dag.hbut.edu.cn',
    '10.1145/3747182',
    '10.1587/elex.22.20250120',
    '10.1145/3658617.3703638',
    '10.1145/3676536.3676753',
    '10.1145/3670474.3685958',
  ]) {
    assert.ok(sources.includes(value), `missing asset provenance: ${value}`);
  }
});

test('ships all five publications without JavaScript', () => {
  const source = readProjectFile('index.html');
  for (const id of [
    'zlibboost',
    'riscv-audio',
    'aspdac-library',
    'iccad-llm',
    'mlcad-subgraph',
  ]) {
    assert.ok(
      source.includes(`data-publication-id="${id}"`),
      `missing ${id}`,
    );
  }
  assert.equal((source.match(/data-publication-id=/g) || []).length, 5);
});

test('contains scholarly links and no unsupported claims', () => {
  const source = readProjectFile('index.html');
  for (const url of [
    'https://orcid.org/0009-0005-5853-4931',
    'https://dblp.org/pid/264/1048',
    'https://doi.org/10.1145/3747182',
    'https://doi.org/10.1587/elex.22.20250120',
    'https://doi.org/10.1145/3658617.3703638',
    'https://doi.org/10.1145/3676536.3676753',
    'https://doi.org/10.1109/MLCAD62225.2024.10740256',
  ]) {
    assert.ok(source.includes(url), `missing ${url}`);
  }
  assert.ok(source.includes('William J. McCalla ICCAD Best Paper Award'));
  assert.doesNotMatch(source, /quadrotor|citation count|mailto:/i);
});

test('filters publications by known topic and fails open for unknown topics', () => {
  assert.equal(filterPublications(publications, 'all').length, 5);
  assert.equal(filterPublications(publications, 'ai-eda').length, 4);
  assert.equal(filterPublications(publications, 'hardware').length, 2);
  assert.equal(filterPublications(publications, 'low-power').length, 2);
  assert.equal(filterPublications(publications, 'unknown').length, 5);
});

test('sorts publications without mutating the source array', () => {
  const source = [
    { year: 2024, id: 'b' },
    { year: 2026, id: 'a' },
  ];

  assert.deepEqual(
    sortPublications(source).map(({ year }) => year),
    [2026, 2024],
  );
  assert.deepEqual(
    source.map(({ year }) => year),
    [2024, 2026],
  );
});

test('implements the approved responsive and accessible CSS system', () => {
  const css = readProjectFile('styles.css');
  for (const rule of [
    'oklch(',
    ':focus-visible',
    'prefers-reduced-motion',
    'aspect-ratio',
    '@media print',
    '.publication',
    'max-width: 1024px',
    'max-width: 768px',
    'max-width: 375px',
    '--header: oklch(',
    'height: 3.5rem',
  ]) {
    assert.ok(css.includes(rule), `missing ${rule}`);
  }
  assert.doesNotMatch(
    css,
    /background-clip\s*:\s*text|backdrop-filter|letter-spacing\s*:\s*-/i,
  );
  assert.doesNotMatch(css, /border-(left|right)\s*:\s*[2-9]/i);
  assert.doesNotMatch(css, /100vmax/i);
});

test('documents preview, deployment, publication updates, and optional content', () => {
  const readme = readProjectFile('README.md');
  for (const value of [
    'python3 -m http.server 4173',
    'http://127.0.0.1:4173/',
    'GitHub Pages',
    'data/publications.js',
    'index.html',
    'GitHub profile',
    'public email',
    'CV',
    'Google Scholar',
    'Zhejiang University program',
  ]) {
    assert.ok(readme.includes(value), `missing README guidance: ${value}`);
  }

  for (const value of [
    'Language switch',
    'English is the default',
    'publication titles remain in English',
    'assets/profile/shizhang-wang.jpg',
  ]) {
    assert.ok(readme.includes(value), `missing bilingual guidance: ${value}`);
  }
});
