(function exposePublications(global) {
  const records = [
    {
      id: 'zlibboost',
      year: 2026,
      title:
        'ZlibBoost: An Efficient and Flexible Open-Source Framework for Standard Cell Characterization',
      authors: [
        'Zhengrui Chen',
        'Chengjun Guo',
        'Shizhang Wang',
        'Guozhu Feng',
        'Zixuan Song',
        'Zhenhua Wu',
        'Xunzhao Yin',
        'Weiquan Song',
        'Li Zhang',
        'Zheyu Yan',
        'Cheng Zhuo',
      ],
      venue:
        'ACM Transactions on Design Automation of Electronic Systems, 31(4), Article 74',
      venueShort: 'TODAES',
      doi: 'https://doi.org/10.1145/3747182',
      links: [
        { label: 'DOI', url: 'https://doi.org/10.1145/3747182' },
      ],
      topics: ['ai-eda'],
      award: '',
    },
    {
      id: 'riscv-audio',
      year: 2026,
      title:
        'A High-Efficiency RISC-V Microprocessor Architecture Optimized for Audio Noise Suppression',
      authors: [
        'Hao Gao',
        'Yifei Jin',
        'Shizhang Wang',
        'Boyan Duan',
        'Boqu Zhang',
        'Yue Zheng',
        'Zhuo Yang',
        'Li Zhang',
      ],
      venue: 'IEICE Electronics Express, 23(2)',
      venueShort: 'ELEX',
      doi: 'https://doi.org/10.1587/elex.22.20250120',
      links: [
        {
          label: 'DOI',
          url: 'https://doi.org/10.1587/elex.22.20250120',
        },
      ],
      topics: ['hardware', 'low-power'],
      award: '',
    },
    {
      id: 'aspdac-library',
      year: 2025,
      title:
        'Invited Paper: Boosting Standard Cell Library Characterization with Machine Learning',
      authors: [
        'Zhengrui Chen',
        'Chengjun Guo',
        'Zixuan Song',
        'Guozhu Feng',
        'Shizhang Wang',
        'Li Zhang',
        'Xunzhao Yin',
        'Zhenhua Wu',
        'Zheyu Yan',
        'Cheng Zhuo',
      ],
      venue:
        '30th Asia and South Pacific Design Automation Conference, pp. 385-391',
      venueShort: 'ASP-DAC',
      doi: 'https://doi.org/10.1145/3658617.3703638',
      links: [
        {
          label: 'DOI',
          url: 'https://doi.org/10.1145/3658617.3703638',
        },
      ],
      topics: ['ai-eda'],
      award: '',
    },
    {
      id: 'iccad-llm',
      year: 2024,
      title:
        'An Agile Framework for Efficient LLM Accelerator Development and Model Inference',
      authors: [
        'Lvcheng Chen',
        'Ying Wu',
        'Chenyi Wen',
        'Shizhang Wang',
        'Li Zhang',
        'Bei Yu',
        'Qi Sun',
        'Cheng Zhuo',
      ],
      venue:
        '43rd IEEE/ACM International Conference on Computer-Aided Design, Article 200',
      venueShort: 'ICCAD',
      doi: 'https://doi.org/10.1145/3676536.3676753',
      links: [
        {
          label: 'DOI',
          url: 'https://doi.org/10.1145/3676536.3676753',
        },
        {
          label: 'Paper',
          url: 'https://www.cse.cuhk.edu.hk/~byu/papers/C234-ICCAD2024-BinaryLLM.pdf',
        },
      ],
      topics: ['ai-eda', 'hardware', 'low-power'],
      award:
        'ACM/IEEE William J. McCalla ICCAD Best Paper Award, Front-End',
    },
    {
      id: 'mlcad-subgraph',
      year: 2024,
      title:
        'Efficient Subgraph Matching Framework for Fast Subcircuit Identification',
      authors: [
        'Bohao Li',
        'Shizhang Wang',
        'Tinghuan Chen',
        'Qi Sun',
        'Cheng Zhuo',
      ],
      venue: 'ACM/IEEE 6th Symposium on Machine Learning for CAD',
      venueShort: 'MLCAD',
      doi: 'https://doi.org/10.1109/MLCAD62225.2024.10740256',
      links: [
        {
          label: 'DOI',
          url: 'https://doi.org/10.1109/MLCAD62225.2024.10740256',
        },
      ],
      topics: ['ai-eda'],
      award: '',
    },
  ].map((record) => Object.freeze(record));

  const publications = Object.freeze(records);
  global.PUBLICATIONS = publications;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = publications;
  }
}(typeof globalThis !== 'undefined' ? globalThis : window));
