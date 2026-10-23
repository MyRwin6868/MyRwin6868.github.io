# 鹤与鱼 · MyRwin 的小站

> 一个应用统计学 2027 届学生的个人作品小站：数据、兵棋与影像。
> 蓝 / 白 / 黑主色，红色点缀，鲸与鹤是意象。
> 纯静态：HTML + CSS + 原生 JS，无框架、无构建、无外部 CDN。

**已上线（双线路）**

| 线路 | 地址 | 更新方式 |
|---|---|---|
| GitHub Pages（主） | <https://myrwin6868.github.io/> | `git push` 后约 1 分钟自动更新 |
| Cloudflare Pages（备） | <https://heyuyu.pages.dev/> | 控制台重新上传资产（可后续接 Git 自动构建） |

求职发链接建议优先发 GitHub 那条（DNS 只有 IPv4，国内直连更稳）；如果对方打不开，再发 Cloudflare 那条。

---

## 一、怎么打开

### 公网地址

- 主线路：**<https://myrwin6868.github.io/>**（源码仓库 <https://github.com/MyRwin6868/MyRwin6868.github.io>，公开，GitHub Pages 免费托管）
- 备用线路：**<https://heyuyu.pages.dev/>**（Cloudflare Pages 免费托管，直接上传资产，无构建）

两套地址内容完全一致，都是 HTTPS，手机/电脑/平板直接打开，不需要安装任何东西。

### 本地看（最简单）

双击 `index.html` 即可。所有交互、字体、背景、音乐都是本地的，不需要联网。

> 如果浏览器对 `file://` 的存储有限制，装饰主题和留言可能只在当前标签页有效。想看完整效果，用下面的方法起一个本地服务器：

```bash
# 在 D:\职业工程\网站 目录下任选一种
npx serve .
# 或
python -m http.server 8080
```

然后浏览器打开 `http://localhost:8080`。

### 改完怎么更新线上

`D:\职业工程\网站` 本身就是这个 GitHub 仓库的工作副本（`.git` 已配好）。改完文件后：

```bash
cd D:\职业工程\网站
git add -A
git commit -m "更新：改了什么"
git -c http.version=HTTP/1.1 push
```

推送后 GitHub Pages 大约 1 分钟内自动重建，刷新公网地址即可看到。`.gitignore` 已排除 `_qa/`，不会把测试截图传上去。

Cloudflare Pages 那条是「直传」模式，更新需要手动上传一次：

1. 打开 <https://dash.cloudflare.com/> → Workers & Pages → 项目 `heyuyu`；
2. 点「创建部署 / Create deployment」→ 上传资产（Upload assets）；
3. 把新的站点文件夹拖进去 → 部署。或者后续在项目设置里接上 GitHub 仓库，就能和主线路一样 push 自动构建。

> 本机访问 `github.com` 要走系统代理（127.0.0.1:33210），仓库里已给 `.git/config` 配好；这台机器 IPv6 不通，遇到 Cloudflare 控制台慢是正常现象，不影响站点本身。

> 注意本机访问 github.com 需要走系统代理（本机 127.0.0.1:33210），仓库里已给 `.git/config` 配好代理；换电脑时如果 push 失败，重新配置一次 `git config http.proxy` 即可。`gh` 命令走 api.github.com，不受影响。

### 国内访问说明

GitHub Pages 的 `github.io` 域名在国内**多数网络可直接打开、不需要翻墙**，但偶发 DNS 抽风或加载慢（这是 GitHub 自身线路问题，不是站点问题）。已实测本机不走代理直连可访问。如果 HR 那边确实打不开，备选方案：

| 方案 | 说明 |
|---|---|
| Cloudflare Pages | 免费，绑定 `*.pages.dev` 或自有域名，需要 Cloudflare 账号 |
| 国内对象存储静态托管 | 阿里云 OSS / 腾讯云 COS，国内最快；绑定自定义域名需备案，用默认域名则不用 |
| 自有服务器 / 域名 | 把这套纯静态文件丢上去即可，`assets/` 相对路径不用改 |

