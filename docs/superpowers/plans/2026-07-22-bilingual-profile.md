# Bilingual Academic Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an English-default, Chinese-switchable academic homepage with a real profile photograph, concise bilingual copy, and unchanged English publication records.

**Architecture:** Keep one progressively enhanced HTML document. `script.js` owns a small translation dictionary, language normalization, persistence, DOM updates, and localized publication counts; `index.html` remains complete English content when JavaScript is unavailable. Stable `data-i18n` attributes mark interface copy while bibliographic publication nodes remain untouched.

**Tech Stack:** Static HTML5, CSS with existing OKLCH tokens, browser JavaScript, Node.js built-in test runner, GitHub Pages.

---

## File Map

- Create `tests/localization.test.js`: pure language and count-formatting tests.
- Create `assets/profile/shizhang-wang.jpg`: optimized copy of the supplied portrait.
- Modify `script.js`: translation dictionary, language state, persistence, DOM application, and localized filter count.
- Modify `index.html`: English-only default content, language controls, translation keys, refined copy, and real portrait element.
- Modify `styles.css`: segmented language control and responsive portrait crop.
- Modify `tests/site.test.js`: static language boundary, portrait, copy, and publication-integrity assertions.
- Modify `README.md`: bilingual content and portrait maintenance notes.
- Modify `DESIGN.md`: language control and portrait component rules.

### Task 1: Build The Localization Core

**Files:**
- Create: `tests/localization.test.js`
- Modify: `script.js:1-118`

- [ ] **Step 1: Write failing unit tests for language normalization and copy**

Create `tests/localization.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  formatPublicationCount,
  getTranslation,
  getStoredLanguage,
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
```

- [ ] **Step 2: Run the new tests and verify the expected failure**

Run:

```bash
node --test tests/localization.test.js
```

Expected: FAIL because the localization and storage helpers are not exported.

- [ ] **Step 3: Add the translation dictionary and pure helper functions**

At the top of `script.js`, after `knownFilters`, add an immutable dictionary
with these exact keys and values:

