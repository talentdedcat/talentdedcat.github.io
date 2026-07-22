(function createSiteApp(global) {
  const knownFilters = new Set(['all', 'ai-eda', 'hardware', 'low-power']);
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
  const languageStorageKey = 'site-language';

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

  function sortPublications(records) {
    if (!Array.isArray(records)) return [];
    return [...records].sort((left, right) => {
      if (right.year !== left.year) return right.year - left.year;
      return String(left.id).localeCompare(String(right.id));
    });
  }

  function filterPublications(records, filter) {
    if (!Array.isArray(records)) return [];
    if (!knownFilters.has(filter) || filter === 'all') return [...records];
    return records.filter(
      ({ topics }) => Array.isArray(topics) && topics.includes(filter),
    );
  }

  function hasValidPublicationData(records) {
    return (
      Array.isArray(records) &&
      records.length > 0 &&
      records.every(
        ({ id, topics, year }) =>
          typeof id === 'string' &&
          Array.isArray(topics) &&
          Number.isInteger(year),
      )
    );
  }

  function setUpFilters(document, records) {
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const articles = [...document.querySelectorAll('[data-publication-id]')];
    const count = document.querySelector('.result-count');

    if (buttons.length === 0 || articles.length === 0 || !count) return;

    const applyFilter = (filter) => {
      const visibleIds = new Set(
        filterPublications(records, filter).map(({ id }) => id),
      );

      for (const article of articles) {
        article.hidden = !visibleIds.has(article.dataset.publicationId);
      }

      for (const button of buttons) {
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.filter === filter),
        );
      }

      const total = visibleIds.size;
      count.textContent = `Showing ${total} publication${total === 1 ? '' : 's'}`;
    };

    for (const button of buttons) {
      button.addEventListener('click', () => applyFilter(button.dataset.filter));
    }
  }

  function setUpActiveNavigation(document) {
    if (typeof global.IntersectionObserver !== 'function') return;

    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const linkById = new Map(
      links.map((link) => [link.getAttribute('href').slice(1), link]),
    );
    const sections = [...linkById.keys()]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new global.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(({ isIntersecting }) => isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visible) return;
        for (const link of links) link.removeAttribute('aria-current');
        linkById.get(visible.target.id)?.setAttribute('aria-current', 'location');
      },
      { rootMargin: '-18% 0px -66% 0px', threshold: [0.15, 0.4] },
    );

    for (const section of sections) observer.observe(section);
  }

  function init() {
    const document = global.document;
    const records = global.PUBLICATIONS;
    if (!document || !hasValidPublicationData(records)) return;

    document.documentElement.classList.add('js');
    setUpFilters(document, records);
    setUpActiveNavigation(document);
  }

  const api = Object.freeze({
    filterPublications,
    formatPublicationCount,
    getStoredLanguage,
    getTranslation,
    normalizeLanguage,
    sortPublications,
    storeLanguage,
  });
  global.SiteApp = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (global.document) {
    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }
}(typeof globalThis !== 'undefined' ? globalThis : window));
