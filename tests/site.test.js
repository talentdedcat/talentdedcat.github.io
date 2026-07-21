const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const readProjectFile = (file) =>
  fs.readFileSync(path.join(root, file), 'utf8');

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
