# Sun Jiachen 个人作品集

React + TypeScript + Vite + Tailwind CSS 的完整前端工程。当前按用户提供的 Stitch **Vision Draft 1**（首页和四个详情页）以及已确认的**视觉表达卡 v3**实现。

## 在哪里查看

开发预览：http://127.0.0.1:5173/ 。预览服务运行期间可直接打开。

你不需要修改代码。后续把文案、照片或修改意见交给 AI，由 AI 更新工程、检查并重新给出本地预览。

## 已有功能

- 首页：姓名介绍、能力、四个作品、邮件联系。
- 四个独立详情页：Reclimb、Reduce Food Waste with Charity、No Judge、PlantFun Explorer。
- 中文和英文切换；首次按浏览器语言选择；切换时保留当前页面。刷新后重新使用浏览器语言，不写入浏览器存储。
- 进入详情、返回作品、下一个项目、浏览器前进后退、详情地址直接访问及刷新。
- 研究、原型、测试档案展开与收起。
- 查看图片大图；关闭按钮或 Escape 返回，恢复焦点。
- 邮件链接与复制邮箱；复制失败有明确反馈，不自动跳去发送邮件。
- 图片加载失败与不存在页面的提示。

范围以桌面为主：参考窗口 1440×900，同时在较窄和较矮窗口中自动换行、重排和滚动。没有登录、数据库、在线编辑上传、发布按钮或虚假保存入口。

## 启动、构建和检查

环境：Node.js 22.12+ 或 24 LTS，npm。本次使用 Node 24。以下操作在 `portfolio` 文件夹内进行；可让 AI 代为执行。

首次安装或在另一台电脑运行：

```sh
npm ci
npm run dev
```

默认地址为 http://127.0.0.1:5173/ ，端口占用时终端会提示实际地址。终端关闭后预览服务会停止。

类型检查与正式构建：

```sh
npm run typecheck
npm run build
```

构建输出为 `dist`。预览正式构建：

```sh
npm run preview -- --port 4173
```

检查地址为 http://127.0.0.1:4173/ 。不要双击 `dist/index.html` 代替 HTTP 服务预览。

自动浏览器检查（本机需安装 Google Chrome）：

```sh
npm run build
npm run test:e2e
```

检查覆盖五页刷新、图片资源、中英文、导航、展开、图片弹窗、复制成功及失败、404 和图片失败状态。脚本针对构建后的网页，结果和截图在 `test-results`，不会公开打包。测试使用独立浏览器上下文，不修改正式内容。其他浏览器需单独验证。

## 文件和内容更新

| 位置 | 用途 |
| --- | --- |
| `src/content/projects.ts` | 中英文个人介绍、邮箱、项目内容、流程说明与素材引用；是正式内容来源 |
| `src/content/stitch-assets.json` | 已下载的 Stitch 视觉示例路径 |
| `public/assets/images/` | 从原 HTML 工程保留的 Reclimb 图片 |
| `public/assets/stitch/` | 本地保存的 Stitch 示例图，页面已标注待替换 |
| `src/main.tsx` | 路由、页面与共用组件、交互状态 |
| `src/styles.css` | Tailwind、集中颜色和字体规则、少量基础样式 |
| `vite.config.ts`、`tsconfig.json` | 构建与 TypeScript 配置 |
| `tests/` | 浏览器检查 |

所有图片与字体都随工程本地保存，运行时不依赖 Google 图片地址或字体 CDN。中文采用系统可用的黑体无衬线回退，不声称所有设备字体完全相同。

更新流程固定为：用户提供内容 → AI 写入上述数据或素材目录并更新引用 → 类型检查与构建 → 本地预览 → 用户检查 → 用户手动发布。

`scripts/import-stitch-assets.mjs` 是本次素材导入工具，仅在重新导入同一原始包时使用，需要工作区中的原始导出目录。日常启动、构建和内容更新不需要运行它。

## 设计依据与内容真实性

来源为 `stitch_ux_portfolio_wireframe_architecture (1).zip` 中五个 `*_vision_draft_1` 目录。原 HTML 使用 Tailwind CDN、重复配置与外部字体/图片，已转为本地依赖、共用组件与路由。原始导出保存在工程外的 `设计资料/stitch-export-v1`，未覆盖。

