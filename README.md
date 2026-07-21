# Shizhang Wang Academic Homepage

王诗章的静态学术个人主页，面向 GitHub Pages 设计。项目没有构建步骤、运行时 API 或框架依赖；页面关闭 JavaScript 后仍能完整阅读。

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 4173
```

浏览器打开 `http://127.0.0.1:4173/`。

不要直接双击 `index.html` 作为最终验证方式。HTTP 预览更接近 GitHub Pages 的实际加载环境，也能暴露资源路径错误。

## 自动测试

```bash
node --test tests/*.test.js
git diff --check
```

测试覆盖论文数量与顺序、DOI、获奖信息、同名作者排除、静态页面内容、筛选逻辑、CSS 可访问性约束和本文档的维护说明。

## GitHub Pages

线上地址：[https://talentdedcat.github.io/](https://talentdedcat.github.io/)

仓库使用账号级 Pages 命名 `talentdedcat/talentdedcat.github.io`，`main`
分支根目录就是发布内容。

## 发布到 GitHub Pages

1. 在 GitHub 创建公开仓库。个人主页建议命名为 `<username>.github.io`；普通项目页可使用任意仓库名。
2. 将本仓库推送到 GitHub：

   ```bash
   git remote add origin https://github.com/<username>/<repository>.git
   git push -u origin main
   ```

3. 打开仓库的 `Settings > Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`，分支选择 `main`，目录选择 `/ (root)`。
5. 等待 GitHub Pages 发布完成，然后打开页面提供的 URL。

站点使用相对资源路径，既支持个人主页仓库，也支持项目子路径部署。

## 更新论文

每篇论文保存两份互相校验的内容：

- `data/publications.js`：筛选、排序和自动测试使用的结构化元数据。
- `index.html`：无 JavaScript 时仍可阅读的完整论文条目。

新增论文时必须同时更新两个文件，然后运行全部测试。记录至少包含年份、完整题目、作者、会议或期刊、稳定 DOI、主题标签，以及经过核验的奖项。不要加入无法通过作者、单位或 ORCID 关系确认的同名论文。

论文默认按年份倒序排列。同一年内的顺序由页面展示意图确定，但两个文件必须保持一致。

## 后续可补充内容

以下信息目前没有在公开页面中伪造占位按钮，取得真实值后再添加：

- GitHub profile：在首屏 `profile-links` 与页脚 `footer-links` 中加入真实个人链接。
- public email：确认用于公开展示的邮箱后加入联系入口；不要使用私人邮箱占位值。
- CV：将 PDF 放入 `assets/`，并在首屏学术链接中添加下载入口。
- Google Scholar：取得个人 Scholar ID 后添加稳定个人主页链接，不展示自动抓取但未经核验的引用数。
- portrait：当前侧栏头像为空白图位，取得本人照片后可替换；论文缩略图已经使用论文中的核心架构或工作流图。
- Zhejiang University program：确认浙江大学当前项目、学位名称和起止时间后，更新 `education` 部分的保守表述。

## 内容来源

核心书目信息来自公开且可追溯的来源：

- [ORCID 0009-0005-5853-4931](https://orcid.org/0009-0005-5853-4931)
- [DBLP author profile](https://dblp.org/pid/264/1048)
- [ICCAD 2024 final program](https://confcats-event-sessions.s3.amazonaws.com/iccad24/uploads/ICCAD_2024_Program_Final.pdf)
- [ASP-DAC 2025 final program](https://www.aspdac.com/aspdac2025/pdf/final_program.pdf)
- [ACM TODAES: ZlibBoost](https://doi.org/10.1145/3747182)
- [J-STAGE: RISC-V audio processor](https://doi.org/10.1587/elex.22.20250120)

DBLP 当前将一篇 2020 年无人机论文合并到同名作者页面。该条目的研究方向、共同作者关系和时间链与本主页核验的身份不一致，因此未收录。

## 项目结构

```text
.
├── assets/favicon.svg
├── assets/institutions/
├── assets/publications/
├── assets/SOURCES.md
├── data/publications.js
├── index.html
├── script.js
├── styles.css
└── tests/
    ├── publications.test.js
    └── site.test.js
```

设计策略记录在 `PRODUCT.md`、`DESIGN.md` 和 `docs/superpowers/specs/` 中。

当前整体信息架构参考了 [Shuang Zeng 的学术主页](https://stevezs315.github.io/)：桌面端采用深色顶栏、固定身份侧栏与右侧学术信息流，移动端改为单列。实现代码与视觉变量均在本项目中重新编写。