```js
  const supportedLanguages = new Set(['en', 'zh']);
  const translations = Object.freeze({
    en: Object.freeze({
      'document.title': 'Shizhang Wang | Academic Homepage',
      'document.description': 'Shizhang Wang researches AI for EDA, processor architecture, and low-power optimization.',
      'skip.main': 'Skip to main content',
      'nav.label': 'Primary navigation',
      'nav.home': 'Home',
      'nav.research': 'Research',
      'nav.publications': 'Publications',
      'nav.awards': 'Awards',
      'language.label': 'Choose page language',
      'language.en': 'EN',
      'language.zh': 'CN',
      'profile.label': 'Profile',
      'profile.photoAlt': 'Portrait of Shizhang Wang',
      'profile.name': 'Shizhang Wang',
      'profile.role': 'Researcher in AI for EDA',
      'profile.institution': 'Zhejiang University',
      'profile.location': 'Hangzhou, China',
      'profile.linksLabel': 'Scholarly profiles',
      'profile.interestsLabel': 'Research interests',
      'profile.lowPower': 'Low-power design',
      'profile.hardware': 'Efficient hardware',
      'about.kicker': 'Academic profile',
      'about.title': 'About Me',
      'about.body1': 'I study AI for EDA and low-power optimization. My work covers design automation, processor architecture, and energy efficiency.',
      'about.body2': 'My work has appeared at ICCAD, ASP-DAC, and MLCAD, as well as in ACM TODAES and IEICE Electronics Express. Our agile LLM accelerator framework received the Front-End Best Paper Award at ICCAD 2024.',
      'details.label': 'Education and honors',
      'education.title': 'Education & Affiliation',
      'education.zjuAlt': 'Zhejiang University emblem',
      'education.zjuName': 'Zhejiang University',
      'education.zjuField': 'AI for EDA and efficient hardware systems',
      'education.zjuMeta': 'Current affiliation · Hangzhou, China',
      'education.hbutAlt': 'Hubei University of Technology emblem',
      'education.hbutName': 'Hubei University of Technology',
      'education.hbutField': 'Integrated Circuit Design and Integrated Systems',
      'education.hbutMeta': 'Undergraduate study · Wuhan, China',
      'awards.title': 'Honors & Awards',
      'awards.name': 'William J. McCalla ICCAD Best Paper Award',
      'awards.category': 'Front-End category, ACM/IEEE ICCAD',
      'awards.program': 'Official program',
      'updates.title': 'Updates',
      'updates.may': 'May',
      'updates.jan': 'Jan',
      'updates.oct': 'Oct',
      'updates.sep': 'Sep',
      'updates.2026May': 'ZlibBoost appears in ACM TODAES.',
      'updates.2026Jan': 'Our RISC-V audio processor work appears in IEICE Electronics Express.',
      'updates.2025Jan': 'Invited work on machine-learning-assisted cell characterization appears at ASP-DAC.',
      'updates.2024Oct': 'Our agile LLM accelerator paper receives the ICCAD Best Paper Award.',
      'updates.2024Sep': 'Subcircuit identification work appears at MLCAD.',
      'research.title': 'Research',
      'research.ai.title': 'AI for EDA',
      'research.ai.summary': 'Machine learning for cell characterization.',
      'research.lowPower.title': 'Low-power optimization',
      'research.lowPower.summary': 'Energy-aware optimization under timing, quality, and reliability constraints.',
      'research.hardware.title': 'Efficient hardware',
      'research.hardware.summary': 'Processor architecture optimization and accelerator design.',
      'publications.kicker': 'Reverse chronological',
      'publications.title': 'Publications',
      'publications.filterLabel': 'Filter publications',
      'publications.all': 'All',
      'publications.ai': 'AI for EDA',
      'publications.hardware': 'Hardware',
      'publications.lowPower': 'Low power',
      'publications.invited': 'Invited',
      'publications.bestPaper': 'Best Paper',
      'publications.zlibboostAlt': 'ZlibBoost standard-cell characterization framework architecture',
      'publications.riscvAlt': 'Optimized RISC-V processor architecture for audio noise suppression',
      'publications.aspdacAlt': 'Machine-learning-assisted standard-cell library characterization framework',
      'publications.iccadAlt': 'Agile LLM accelerator and system-on-chip design flow',
      'publications.mlcadAlt': 'Fast subcircuit identification and subgraph matching framework',
      'footer.copyright': '© 2026 Shizhang Wang',
      'footer.focus': 'AI for EDA · Low-power optimization · Efficient hardware',
    }),
    zh: Object.freeze({
      'document.title': '王诗章 | 学术主页',
      'document.description': '王诗章的研究方向包括 AI for EDA、处理器架构和低功耗优化。',
      'skip.main': '跳至主要内容',
      'nav.label': '主导航',
      'nav.home': '主页',
      'nav.research': '研究方向',
      'nav.publications': '论文',
      'nav.awards': '荣誉',
      'language.label': '选择页面语言',
      'language.en': '英文',
      'language.zh': '中文',
      'profile.label': '个人资料',
      'profile.photoAlt': '王诗章个人照片',
      'profile.name': '王诗章',
      'profile.role': 'AI for EDA 研究者',
      'profile.institution': '浙江大学',
      'profile.location': '中国杭州',
      'profile.linksLabel': '学术主页',
      'profile.interestsLabel': '研究方向',
      'profile.lowPower': '低功耗设计',
      'profile.hardware': '高效硬件',
      'about.kicker': '学术简介',
      'about.title': '个人简介',
      'about.body1': '我主要研究 AI for EDA 和低功耗优化，关注设计自动化、处理器架构、能效优化。',
      'about.body2': '相关成果发表于 ICCAD、ASP-DAC、MLCAD、ACM TODAES、IEICE Electronics Express。敏捷 LLM 加速器开发框架获 ICCAD 2024 Front-End Best Paper Award。',
      'details.label': '教育经历和荣誉',
      'education.title': '教育经历与工作单位',
      'education.zjuAlt': '浙江大学校徽',
      'education.zjuName': '浙江大学',
      'education.zjuField': 'AI for EDA 与高效硬件系统',
      'education.zjuMeta': '现就职于浙江大学 · 中国杭州',
      'education.hbutAlt': '湖北工业大学校徽',
      'education.hbutName': '湖北工业大学',
      'education.hbutField': '集成电路设计与集成系统',
      'education.hbutMeta': '本科 · 中国武汉',
      'awards.title': '荣誉与奖励',
      'awards.name': 'William J. McCalla ICCAD 最佳论文奖',
      'awards.category': 'Front-End 类别，ACM/IEEE ICCAD',
      'awards.program': '官方日程',
      'updates.title': '近期动态',
      'updates.may': '5月',
      'updates.jan': '1月',
      'updates.oct': '10月',
      'updates.sep': '9月',
      'updates.2026May': 'ZlibBoost 发表于 ACM TODAES。',
      'updates.2026Jan': 'RISC-V 音频处理器研究发表于 IEICE Electronics Express。',
      'updates.2025Jan': '机器学习辅助标准单元表征的邀请论文发表于 ASP-DAC。',
      'updates.2024Oct': '敏捷 LLM 加速器论文获 ICCAD Best Paper Award。',
      'updates.2024Sep': '子电路识别研究发表于 MLCAD。',
      'research.title': '研究方向',
      'research.ai.title': 'AI for EDA',
      'research.ai.summary': '面向标准单元表征的机器学习方法。',
      'research.lowPower.title': '低功耗优化',
      'research.lowPower.summary': '面向时序、质量及可靠性约束的能效优化。',
      'research.hardware.title': '高效硬件',
      'research.hardware.summary': '处理器架构优化与加速器设计。',
      'publications.kicker': '按时间倒序排列',
      'publications.title': '论文',
      'publications.filterLabel': '筛选论文',
      'publications.all': '全部',
      'publications.ai': 'AI for EDA',
      'publications.hardware': '硬件',
      'publications.lowPower': '低功耗',
      'publications.invited': '邀请论文',
      'publications.bestPaper': '最佳论文',
      'publications.zlibboostAlt': 'ZlibBoost 标准单元表征框架架构图',
      'publications.riscvAlt': '面向音频降噪优化的 RISC-V 处理器架构图',
      'publications.aspdacAlt': '机器学习辅助标准单元库表征框架图',
      'publications.iccadAlt': '敏捷 LLM 加速器及片上系统设计流程图',
      'publications.mlcadAlt': '快速子电路识别与子图匹配框架图',
      'footer.copyright': '© 2026 王诗章',
      'footer.focus': 'AI for EDA · 低功耗优化 · 高效硬件',
    }),
  });

  function normalizeLanguage(language) {
    return supportedLanguages.has(language) ? language : 'en';
  }

  function getTranslation(language, key) {
    const normalized = normalizeLanguage(language);
    return translations[normalized][key] ?? translations.en[key] ?? key;
  }

  function formatPublicationCount(total, language) {
    const safeTotal = Number.isInteger(total) && total >= 0 ? total : 0;
    if (normalizeLanguage(language) === 'zh') return `显示 ${safeTotal} 篇论文`;
    return `Showing ${safeTotal} publication${safeTotal === 1 ? '' : 's'}`;
  }

  const languageStorageKey = 'site-language';

  function getStoredLanguage(storage) {
    try {
      return normalizeLanguage(storage?.getItem(languageStorageKey));
    } catch {
      return 'en';
    }
  }

  function storeLanguage(storage, language) {
    try {
      storage?.setItem(languageStorageKey, normalizeLanguage(language));
    } catch {
      // The page remains usable when storage is blocked.
    }
  }
```