包内没有独立 Sketch 文件；本次以本轮提供的五页 Vision Draft 1 所表达的结构和既定页面关系为实现依据，没有混入其他 Draft。导出中的 `DESIGN.md` 作为资料参考，不替代项目规则。

保留：首页主视觉左右分区、能力三列、前两个重点项目交错排版、后两个项目并列、联系双栏；详情页的概述、流程、原型、测试、成果、展开档案与项目切换顺序。文字变长时允许自然增高。正式站点不显示设计草稿标签、色号说明和编辑编号。

内容来源优先采用旧工程中的文案和用户提供的 Reclimb 图片。中英文内容按这些资料整理。Stitch 新增的测试人数、百分比、硬件性能、工作许可、地点和回复时限没有原始证据，未作为真实经历发布。

仍需补充：

1. Food Waste、No Judge、PlantFun 的真实截图、研究图片和最终成果；当前保留带标注的 Stitch 视觉示例。
2. 各项目具体研究记录、测试参与情况、发现、改动理由和最终结论。
3. 四个项目的原始关键交互流程图。当前流程依据已有简介整理，并明确标为示意；未经证实的 Stitch 工程参数未采用。
4. Reclimb 的具体测试结论、最终功能描述和反思。已有真实图片均已保留在工程。

这些待补项不阻止本地浏览，但正式求职使用前应补齐并确认。视觉示例不代表真实成果，自动检查通过不代表用户验收。

主项目记录继续维护在上一级 `项目记录.md`；稳定规则在上一级 `AGENTS.md`。它们以及原稿、测试结果、凭证均不放入 `public` 或 `dist`。

## Vercel 手动部署（由你操作）

用户已授权将本工程提交并推送至 `https://github.com/wohaoqiang233-svg/myportfolio`。发布网站仍由用户手动操作；Git 推送不等于 Vercel 上线。

本仓库的工程在 `portfolio/` 子目录，发布分支使用 `main`。仓库根目录和工程目录均有关闭自动部署的配置；Vercel 的 Root Directory 必须选择 `portfolio`。

1. 将工程提交到你自己的 Git 仓库（需要时可授权 AI 协助；不要提交 `node_modules`、凭证或工作区的内部设计记录）。
2. 在 Vercel 新建项目并选择仓库。若仓库根目录就是本工程，Root Directory 选根目录；若仓库含 `portfolio` 子文件夹，则选 `portfolio`。
3. Framework 选 Vite；Install Command 为 `npm ci`，Build Command 为 `npm run build`，Output Directory 为 `dist`。无需环境变量、数据库或后端。
4. 确认要发布的版本后，由你点击部署。工程中的 `vercel.json` 已设置 `git.deploymentEnabled: false`，用于关闭 Git push 自动部署，并配置详情页刷新所需的 SPA 回退。首次导入时你主动点击部署仍属于手动发布。
5. 后续更新由你在项目 Deployments 中选择 Create Deployment 并指定目标提交/分支后手动创建；不要用旧版本的 Redeploy 代替发布新提交。若界面名称变化，先查看当前手动创建入口。
6. 发布后将线上地址交给 AI，再实际检查首页、详情直达和刷新、语言、展开及图片。构建通过不代表已上线。

相关官方说明：[关闭 Git 自动部署](https://vercel.com/docs/project-configuration/git-configuration#turning-off-all-automatic-deployments)、[按提交或分支手动创建部署](https://vercel.com/changelog/manually-create-deployments-by-commit-or-branch-in-the-dashboard)。线上检查尚未执行。

## 自己试一遍

打开首页 → 点 Reclimb → 展开测试记录 → 点图片放大并按 Escape 关闭 → 切换 EN（应留在 Reclimb）→ 下一个项目 → 返回全部作品 → 联系区复制邮箱。

## 本次实际检查

2026-09-28：依赖安装、TypeScript 检查、正式构建通过；Chrome 中五项自动检查全部通过。检查了 1440×900、1100×700、900×600，包含展开后的长内容和本地图片。已查看实际页面截图。未验证其他浏览器、系统邮件客户端实际发送或 Vercel 线上环境。当前仍等待用户体验验收。