---

## 二、目录结构

```
网站\
├─ index.html               首页（个人卡 / 播放器 / 欢迎语 / 最近在写 / 精选作品 / 图集速览 / 小站日志 / 统计 / 留言板）
├─ works.html               作品列表（筛选：数据 / 兵棋 / 影像 / 科研）
├─ work-bidding.html        作品详情：医院招标投标数据采集与分析
├─ work-wargame.html        作品详情：《最后的狼踪》兵棋
├─ work-film.html           作品详情：95 秒宣传片（含视频）
├─ work-research.html       作品详情：竞赛、实习与论文
├─ gallery.html             图集（30 张：兵棋 / 数据图表 / 影片截帧，可点开大图）
├─ posts.html               随笔列表
├─ post-bidding.html        随笔：招标数据采集复盘
├─ post-wargame.html        随笔：兵棋程序化
├─ post-film.html           随笔：程序化宣传片
├─ post-kanban.html         随笔：看板管学习
├─ about.html               关于（时间线 / 技能 / 本站说明 / 联系方式）
├─ 404.html                 自定义 404（找不到页面时的鲸鱼提示页）
├─ robots.txt               搜索引擎抓取规则
├─ sitemap.xml              站点地图（13 个页面）
├─ .nojekyll                跳过 GitHub Pages 的 Jekyll 处理
├─ 设计规范.md              团队协作口径（页面骨架、组件、素材、隐私规则）
├─ assets\
│  ├─ css\base.css          全站设计系统（颜色变量、组件、响应式、主题）
│  ├─ css\works.css         作品区补充样式
│  ├─ css\posts.css         随笔区补充样式
│  ├─ css\gallery.css       图集补充样式
│  ├─ css\about.css         关于页补充样式
│  ├─ js\app.js             全站运行时（导航、背景、搜索、播放器、灯箱、留言、动效）
│  ├─ fonts\                本地字体（Fredoka / Nunito）
│  ├─ img\                  作品图表、兵棋截图、影片截帧、favicon
│  └─ video\promo-web.mp4   宣传片网页版（1280×720）
├─ _qa\                     开发期验证脚本与截图（不随站点发布，上线前可删）
└─ templates\               页面模板（新增文章时复制）
```

> 参考站截图等开发期资料在站点目录外的 `D:\职业工程\ref_assets\`，不参与发布。

---

## 三、怎么改内容

### 1. 站点名、昵称、导航、统计数字、联系方式

全部集中在 `assets/js/app.js` 顶部的 `SITE` 对象：

```js
const SITE = {
  name: "鹤与鱼",
  handle: "MyRwin",
  birthday: "2026-10-19",  // 运行天数从这天算
  email: "1319203292@qq.com", // 公开的联系邮箱；清空则「联系我」退化为留言板提示
  stats: { works: 4, gallery: 30, posts: 4, comments: 3 },
  nav: [ ... ]
};
```

### 2. 首页各区块

直接改 `index.html`。卡片用 `base.css` 里的现成组件（`card` / `post-card` / `feature-work` / `stat-tile` / `timeline` …），详见 `设计规范.md` 第 4 节。

### 3. 新增一篇随笔

1. 复制 `templates/article.html` 为 `post-你的标题.html`；
2. 替换标题、导语、正文、目录锚点（`h2` 的 `id` 要和目录 `href` 对上）、点赞 `data-like`、上下篇链接；
3. 在 `posts.html` 加一张卡片；
4. 在 `assets/js/app.js` 的 `searchIndex()` 里加一条，搜索就能搜到。

### 4. 新增图集图片

把图片压到最长边 1500px 以内，放进 `assets/img/`，在 `gallery.html` 里复制一个：

```html
<a class="gallery-item" href="assets/img/图片.jpg" data-tags="兵棋">
  <img src="assets/img/图片.jpg" alt="画面描述" loading="lazy">
  <span class="gallery-item__cap">标题<span>副标题</span></span>