Add the helpers to the exported API:

```js
  const api = Object.freeze({
    filterPublications,
    formatPublicationCount,
    getTranslation,
    getStoredLanguage,
    normalizeLanguage,
    sortPublications,
    storeLanguage,
  });
```

- [ ] **Step 4: Run the localization tests and the existing suite**

Run:

```bash
node --test tests/localization.test.js tests/publications.test.js tests/site.test.js
```

Expected: all tests PASS.

- [ ] **Step 5: Commit the localization core**

```bash
git add script.js tests/localization.test.js
git commit -m "feat: add bilingual copy model"
```

### Task 2: Integrate Language Switching Without Translating Publications

**Files:**
- Modify: `tests/site.test.js:12-194`
- Modify: `index.html:1-330`
- Modify: `script.js:33-118`

- [ ] **Step 1: Write failing static integration tests**

Update the identity assertion in `tests/site.test.js` to remove `王诗章`, then
add these tests:

```js
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
  const publicationList = source.match(/<div class="publication-list">([\s\S]*?)<\/section>/)?.[1] ?? '';

  assert.ok(publicationList.includes('ZlibBoost: An Efficient and Flexible Open-Source Framework'));
  assert.ok(publicationList.includes('An Agile Framework for Efficient LLM Accelerator Development'));
  assert.doesNotMatch(publicationList, /<h3[^>]*data-i18n/);
  assert.doesNotMatch(publicationList, /class="authors"[^>]*data-i18n/);
  assert.doesNotMatch(publicationList, /class="venue"[^>]*data-i18n/);
});

test('uses the refined research and profile copy', () => {
  const source = readProjectFile('index.html').replace(/\s+/g, ' ');

  assert.ok(source.includes('Processor architecture optimization and accelerator design.'));
  assert.ok(source.includes('I study AI for EDA and low-power optimization.'));
  assert.doesNotMatch(source, /Agile accelerator and processor design for language models/i);
});
```

