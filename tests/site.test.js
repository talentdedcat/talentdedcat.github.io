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
    '王诗章',
    'id="research"',
    'id="publications"',
    'id="recognition"',
    'id="education"',
  ]) {
    assert.ok(source.includes(value), `missing ${value}`);
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