</a>
```

### 5. 主题装饰

`app.js` 顶部 `DECORS` 数组 + `base.css` 的 `[data-decor="..."]` 变量块。想加第四套主题：复制一组颜色变量，改 `DECORS` 里的 id / 名称，再加一个 `.decor-option__swatch--你的id` 小色块样式。

### 6. 背景音乐

没有音频文件。播放器里的三首曲子是 **Web Audio API 实时合成** 的（`app.js` 里的 `Music` 模块），改 `TRACKS` 数组里的 `name / bpm / dur / root / type` 就会生成不同调式和速度的循环。想换成真实音频，需要改 `player-art` 与 `Music` 的播放实现，或者直接加 `<audio>` 标签。

---

## 四、隐私与内容说明

- 全站**不出现真实姓名、学号、手机号、身份证号、家庭住址、家人信息**；统一用 `MyRwin / 鹤与鱼`。
- 公开的联系邮箱是 `1319203292@qq.com`（页脚「联系我」、关于页「复制邮箱」都用它）。不想公开时，清空 `app.js` 里的 `SITE.email` 即可。
- 作品页里的数字与结论来自本人项目产出，未做夸大。
- 图片来自本人项目截图、自己绘制的图表和程序生成帧；没有使用参考站的任何素材。
- 参考站「睦子米の小家」只作为布局与气质的参照，未复制其代码或图片。
- 留言板是本地演示版：留言只保存在访问者自己的浏览器里（`localStorage`），站长看不到。要真留言板需要接后端或第三方服务。

---

## 五、技术说明

| 部分 | 做法 |
|---|---|
| 布局 | CSS Grid + `--shell` 容器；1440 / 1024 / 768 / 390 四档断点 |
| 主题 | `html[data-decor]` 切换三套 CSS 变量，`localStorage` 记忆 |
| 导航 | `app.js` 按 `body[data-page]` 注入并高亮；下滑自动隐藏、上滑回显 |
| 背景 | 内联 SVG 鲸 / 鹤 / 云 / 山 / 星座 + CSS 动画 + 噪点纹理 |
| 音乐 | Web Audio API 程序合成（琶音 + 和弦垫 + 低音 + 混响） |
| 搜索 | 本地 JSON 索引，`/` 或 `Ctrl/Cmd + K` 打开，支持方向键 |
| 图集 | CSS 多列瀑布流 + 原生灯箱 |
| 动效 | IntersectionObserver 进场、数字滚动、进度条、打字机、阅读进度条 |
| 无障碍 | 跳到正文、键盘可达、`prefers-reduced-motion` 降级、图片 alt |

**没有**：框架、构建步骤、npm 依赖、外链 CDN、追踪统计。

---

## 六、发布前自检

1. 逐页打开，控制台无报错；
2. 1440 / 1024 / 768 / 390 四档宽度无横向滚动；
3. 三套装饰主题下文字都可读；
4. 所有链接、图片、视频都能打开；
5. 搜索能搜到每一页；
6. 全文搜一遍真实姓名、身份证、手机号等敏感词，确认没有残留；
7. 本地自检完成后 `git push`，再打开 <https://myrwin6868.github.io/> 抽查 3 个页面 + 手机端；
8. `_qa/` 已被 `.gitignore` 排除，不会上传；`templates/`、`设计规范.md` 可选是否保留在公开仓库。

## 七、变更记录

| 日期 | 变化 |
|---|---|
| 2026-10-19 | 建站：首页 / 作品 / 图集 / 随笔 / 关于五类页面；三套装饰主题；程序生成音乐播放器；站内搜索；图集灯箱；本地留言板 |
| 2026-10-19 | 上线 GitHub Pages：<https://myrwin6868.github.io/>；补 404 页、robots.txt、sitemap.xml；公开联系邮箱 `1319203292@qq.com` |
| 2026-10-19 | 增加 Cloudflare Pages 备用线路：<https://heyuyu.pages.dev/>（直传部署，两站内容一致） |