- [ ] **Step 2: Run the static tests and verify the expected failure**

Run:

```bash
node --test tests/site.test.js
```

Expected: FAIL because the HTML still contains the Chinese name, lacks the
language controls and translation keys, and contains the old hardware summary.

- [ ] **Step 3: Convert the default HTML to English-only keyed content**

Apply these structural rules throughout `index.html`:

```html
<html lang="en" data-language="en">
<!-- The default meta description contains no Chinese text. -->

<div class="nav-actions">
  <div class="nav-links">
    <a href="#about" data-i18n="nav.home">Home</a>
    <a href="#research" data-i18n="nav.research">Research</a>
    <a href="#publications" data-i18n="nav.publications">Publications</a>
    <a href="#recognition" data-i18n="nav.awards">Awards</a>
  </div>
  <div class="language-switch" role="group" aria-label="Choose page language" data-i18n-aria-label="language.label">
    <button type="button" data-language="en" aria-pressed="true" data-i18n="language.en">EN</button>
    <button type="button" data-language="zh" aria-pressed="false" data-i18n="language.zh">CN</button>
  </div>
</div>

<img
  class="profile-photo"
  src="assets/profile/shizhang-wang.jpg"
  width="800"
  height="1200"
  alt="Portrait of Shizhang Wang"
  data-i18n-alt="profile.photoAlt"
>
<h1 data-i18n="profile.name">Shizhang Wang</h1>
```

Give every non-bibliographic interface node the corresponding `data-i18n`
key from Task 1. For attribute values, use `data-i18n-alt` or
`data-i18n-aria-label`. Split the affiliation into two keyed spans around the
existing `<br>`. Keep every publication title, author list, venue, DOI label,
and Paper label exactly as it is. Add translation keys only to publication
status tags and figure alternative text.

Replace the two About paragraphs with the exact English strings from
`about.body1` and `about.body2`. Replace the low-power and hardware research
summaries with `research.lowPower.summary` and `research.hardware.summary`.

- [ ] **Step 4: Implement language application and persistence**

Add these DOM functions to `script.js` after the storage helpers:

```js
  function countVisiblePublications(document) {
    return [...document.querySelectorAll('[data-publication-id]')]
      .filter((article) => !article.hidden).length;
  }

  function applyLanguage(document, language) {
    const selected = normalizeLanguage(language);
    document.documentElement.lang = selected === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.language = selected;
    document.title = getTranslation(selected, 'document.title');

    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = getTranslation(selected, 'document.description');

    for (const element of document.querySelectorAll('[data-i18n]')) {
      element.textContent = getTranslation(selected, element.dataset.i18n);
    }
    for (const element of document.querySelectorAll('[data-i18n-alt]')) {
      element.alt = getTranslation(selected, element.dataset.i18nAlt);
    }
    for (const element of document.querySelectorAll('[data-i18n-aria-label]')) {
      element.setAttribute(
        'aria-label',
        getTranslation(selected, element.dataset.i18nAriaLabel),
      );
    }
    for (const button of document.querySelectorAll('[data-language]')) {
      button.setAttribute('aria-pressed', String(button.dataset.language === selected));
    }

    const count = document.querySelector('.result-count');
    if (count) {
      count.textContent = formatPublicationCount(
        countVisiblePublications(document),
        selected,
      );
    }
    return selected;
  }

  function setUpLanguage(document, storage) {
    let selected = applyLanguage(document, getStoredLanguage(storage));
    for (const button of document.querySelectorAll('[data-language]')) {
      button.addEventListener('click', () => {
        selected = applyLanguage(document, button.dataset.language);
        storeLanguage(storage, selected);
      });
    }
  }
```

