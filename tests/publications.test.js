const test = require('node:test');
const assert = require('node:assert/strict');

const publications = require('../data/publications.js');

test('contains the five verified publications in reverse chronology', () => {
  assert.equal(publications.length, 5);
  assert.deepEqual(
    publications.map(({ year }) => year),
    [2026, 2026, 2025, 2024, 2024],
  );
});

test('uses the verified DOI set', () => {
  assert.deepEqual(
    new Set(publications.map(({ doi }) => doi)),
    new Set([
      'https://doi.org/10.1145/3747182',
      'https://doi.org/10.1587/elex.22.20250120',
      'https://doi.org/10.1145/3658617.3703638',
      'https://doi.org/10.1145/3676536.3676753',
      'https://doi.org/10.1109/MLCAD62225.2024.10740256',
    ]),
  );
});

test('preserves authorship and the verified ICCAD award', () => {
  for (const publication of publications) {
    assert.ok(publication.authors.includes('Shizhang Wang'));
  }

  const iccad = publications.find(({ venueShort }) => venueShort === 'ICCAD');
  assert.equal(
    iccad.award,
    'ACM/IEEE William J. McCalla ICCAD Best Paper Award, Front-End',
  );
});

test('excludes the unrelated 2020 quadrotor record', () => {
  assert.ok(
    publications.every(
      ({ title, year }) => year >= 2024 && !/quadrotor/i.test(title),
    ),
  );
});
