# Bilingual Academic Profile Design

## Objective

Add an English and Chinese interface to the existing academic homepage without
duplicating the page or translating publication records. English remains the
default. The profile photograph supplied by Shizhang Wang replaces the blank
portrait area.

## Language Behavior

- The first visit opens in English.
- A compact segmented control sits at the right end of the main navigation.
  English mode labels it `EN / CN`; Chinese mode labels it `英文 / 中文`.
- The active language is visually distinct and exposed through
  `aria-pressed`.
- The selected language is stored in `localStorage` and restored on later
  visits. Invalid or unavailable stored values fall back to English.
- The root `lang` attribute, document title, meta description, accessible
  labels, image alternative text, navigation, headings, profile copy,
  research summaries, education, honors, updates, filters, result count, and
  footer update with the selected language.
- English mode contains no visible Chinese text, including the Chinese name.
  Chinese mode may show `王诗章` in the profile while the Latin author form
  remains available where it is part of publication records.

## Translation Boundary

The following publication data always remains in its verified English form:

- paper titles;
- author lists;
- journal and conference names;
- venue abbreviations;
- DOI and Paper action labels.

Publication figures remain unchanged. Their alternative text follows the
selected interface language because it is interface metadata rather than a
bibliographic record.

## Copy Direction

Both languages use short factual sentences. The copy avoids promotional
phrasing, repeated conjunctions, generic claims, and stock expressions. Venue
names and the verified award provide evidence without added superlatives.

### English Profile

> I study AI for EDA and low-power optimization. My work covers design
> automation, processor architecture, and energy efficiency.
>
> My work has appeared at ICCAD, ASP-DAC, and MLCAD, as well as in ACM TODAES
> and IEICE Electronics Express. Our agile LLM accelerator framework received
> the Front-End Best Paper Award at ICCAD 2024.

### Chinese Profile

> 我主要研究 AI for EDA 和低功耗优化，关注设计自动化、处理器架构、能效优化。
>
> 相关成果发表于 ICCAD、ASP-DAC、MLCAD、ACM TODAES、IEICE Electronics
> Express。敏捷 LLM 加速器开发框架获 ICCAD 2024 Front-End Best Paper Award。

### Research Summaries

| Area | English | Chinese |
| --- | --- | --- |
| AI for EDA | Machine learning for cell characterization. | 面向标准单元表征的机器学习方法。 |
| Low-power optimization | Energy-aware optimization under timing, quality, and reliability constraints. | 面向时序、质量及可靠性约束的能效优化。 |
| Efficient hardware | Processor architecture optimization and accelerator design. | 处理器架构优化与加速器设计。 |

## Portrait Treatment

- Copy the supplied 1280 by 1920 JPEG into `assets/profile/` and optimize it
  for web delivery without changing its content.
- Replace the decorative placeholder with a real `img` element.
- Desktop uses a stable portrait aspect ratio and `object-fit: cover`, with the
  crop positioned to retain the face and upper body.
- Mobile keeps the existing compact profile layout. The crop prioritizes the
  face and avoids shifting surrounding content while the image loads.
- Provide explicit dimensions and localized alternative text to prevent layout
  shift and support assistive technology.

## Implementation Structure

Use one HTML document and one translation dictionary in `script.js`.
Translatable elements receive stable `data-i18n` keys; translated attributes
use explicit attribute mappings. Publication bibliographic nodes do not receive
translation keys. The current filter logic remains intact, while its filter
labels and result count use the active language.

This approach keeps the static GitHub Pages deployment, avoids a build step,
and prevents the English and Chinese layouts from drifting apart.

## Accessibility And Responsive Behavior

- The language control is keyboard accessible and uses real buttons.
- Focus indicators follow the existing site system.
- The active language is not communicated by color alone.
- The control remains legible from 320 pixels upward without hiding the site
  name or causing horizontal scrolling.
- Print output omits the language control and uses the language active at print
  time.

## Error Handling

- A missing translation leaves the existing English source text intact.
- Storage access failures do not block page initialization.
- Language switching remains independent from publication filtering and active
  navigation.
- If JavaScript is unavailable, the page remains a complete English academic
  profile with all publications visible.

## Verification

- Automated tests cover English default state, translated Chinese state,
  persistence fallback, localized result counts, and unchanged publication
  titles.
- Static checks reject the Chinese name from the English source presentation
  and confirm that the real portrait asset is referenced with fixed dimensions.
- Browser checks cover desktop and 390-pixel mobile layouts in both languages,
  including overflow, active language state, filter behavior, and portrait
  cropping.
- The deployed GitHub Pages version must match the tested commit.