Change the filter count update to:

```js
      const total = visibleIds.size;
      count.textContent = formatPublicationCount(
        total,
        document.documentElement.dataset.language,
      );
```

Initialize language before filters:

```js
  function init() {
    const document = global.document;
    if (!document) return;

    let storage = null;
    try {
      storage = global.localStorage;
    } catch {
      // Language switching still works when storage access is blocked.
    }

    document.documentElement.classList.add('js');
    setUpLanguage(document, storage);
    if (hasValidPublicationData(global.PUBLICATIONS)) {
      setUpFilters(document, global.PUBLICATIONS);
    }
    setUpActiveNavigation(document);
  }
```

- [ ] **Step 5: Run the full tests and verify the integration passes**

Run:

```bash
node --test tests/*.test.js
```

Expected: all tests PASS, including the English-only default and publication
boundary assertions.

- [ ] **Step 6: Commit the language integration**

```bash
git add index.html script.js tests/site.test.js
git commit -m "feat: add English and Chinese interface"
```

### Task 3: Add And Style The Supplied Portrait

**Files:**
- Create: `assets/profile/shizhang-wang.jpg`
- Modify: `styles.css:100-290,700-860`
- Modify: `tests/site.test.js:54-77,152-175`

- [ ] **Step 1: Write failing portrait and control-style assertions**

Add to `tests/site.test.js`:

```js
test('uses the supplied portrait with stable responsive framing', () => {
  const source = readProjectFile('index.html');
  const css = readProjectFile('styles.css');

  assert.ok(source.includes('src="assets/profile/shizhang-wang.jpg"'));
  assert.match(source, /class="profile-photo"[\s\S]*width="800"[\s\S]*height="1200"/);
  assert.ok(css.includes('.profile-photo'));
  assert.match(css, /\.profile-photo[\s\S]*object-fit:\s*cover/);
  assert.match(css, /\.language-switch[\s\S]*button\[aria-pressed="true"\]/);
});
```

In the existing reference-layout test, replace
`class="portrait-placeholder"` with `class="profile-photo"`.

- [ ] **Step 2: Run the site tests and verify the expected failure**

Run:

```bash
node --test tests/site.test.js
```

Expected: FAIL because the portrait asset and final CSS rules do not exist.

- [ ] **Step 3: Create the optimized portrait asset**

Run:

```bash
mkdir -p assets/profile
cp /Users/shizhang/.codex/attachments/8e4a5099-7ee1-4974-8349-ec2f23f6144d/image-1.jpg assets/profile/shizhang-wang.jpg
sips -Z 1200 assets/profile/shizhang-wang.jpg
```

Expected: `assets/profile/shizhang-wang.jpg` is an 800 by 1200 JPEG. Do not
retouch or generate facial content.

- [ ] **Step 4: Add the segmented control and portrait CSS**

Replace `.portrait-placeholder` rules and add the navigation control rules:

```css
.nav-actions,
.language-switch {
  display: flex;
  align-items: center;
}

.nav-actions {
  gap: 1.25rem;
}

.language-switch {
  overflow: hidden;
  flex: 0 0 auto;
  border: 1px solid oklch(0.54 0.012 255);
  border-radius: 4px;
}

.language-switch button {
  min-width: 2.2rem;
  min-height: 1.8rem;
  padding: 0.2rem 0.45rem;
  border: 0;
  background: transparent;
  color: oklch(0.86 0.008 250);
  cursor: pointer;
  font-size: 0.68rem;
  font-weight: 600;
}

.language-switch button + button {
  border-left: 1px solid oklch(0.54 0.012 255);
}

.language-switch button[aria-pressed="true"] {
  background: oklch(0.94 0.012 250);
  color: var(--header);
}

.profile-photo {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: oklch(0.96 0.003 250);
  object-fit: cover;
  object-position: 48% 64%;
}
```

Add these exact responsive overrides to the existing breakpoint blocks:

```css
@media (max-width: 768px) {
  .nav-actions {
    gap: 0.65rem;
  }

  .language-switch button {
    min-width: 2rem;
    padding-inline: 0.35rem;
  }

  .profile-photo {
    height: 10rem;
    aspect-ratio: auto;
    object-position: 36% 55%;
  }
}

@media (max-width: 600px) {
  .nav-links a:nth-child(2),
  .nav-links a:nth-child(4) {
    display: none;
  }
}

@media (max-width: 420px) {
  .nav-actions {
    gap: 0.5rem;
  }

  .nav-links a:nth-child(3) {
    display: none;
  }

  .profile-photo {
    height: 8rem;
  }
}
```

