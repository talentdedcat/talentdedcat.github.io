const test = require('node:test');
const assert = require('node:assert/strict');
const {
  formatPublicationCount,
  getStoredLanguage,
  getTranslation,
  normalizeLanguage,
  storeLanguage,
} = require('../script.js');

test('uses English unless Chinese is explicitly selected', () => {
  assert.equal(normalizeLanguage('en'), 'en');
  assert.equal(normalizeLanguage('zh'), 'zh');
  assert.equal(normalizeLanguage('zh-CN'), 'en');
  assert.equal(normalizeLanguage(undefined), 'en');
});

test('returns concise interface copy with an English fallback', () => {
  assert.equal(getTranslation('en', 'about.title'), 'About Me');
  assert.equal(getTranslation('zh', 'about.title'), '个人简介');
  assert.equal(
    getTranslation('zh', 'research.hardware.summary'),
    '处理器架构优化与加速器设计。',
  );
  assert.equal(getTranslation('zh', 'missing.key'), 'missing.key');
});

test('formats publication counts in the active language', () => {
  assert.equal(formatPublicationCount(5, 'en'), 'Showing 5 publications');
  assert.equal(formatPublicationCount(1, 'en'), 'Showing 1 publication');
  assert.equal(formatPublicationCount(5, 'zh'), '显示 5 篇论文');
  assert.equal(formatPublicationCount(-1, 'zh'), '显示 0 篇论文');
});

test('persists valid language choices and fails safely when storage is blocked', () => {
  const values = new Map([['site-language', 'zh']]);
  const storage = {
    getItem: (key) => values.get(key),
    setItem: (key, value) => values.set(key, value),
  };

  assert.equal(getStoredLanguage(storage), 'zh');
  storeLanguage(storage, 'en');
  assert.equal(values.get('site-language'), 'en');

  const blockedStorage = {
    getItem: () => { throw new Error('blocked'); },
    setItem: () => { throw new Error('blocked'); },
  };
  assert.equal(getStoredLanguage(blockedStorage), 'en');
  assert.doesNotThrow(() => storeLanguage(blockedStorage, 'zh'));
});