Keep `.site-name` and `.language-switch` visible at every breakpoint. The
existing print rule already hides `.site-header`, which also removes the
language control from print output.

- [ ] **Step 5: Verify image dimensions, CSS, and tests**

Run:

```bash
sips -g pixelWidth -g pixelHeight assets/profile/shizhang-wang.jpg
node --test tests/*.test.js
git diff --check
```

Expected: image reports 800 by 1200; all tests PASS; `git diff --check` exits
with no output.

- [ ] **Step 6: Commit the portrait and responsive controls**

```bash
git add assets/profile/shizhang-wang.jpg styles.css tests/site.test.js
git commit -m "feat: add profile portrait and language controls"
```

### Task 4: Document, Visually Verify, And Deploy

**Files:**
- Modify: `README.md`
- Modify: `DESIGN.md`

- [ ] **Step 1: Add failing documentation assertions**

Extend the README test values in `tests/site.test.js`:

```js
for (const value of [
  'Language switch',
  'English is the default',
  'publication titles remain in English',
  'assets/profile/shizhang-wang.jpg',
]) {
  assert.ok(readme.includes(value), `missing bilingual guidance: ${value}`);
}
```

- [ ] **Step 2: Run the documentation test and verify the expected failure**

Run:

```bash
node --test tests/site.test.js
```

Expected: FAIL because the maintenance guidance has not been written.

- [ ] **Step 3: Document the language and portrait maintenance rules**

Add a `Language switch` section to `README.md` stating:

```markdown
## Language switch

English is the default and complete no-JavaScript version. Interface copy is
stored in the translation dictionary in `script.js`; publication titles,
authors, venue names, DOI labels, and Paper labels remain in English. When
adding interface text, add matching English and Chinese keys and mark the HTML
node with `data-i18n`, `data-i18n-alt`, or `data-i18n-aria-label`.

The profile photograph is `assets/profile/shizhang-wang.jpg`. Keep its 2:3
aspect ratio and explicit HTML dimensions when replacing it so the sidebar does
not shift while loading.
```

Update `DESIGN.md` so Components lists the real profile photograph and the
localized segmented language control. Remove the statement that the portrait
is deliberately blank.

- [ ] **Step 4: Run the full automated verification**

Run:

```bash
node --test tests/*.test.js
git diff --check
git status --short
```

Expected: all tests PASS, diff check exits cleanly, and status lists only the
intended documentation and test changes.

- [ ] **Step 5: Run local browser QA at desktop and mobile widths**

Serve the site:

```bash
python3 -m http.server 4173
```

Using the in-app browser, verify at 1440 by 1000 and 390 by 844:

- initial text is English and contains no visible Chinese characters;
- the language control reads `EN / CN` in English and `英文 / 中文` in Chinese;
- switching changes `html[lang]`, headings, labels, description copy, image alt
  text, and result count;
- all five paper titles and author lists are identical before and after the
  switch;
- the language choice survives a reload;
- filtering still works in both languages;
- the portrait crop keeps the face visible;
- `document.documentElement.scrollWidth === window.innerWidth` at both widths;
- browser console has no errors.

- [ ] **Step 6: Commit documentation and final integration fixes**

```bash
git add README.md DESIGN.md tests/site.test.js index.html script.js styles.css
git commit -m "docs: explain bilingual profile maintenance"
```

If the browser QA required code changes, repeat the full automated verification
before this commit.

- [ ] **Step 7: Push and verify GitHub Pages**

Run:

```bash
git push origin main
```

Poll `https://talentdedcat.github.io/` with a cache-busting query until it
contains `Processor architecture optimization and accelerator design.` and
references `assets/profile/shizhang-wang.jpg`. Then verify:

```bash
node --test tests/*.test.js
git diff --check
test "$(git rev-parse HEAD)" = "$(git ls-remote origin refs/heads/main | cut -f1)"
test -z "$(git status --short)"
```

Expected: all tests PASS, local and remote `main` match, and the worktree is
clean. Complete one final browser pass on the deployed cache-busted URL in both
languages before retaining the live page as the deliverable tab.
