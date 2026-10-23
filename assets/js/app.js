/* ==========================================================================
   鹤与鱼 · MyRwin —— 全站共享运行时
   - 背景画、导航、页脚、图标库注入
   - 装饰主题、搜索、灯箱、留言板、播放器、动效
   页面作者请勿修改本文件（共享文件）
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     0. 站点配置（改这里就能改全站标识）
     ------------------------------------------------------------------ */
  const SITE = {
    name: "鹤与鱼",
    handle: "MyRwin",
    latin: "HE YU YU · MyRwin",
    tagline: "在数据、兵棋与影像之间，做一只会飞的鹤，一条会潜的鲸。",
    birthday: "2026-10-19",
    email: "1319203292@qq.com", // 公开的联系邮箱；不想公开就清空
    stats: { works: 6, gallery: 30, posts: 4, comments: 3 },
    nav: [
      { page: "home", href: "index.html", label: "首页", icon: "home" },
      { page: "works", href: "works.html", label: "作品", icon: "works" },
      { page: "gallery", href: "gallery.html", label: "图集", icon: "gallery" },
      { page: "posts", href: "posts.html", label: "随笔", icon: "posts" },
      { page: "about", href: "about.html", label: "关于", icon: "about" }
    ]
  };

  const BASE = document.body.dataset.root || "";
  const PAGE = document.body.dataset.page || "home";
  const SUB = document.body.dataset.sub || "";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.prototype.slice.call(r.querySelectorAll(s));

  function asset(p) { return BASE + "assets/" + p; }
  function link(p) { return BASE + p; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ------------------------------------------------------------------
     1. 图标库
     ------------------------------------------------------------------ */
  const ICONS = {
    home: '<path d="M4 10.5 12 3l8 7.5"/><path d="M6 9.5V20h4v-5.5h4V20h4V9.5"/>',
    works: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
    gallery: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="8.7" cy="9.5" r="1.6"/><path d="M4.5 17.5 9 13l3 3 2.5-2.5 5 4.5"/>',
    posts: '<path d="M5 4.5h9.5L19 9v10.5H5z"/><path d="M14 4.5V9h4.5"/><path d="M8.5 13h7M8.5 16.5h5"/>',
    about: '<circle cx="12" cy="8.2" r="3.8"/><path d="M4.8 20.2c1.1-3.6 3.8-5.6 7.2-5.6s6.1 2 7.2 5.6"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    "arrow-right": '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
    "arrow-left": '<path d="M19.5 12h-15M10.5 6l-6 6 6 6"/>',
    "arrow-up": '<path d="M12 19.5v-15M6 10.5l6-6 6 6"/>',
    play: '<path d="M8 5.4v13.2L19 12z" fill="currentColor" stroke="none"/>',
    pause: '<rect x="7" y="5" width="3.4" height="14" rx="1.2" fill="currentColor" stroke="none"/><rect x="13.6" y="5" width="3.4" height="14" rx="1.2" fill="currentColor" stroke="none"/>',
    prev: '<path d="M18.5 6v12L9 12z" fill="currentColor" stroke="none"/><path d="M6.5 5.5v13"/>',
    next: '<path d="M5.5 6v12L15 12z" fill="currentColor" stroke="none"/><path d="M17.5 5.5v13"/>',
    volume: '<path d="M4.5 9.5v5h3l4 3.5V6l-4 3.5z"/><path d="M15 9a4.5 4.5 0 0 1 0 6"/><path d="M17.5 6.5a8 8 0 0 1 0 11"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.6"/><circle cx="16.5" cy="16" r="2.6"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/>',
    heart: '<path d="M12 20.3S4 15.4 4 9.8A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.8c0 5.6-8 10.5-8 10.5z"/>',
    eye: '<path d="M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6S2.8 12 2.8 12z"/><circle cx="12" cy="12" r="2.6"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="3"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.3l3.4 2"/>',
    tag: '<path d="M4 5.5h7.2L20 14.3 14.3 20 5.5 11.2z"/><circle cx="8.6" cy="8.6" r="1.3"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="3"/><path d="m4.5 8 7.5 5.5L19.5 8"/>',
    link: '<path d="M10.5 13.5a4 4 0 0 0 5.6 0l2.6-2.6a4 4 0 0 0-5.6-5.6L11.6 6.8"/><path d="M13.5 10.5a4 4 0 0 0-5.6 0l-2.6 2.6a4 4 0 0 0 5.6 5.6l1.5-1.5"/>',
    external: '<path d="M14 4.5h5.5V10"/><path d="M19 5 11 13"/><path d="M18 14v4a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18V8.5A2.5 2.5 0 0 1 6 6h4"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="12" rx="2.5"/><path d="M5.5 15.5A2.5 2.5 0 0 1 3 13V5.5A2.5 2.5 0 0 1 5.5 3H13a2.5 2.5 0 0 1 2.5 2.5"/>',
    check: '<path d="m4.5 12.5 5 5L20 6.5"/>',
    sparkle: '<path d="M12 3.5c.8 4.2 2.3 5.7 6.5 6.5-4.2.8-5.7 2.3-6.5 6.5-.8-4.2-2.3-5.7-6.5-6.5 4.2-.8 5.7-2.3 6.5-6.5z"/><path d="M18.5 16.5c.3 1.7 1 2.4 2.7 2.7-1.7.3-2.4 1-2.7 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1 2.7-2.7z"/>',
    fish: '<path d="M4 12c3-4.2 7-6.3 11.2-6.3 2.2 0 4.2.6 5.8 1.6-1 1.1-1.6 2.4-1.8 4 .2 1.6.8 2.9 1.8 4-1.6 1-3.6 1.6-5.8 1.6C11 16.9 7 14.8 4 12z"/><path d="M4 12 1.8 8.6M4 12 1.8 15.4"/><circle cx="16" cy="10.6" r=".9" fill="currentColor" stroke="none"/>',
    whale: '<path d="M3 13.5c3.2.6 4.6-1 6.8-3.4 2.4-2.6 5.6-3.2 8.3-1.5 1 .6 1.7 1.5 2 2.6-1.7.4-2.7 1.1-3.3 2.2.9 1.7 2.3 2.6 3.3 3-2.2 2.3-5.3 3-8.7 2.2-3.8-.9-6.4-3-8.4-5.1z"/><path d="M20.3 11.2c.9-.2 1.7-.7 2.2-1.4-.1 1.2-.6 2.2-1.5 2.9"/><path d="M6.8 10.2c.7.1 1.2.5 1.5 1.1"/><circle cx="16.4" cy="11.9" r=".8" fill="currentColor" stroke="none"/>',
    crane: '<path d="M19.5 4.2c-1.3 2.1-3.1 3.7-5.3 4.6-2.4 1-4.1 2.9-4.8 5.4l-1.2 4.3"/><path d="M8.2 18.5c2.1-.2 3.9-1.2 5.2-2.9 1.2-1.6 2.9-2.6 4.9-3"/><path d="M14.2 8.8c1.4-.2 2.6-.9 3.5-2"/><path d="m18.6 3.7 1.5-.6-.9 1.5z" fill="currentColor" stroke="none"/>',
    wave: '<path d="M2.5 9.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2.5 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
    palette: '<path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.5 0 2.2-1 2.2-2.2 0-1.1-.7-1.9-.7-2.9 0-1.2 1-2 2.4-2h1.4c2 0 3.2-1.4 3.2-3.5C20.5 6 16.7 3.5 12 3.5z"/><circle cx="8" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"/><circle cx="16" cy="9.4" r="1.1" fill="currentColor" stroke="none"/><circle cx="7.5" cy="13.5" r="1.1" fill="currentColor" stroke="none"/>',
    quote: '<path d="M9.5 6.5C6.9 7.6 5.5 9.6 5.5 12.4V17h5v-5H8.2c0-1.9.9-3.2 2.6-4z"/><path d="M18.5 6.5c-2.6 1.1-4 3.1-4 5.9V17h5v-5h-2.3c0-1.9.9-3.2 2.6-4z"/>',
    code: '<path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4"/><path d="m13.5 5-3 14"/>',
    database: '<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6"/><path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="8.6" cy="8.6" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.4" cy="8.6" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.6" cy="15.4" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.4" cy="15.4" r="1.2" fill="currentColor" stroke="none"/>',
    film: '<rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="M8 5v14M16 5v14M3.5 9.5h4.5M3.5 14.5h4.5M16 9.5h4.5M16 14.5h4.5"/>',
    chart: '<path d="M4 19.5h16"/><rect x="6" y="11" width="3.4" height="6" rx="1"/><rect x="11.3" y="7" width="3.4" height="10" rx="1"/><rect x="16.6" y="13" width="3.4" height="4" rx="1"/>',
    shield: '<path d="M12 3.2 5 6v5.5c0 4.5 2.8 7.7 7 9.3 4.2-1.6 7-4.8 7-9.3V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    star: '<path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
    location: '<path d="M12 21s6.5-5.6 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.4"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    message: '<path d="M4 5.5h16v11H9l-5 4z"/><path d="M8.5 9.5h7M8.5 12.5h4.5"/>',
    send: '<path d="M20.5 3.5 10 14"/><path d="M20.5 3.5 14 20.5l-4-6.5-6.5-4z"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1" fill="currentColor" stroke="none"/>',
    alert: '<path d="M12 3.5 21 20H3z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>',
    download: '<path d="M12 3.5v11.5M7 10.5l5 5 5-5"/><path d="M4.5 18.5v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };

  function icon(name, cls) {
    return '<svg class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  function injectSprite() {
    const symbols = Object.keys(ICONS).map((k) => '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + "</symbol>").join("");
    const svg = '<svg class="svg-sprite" aria-hidden="true" focusable="false">' + symbols + "</svg>";
    document.body.insertAdjacentHTML("afterbegin", svg);
  }

  /* ------------------------------------------------------------------
     2. 品牌图形：徽标 / 头像 / 场景
     ------------------------------------------------------------------ */
  function logoSVG() {
    return '<svg viewBox="0 0 48 48" aria-hidden="true">' +
      '<defs><linearGradient id="lgLogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".24"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="22" fill="url(#lgLogo)"/>' +
      '<circle cx="33.5" cy="12.5" r="4.6" fill="#e0473f"/>' +
      '<path d="M15 40c-2.6-12 2.6-20.4 12-23" stroke="#fff" stroke-width="5.6" stroke-linecap="round" fill="none"/>' +
      '<circle cx="29.5" cy="14.5" r="7" fill="#fff"/>' +
      '<path d="m35.5 12.2 9-1.4-8 5.6z" fill="#ffe3b3"/>' +
      '<circle cx="30.6" cy="14.2" r="1.15" fill="#1b62c9"/>' +
      '<path d="M12.5 40c7.6 3 15.4 2.4 22.5-1.8" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".45"/>' +
      "</svg>";
  }

  function avatarSVG() {
    return '<svg viewBox="0 0 120 120" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="avBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ec2f5"/><stop offset=".55" stop-color="#2f80ed"/><stop offset="1" stop-color="#134f9f"/></linearGradient>' +
      '<linearGradient id="avFish" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d7ecff"/><stop offset="1" stop-color="#78b6ea"/></linearGradient>' +
      '</defs>' +
      '<circle cx="60" cy="60" r="60" fill="url(#avBg)"/>' +
      '<circle cx="94" cy="26" r="24" fill="#fff" opacity=".1"/>' +
      '<circle cx="22" cy="100" r="32" fill="#fff" opacity=".07"/>' +
      /* 浪花 */
      '<path d="M0 96c14-6 28-6 42 0s28 6 42 0 28-6 36 0v24H0z" fill="#0b3d77" opacity=".38"/>' +
      '<path d="M0 104c14-5 28-5 42 0s28 5 42 0 28-5 36 0v16H0z" fill="#0b3d77" opacity=".28"/>' +
      /* 鲸 */
      '<path d="M18 92c9 .6 16-3.4 23-10 6-6.4 14-7.4 21-3 2.8 1.8 4.6 4.2 5.4 7.2-3.4.6-6 2.4-7.4 4.8 2 3.4 4.8 5.2 7.4 6.2-5.2 4-11.8 5-18.8 3-8.6-2.4-17.4-5.2-30.6-8.2z" fill="url(#avFish)"/>' +
      '<circle cx="55" cy="85" r="1.6" fill="#0b3d77"/>' +
      /* 鹤颈与头 */
      '<path d="M40 98c-9-24 0-43 19-47" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none"/>' +
      '<circle cx="66" cy="44" r="14" fill="#fff"/>' +
      '<path d="M52 36c4-10 25-10 29 0-4 2.4-9 3.6-14.5 3.6S56 38.4 52 36z" fill="#e0473f"/>' +
      '<path d="m79 41 18 6-18 6z" fill="#ffe0b2"/>' +
      '<circle cx="70.5" cy="43" r="2" fill="#0b3d77"/>' +
      /* 星星 */
      '<circle cx="30" cy="30" r="2.2" fill="#fff" opacity=".8"/>' +
      '<circle cx="18" cy="52" r="1.5" fill="#fff" opacity=".5"/>' +
      '<circle cx="102" cy="66" r="1.7" fill="#fff" opacity=".55"/>' +
      "</svg>";
  }

  function sceneSVG() {
    return '<svg class="site-bg__sky" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="bgSkyGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" class="stop-sky-1"/><stop offset=".55" class="stop-sky-2"/><stop offset="1" class="stop-sky-3"/>' +
      "</linearGradient>" +
      '<radialGradient id="bgSunGrad"><stop offset="0" class="stop-sun"/><stop offset="1" class="stop-sun-2" stop-opacity="0"/></radialGradient>' +
      "</defs>" +
      '<rect width="1600" height="900" fill="url(#bgSkyGrad)"/>' +
      /* 太阳/月亮 */
      '<g class="bg-sun">' +
      '<circle cx="1268" cy="168" r="150" fill="url(#bgSunGrad)" opacity=".5"/>' +
      '<circle cx="1268" cy="168" r="58" class="sun"/>' +
      '<circle cx="1268" cy="168" r="78" class="sun-halo" opacity=".22"/>' +
      "</g>" +
      /* 星点与星座 */
      '<g class="bg-stars">' +
      '<circle class="star bg-star--twinkle" cx="180" cy="120" r="2.2"/>' +
      '<circle class="star bg-star--twinkle" cx="330" cy="70" r="1.6"/>' +
      '<circle class="star bg-star--twinkle" cx="470" cy="150" r="2"/>' +
      '<circle class="star bg-star--twinkle" cx="760" cy="86" r="1.4"/>' +
      '<circle class="star bg-star--twinkle" cx="1010" cy="130" r="2.4"/>' +
      '<circle class="star bg-star--twinkle" cx="1150" cy="66" r="1.5"/>' +
      '<circle class="star bg-star--twinkle" cx="1430" cy="240" r="1.8"/>' +
      '<circle class="star bg-star--twinkle" cx="90" cy="330" r="1.6"/>' +
      '<circle class="star bg-star--twinkle" cx="620" cy="260" r="1.8"/>' +
      '<circle class="star bg-star--twinkle" cx="900" cy="300" r="1.4"/>' +
      '<path d="M180 120 330 70l140 80 290-64 250 44" class="line" opacity=".35"/>' +
      '<circle class="star" cx="470" cy="150" r="3.4" opacity=".5" style="fill:#e0473f"/>' +
      "</g>" +
      /* 云 */
      '<g class="bg-cloud">' +
      '<path class="cloud" opacity=".72" d="M120 300c18-34 60-48 92-28 12-30 58-38 80-12 30-16 74 2 76 34 34 4 52 30 44 56-10 30-50 38-84 26H168c-44 0-70-40-48-76z"/>' +
      '<path class="cloud" opacity=".45" d="M980 240c14-26 46-36 70-22 10-22 44-28 60-9 22-12 56 2 58 26 26 4 40 24 34 44-8 22-38 28-64 20H1014c-34 0-54-30-34-59z"/>' +
      "</g>" +
      '<g class="bg-cloud bg-cloud--slow">' +
      '<path class="cloud" opacity=".5" d="M600 420c12-22 40-30 60-18 8-18 38-24 52-8 18-10 48 2 50 22 22 4 34 20 28 36-6 18-32 24-54 16H628c-28 0-46-26-28-48z"/>' +
      '<path class="cloud" opacity=".34" d="M1320 430c10-18 32-24 48-14 6-14 30-18 40-6 14-8 38 2 40 18 16 2 26 16 22 28-4 14-24 20-42 14h-76c-22 0-36-20-22-40z"/>' +
      "</g>" +
      /* 远山与丘陵 */
      '<path class="hill-far" opacity=".8" d="M0 660c120-46 210-52 320-18 96 30 160 4 250-28 120-42 240-24 330 22 90 46 200 34 300-6 130-52 260-40 400 14v256H0z"/>' +
      '<path class="hill-near" opacity=".9" d="M0 740c140-30 250-14 360 26 100 36 200 18 300-16 120-42 260-20 380 24 120 44 240 26 360-14 70-24 140-22 200 6v134H0z"/>' +
      /* 海浪线 */
      '<g class="bg-wave">' +
      '<path class="wave" d="M-80 800c40-18 80-18 120 0s80 18 120 0 80-18 120 0 80 18 120 0 80-18 120 0 80 18 120 0 80-18 120 0 80 18 120 0 80-18 120 0 80 18 120 0 80-18 120 0"/>' +
      '<path class="wave" opacity=".55" d="M-40 828c40-16 80-16 120 0s80 16 120 0 80-16 120 0 80 16 120 0 80-16 120 0 80 16 120 0 80-16 120 0 80 16 120 0 80-16 120 0 80 16 120 0 80-16 120 0"/>' +
      "</g>" +
      /* 鲸 */
      '<g transform="translate(980 470)"><g class="bg-whale">' +
      '<path class="whale-body" d="M0 60c28 3 52-10 74-32 26-26 60-34 92-20 28 13 44 38 42 66-2 30-24 54-56 64-36 11-76 2-108-20C22 103 6 84 0 60z"/>' +
      '<path class="whale-belly" d="M64 116c30 6 60 0 84-18-10 20-30 34-56 38-22 3-42-2-60-14 10 1 22 1 32-6z" opacity=".5"/>' +
      '<path class="whale-belly" d="M118 52c14-8 28-12 42-12-8 10-18 18-30 22z" opacity=".6"/>' +
      '<circle cx="178" cy="76" r="3.4" fill="#0b1622" opacity=".65"/>' +
      '<path d="M186 88c6-3 12-4 18-2" stroke="#0b1622" stroke-width="2" stroke-linecap="round" fill="none" opacity=".4"/>' +
      "</g></g>" +
      /* 鹤 */
      '<g transform="translate(300 380)"><g class="bg-crane">' +
      '<path class="crane" d="M0 40c22-2 38-12 50-30 10-16 26-24 44-22"/>' +
      '<path class="crane" d="M50 10c14-2 26-8 34-18"/>' +
      '<path class="crane" d="M0 40c14 6 28 6 42 0"/>' +
      '<path class="crane-fill" d="M46 7c5-2 10-2 15 0-4 4-9 6-15 6z"/>' +
      '<circle cx="38" cy="8" r="2" fill="#e0473f"/>' +
      "</g></g>" +
      '<g transform="translate(380 320) scale(.7)"><g class="bg-crane bg-crane--2">' +
      '<path class="crane" d="M0 40c22-2 38-12 50-30 10-16 26-24 44-22"/>' +
      '<path class="crane" d="M50 10c14-2 26-8 34-18"/>' +
      '<path class="crane" d="M0 40c14 6 28 6 42 0"/>' +
      '<circle cx="38" cy="8" r="2" fill="#e0473f"/>' +
      "</g></g>" +
      "</svg>";
  }

  // 渐变 stop 的颜色交给 CSS 变量
  const styleExtra = document.createElement("style");
  styleExtra.textContent = ".stop-sky-1{stop-color:var(--art-sky-1)}.stop-sky-2{stop-color:var(--art-sky-2)}.stop-sky-3{stop-color:var(--art-sky-3)}.stop-sun{stop-color:var(--art-sun)}.stop-sun-2{stop-color:var(--art-sun-2)}";
  document.head.appendChild(styleExtra);

  function injectBackground() {
    const bg = document.createElement("div");
    bg.className = "site-bg";
    bg.setAttribute("aria-hidden", "true");
    bg.innerHTML = sceneSVG() + '<div class="site-bg__grain"></div>';
    document.body.insertBefore(bg, document.body.firstChild);
    // 飘浮粒子
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 16; i++) {
      const p = document.createElement("span");
      p.className = "bg-particle" + (i % 5 === 0 ? " bg-particle--red" : "");
      p.style.left = Math.round(Math.random() * 96 + 2) + "%";
      p.style.bottom = Math.round(Math.random() * 40) + "%";
      p.style.animationDuration = (12 + Math.random() * 16).toFixed(1) + "s";
      p.style.animationDelay = (-Math.random() * 20).toFixed(1) + "s";
      p.style.width = p.style.height = (3 + Math.random() * 4).toFixed(1) + "px";
      frag.appendChild(p);
    }
    bg.appendChild(frag);
  }

  /* ------------------------------------------------------------------
     3. 导航 / 页脚
     ------------------------------------------------------------------ */
  function isActive(page) {
    if (page === PAGE) return true;
    if (PAGE === "article" && page === SUB) return true;
    if (page === "works" && PAGE === "work") return true;
    if (page === "posts" && PAGE === "post") return true;
    return false;
  }

  function renderNav() {
    const host = $("#site-nav");
    if (!host) return;
    const links = SITE.nav.map((it) =>
      '<a class="nav-link' + (isActive(it.page) ? " is-active" : "") + '" href="' + link(it.href) + '">' + icon(it.icon) + "<span>" + it.label + "</span></a>"
    ).join("");
    host.outerHTML = '<header class="site-nav" id="site-nav">' +
      '<nav class="nav-inner" aria-label="主导航">' +
      '<a class="brand" href="' + link("index.html") + '" aria-label="' + SITE.name + " 首页" + '">' +
      '<span class="brand__badge">' + logoSVG() + "</span>" +
      '<span class="brand__text"><span class="brand__name">' + SITE.name + '</span><span class="brand__sub">' + SITE.handle + "</span></span></a>" +
      '<div class="nav-menu">' + links + "</div>" +
      '<div class="nav-actions">' +
      '<button class="nav-icon-btn nav-icon-btn--search" data-open-search type="button" aria-label="搜索全站（快捷键 /）">' + icon("search") + "<span>搜索</span></button>" +
      '<button class="nav-icon-btn" data-open-decor type="button" aria-label="切换主页装饰">' + icon("palette") + "<span>装饰</span></button>" +
      '<a class="nav-user" href="' + link("about.html") + '" aria-label="关于 MyRwin">' +
      '<span class="nav-user__avatar" data-avatar></span><span class="nav-user__name">' + SITE.handle + '</span><span class="nav-user__dot"></span></a>' +
      '<button class="nav-icon-btn nav-burger" data-open-sheet type="button" aria-label="打开菜单">' + icon("menu") + "</button>" +
      "</div></nav></header>";
    $$("[data-avatar]").forEach((av) => { av.innerHTML = avatarSVG(); });
  }

  function renderFooter() {
    const host = $("#site-footer");
    if (!host) return;
    const navLinks = SITE.nav.map((it) => '<a href="' + link(it.href) + '">' + it.label + "</a>").join("");
    host.outerHTML = '<footer class="site-footer" id="site-footer"><div class="shell">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<div class="footer-brand__row"><span class="footer-brand__badge">' + logoSVG() + "</span>" +
      '<span><span class="footer-brand__name">' + SITE.name + '</span><br><span class="footer-brand__sub">' + SITE.latin + "</span></span></div>" +
      '<p class="footer-brand__desc">' + SITE.tagline + "</p>" +
      '<div class="btn-row"><a class="btn btn--sm btn--soft" href="' + link("works.html") + '">' + icon("works") + "看作品</a>" +
      '<button class="btn btn--sm btn--ghost" type="button" data-copy-email>' + icon("mail") + "联系我</button></div>" +
      "</div>" +
      '<div class="footer-col"><div class="footer-col__title">逛一逛</div><div class="footer-col__links">' + navLinks + "</div></div>" +
      '<div class="footer-col"><div class="footer-col__title">精选作品</div><div class="footer-col__links">' +
      '<a href="' + link("work-bidding.html") + '">招标数据采集与分析</a>' +
      '<a href="' + link("work-wargame.html") + '">《最后的狼踪》兵棋</a>' +
      '<a href="' + link("work-film.html") + '">95 秒宣传片</a></div></div>' +
      '<div class="footer-col"><div class="footer-col__title">小工具</div><div class="footer-col__links">' +
      '<a href="#" data-open-search>站内搜索</a><a href="#" data-open-decor>切换装饰</a>' +
      '<a href="#" data-open-sheet>移动端菜单</a><a href="#" data-to-top>回到顶部</a></div></div>' +
      "</div>" +
      '<div class="footer-bottom"><span>© <span data-year></span> ' + SITE.name + " · " + SITE.handle + " · 用 HTML / CSS / 原生 JS 手工搭建</span>" +
      '<span class="footer-bottom__links"><span>本站为个人作品展示，不使用真实姓名</span><a href="' + link("about.html") + '">关于本站</a></span></div>' +
      "</div></footer>";
  }

  /* ------------------------------------------------------------------
     4. 装饰主题
     ------------------------------------------------------------------ */
  const DECORS = [
    { id: "dawn", name: "晴空 · 鲸游", desc: "蓝白底色，鹤与鲸在云间" },
    { id: "night", name: "夜航 · 星鹤", desc: "深蓝夜色，红色是唯一的路标" },
    { id: "paper", name: "纸笺 · 鹤立", desc: "米白纸张，适合慢慢读的字" }
  ];

  function currentDecor() {
    const saved = localStorage.getItem("mrywin.decor");
    return DECORS.some((d) => d.id === saved) ? saved : "dawn";
  }
  function applyDecor(id) {
    document.documentElement.setAttribute("data-decor", id);
    localStorage.setItem("mrywin.decor", id);
    $$("[data-decor-option]").forEach((b) => b.classList.toggle("is-active", b.dataset.decorOption === id));
  }

  function openDecor() {
    closeDecor();
    const wrap = document.createElement("div");
    wrap.className = "decor-pop";
    wrap.id = "decor-pop";
    wrap.innerHTML = '<div class="decor-pop__title">主页装饰</div><div class="decor-pop__hint">选一个今天的状态，会记在这台设备上</div>' +
      '<div class="decor-options">' + DECORS.map((d) =>
        '<button type="button" class="decor-option' + (currentDecor() === d.id ? " is-active" : "") + '" data-decor-option="' + d.id + '">' +
        '<span class="decor-option__swatch decor-option__swatch--' + d.id + '"></span>' +
        '<span><span class="decor-option__name">' + d.name + '</span><br><span class="decor-option__desc">' + d.desc + "</span></span></button>"
      ).join("") + "</div>";
    document.body.appendChild(wrap);
    $$("[data-decor-option]", wrap).forEach((b) => b.addEventListener("click", () => {
      applyDecor(b.dataset.decorOption);
      toast("已切换装饰：" + (DECORS.find((d) => d.id === b.dataset.decorOption) || {}).name);
    }));
  }
  function closeDecor() { const el = $("#decor-pop"); if (el) el.remove(); }

  /* ------------------------------------------------------------------
     5. 移动端抽屉
     ------------------------------------------------------------------ */
  function buildSheet() {
    if ($("#mobile-sheet")) return;
    const el = document.createElement("div");
    el.className = "mobile-sheet";
    el.id = "mobile-sheet";
    el.innerHTML = '<div class="mobile-sheet__mask" data-close-sheet></div>' +
      '<div class="mobile-sheet__panel" role="dialog" aria-label="移动端导航">' +
      '<div class="mobile-sheet__head"><span class="brand"><span class="brand__badge">' + logoSVG() + "</span>" +
      '<span class="brand__text"><span class="brand__name">' + SITE.name + '</span><span class="brand__sub">' + SITE.handle + "</span></span></span>" +
      '<button class="nav-icon-btn" type="button" data-close-sheet aria-label="关闭菜单">' + icon("close") + "</button></div>" +
      '<div class="mobile-sheet__links">' + SITE.nav.map((it) =>
        '<a class="mobile-sheet__link' + (isActive(it.page) ? " is-active" : "") + '" href="' + link(it.href) + '">' + icon(it.icon) + it.label + "</a>"
      ).join("") + "</div>" +
      '<div class="mobile-sheet__foot"><button class="btn btn--soft btn--block" type="button" data-open-search>' + icon("search") + "站内搜索</button>" +
      '<button class="btn btn--soft btn--block" type="button" data-open-decor>' + icon("palette") + "装饰</button></div>" +
      "</div>";
    document.body.appendChild(el);
  }
  function openSheet() { buildSheet(); $("#mobile-sheet").classList.add("is-open"); document.body.classList.add("is-locked"); }
  function closeSheet() { const el = $("#mobile-sheet"); if (el) el.classList.remove("is-open"); document.body.classList.remove("is-locked"); closeDecor(); }

  /* ------------------------------------------------------------------
     6. Toast
     ------------------------------------------------------------------ */
  function toast(msg, iconName) {
    let stack = $(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = icon(iconName || "sparkle") + "<span>" + esc(msg) + "</span>";
    stack.appendChild(t);
    setTimeout(() => { t.style.transition = "opacity .3s, transform .3s"; t.style.opacity = "0"; t.style.transform = "translateY(8px)"; }, 2400);
    setTimeout(() => t.remove(), 2800);
  }

  /* ------------------------------------------------------------------
     7. 搜索索引
     ------------------------------------------------------------------ */
  function searchIndex() {
    return [
      { type: "页面", icon: "home", title: "首页", desc: "欢迎来到鹤与鱼的小站", href: "index.html", keys: "首页 home 欢迎 myrwin 鹤与鱼" },
      { type: "页面", icon: "works", title: "作品", desc: "数据、兵棋、影像与科研", href: "works.html", keys: "作品 项目 works portfolio" },
      { type: "页面", icon: "gallery", title: "图集", desc: "兵棋截图、图表与影片截帧", href: "gallery.html", keys: "图集 相册 gallery 图片" },
      { type: "页面", icon: "posts", title: "随笔", desc: "学习笔记、踩坑与复盘", href: "posts.html", keys: "随笔 文章 笔记 posts blog" },
      { type: "页面", icon: "about", title: "关于", desc: "关于 MyRwin 与这个小站", href: "about.html", keys: "关于 about 我 联系" },
      { type: "作品", icon: "database", title: "医院招标投标数据采集与分析", desc: "27 个官网、10709 条公告整理成可建模数据集", href: "work-bidding.html", keys: "招标 投标 数据采集 医院 分析 数据 清洗 sql python" },
      { type: "作品", icon: "dice", title: "《最后的狼踪》不对称战术兵棋", desc: "纸面规则做成能跑、能测、能联机的原型", href: "work-wargame.html", keys: "兵棋 狼踪 游戏 wargame 联机 ai 原型" },
      { type: "作品", icon: "film", title: "95 秒宣传片：每一帧都是程序画的", desc: "Pillow 逐帧合成 + ffmpeg 编码", href: "work-film.html", keys: "宣传片 视频 影像 film pillow ffmpeg 最后的狼踪" },
      { type: "作品", icon: "chart", title: "竞赛、实习与论文", desc: "统计建模竞赛、政府统计实习与一篇 SSCI", href: "work-research.html", keys: "竞赛 实习 论文 ssci 统计 建模 科研" },
    { type: "作品", icon: "chart", title: "832 份问卷与一次结构方程", desc: "分层三阶段抽样、832 份有效问卷，SEM 识别传播效能关键因素", href: "work-survey.html", keys: "问卷 市场调查 正大杯 sem 结构方程 量表 spss amos 黑神话 文化传播" },
    { type: "作品", icon: "database", title: "6 年出警数据，三个问题", desc: "SARIMA 预测、7 种模型对比、双目标选址优化，83 页论文", href: "work-modeling.html", keys: "数学建模 崇本杯 sarima 时间序列 选址 优化 topsis 出警 治安 83页 无人机 烟幕" },
      { type: "图集", icon: "gallery", title: "兵棋截图", desc: "棋盘、部署、回放与战果", href: "gallery.html#wargame", keys: "兵棋 截图 棋盘 部署 回放" },
      { type: "图集", icon: "chart", title: "数据图表", desc: "招标数据分析产出的图表", href: "gallery.html#data", keys: "图表 数据 可视化 roc 分布" },
      { type: "图集", icon: "film", title: "影片截帧", desc: "宣传片的程序化画面", href: "gallery.html#film", keys: "影片 截帧 宣传片" },
      { type: "随笔", icon: "posts", title: "27 个官网，10709 条公告：一次招标数据采集复盘", desc: "从散落的公告到能横向比较的数据集", href: "post-bidding.html", keys: "招标 数据 采集 复盘 爬虫 清洗" },
      { type: "随笔", icon: "posts", title: "把纸面兵棋做成能联机的程序", desc: "规则、状态机、AI 与自动化测试", href: "post-wargame.html", keys: "兵棋 程序 联机 测试 规则" },
      { type: "随笔", icon: "posts", title: "95 秒宣传片：每一帧都是程序画的", desc: "用 Pillow 和 ffmpeg 做一支片子的流程", href: "post-film.html", keys: "宣传片 视频 制作 流程" },
      { type: "随笔", icon: "posts", title: "用一张看板管住 12 周学习", desc: "数据驱动的小型进度系统", href: "post-kanban.html", keys: "看板 学习 计划 进度 数据" }
    ];
  }

  let searchState = { open: false, results: [], active: 0 };

  function buildSearch(results) {
    if (!results.length) {
      return '<div class="search-empty"><strong>没有找到相关内容</strong>换个关键词试试，比如「兵棋」「招标」「随笔」</div>';
    }
    return results.map((r, i) =>
      '<a class="search-result' + (i === searchState.active ? " is-active" : "") + '" href="' + link(r.href) + '" data-search-item="' + i + '">' +
      '<span class="search-result__icon">' + icon(r.icon) + "</span>" +
      '<span class="search-result__body"><span class="search-result__title">' + esc(r.title) + "</span>" +
      '<span class="search-result__desc">' + esc(r.desc) + "</span></span>" +
      '<span class="search-result__type">' + r.type + "</span></a>"
    ).join("");
  }

  function openSearch() {
    closeSearch();
    const el = document.createElement("div");
    el.className = "overlay-mask";
    el.id = "search-overlay";
    el.innerHTML = '<div class="search-modal" role="dialog" aria-modal="true" aria-label="站内搜索">' +
      '<div class="search-modal__head">' + icon("search") +
      '<input class="search-modal__input" id="search-input" type="search" placeholder="搜索作品、图集、随笔……" autocomplete="off">' +
      '<span class="search-modal__kbd">ESC</span></div>' +
      '<div class="search-results" id="search-results"></div></div>';
    document.body.appendChild(el);
    document.body.classList.add("is-locked");
    searchState = { open: true, results: [], active: 0 };
    const input = $("#search-input");
    const list = $("#search-results");
    const all = searchIndex();
    function render() {
      const q = input.value.trim().toLowerCase();
      const results = !q ? all.slice(0, 8) : all.filter((r) => (r.title + r.desc + r.keys + r.type).toLowerCase().includes(q));
      searchState.results = results;
      searchState.active = 0;
      list.innerHTML = buildSearch(results);
    }
    input.addEventListener("input", render);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeSearch(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); searchState.active = Math.min(searchState.active + 1, searchState.results.length - 1); list.innerHTML = buildSearch(searchState.results); }
      if (e.key === "ArrowUp") { e.preventDefault(); searchState.active = Math.max(searchState.active - 1, 0); list.innerHTML = buildSearch(searchState.results); }
      if (e.key === "Enter") {
        const r = searchState.results[searchState.active];
        if (r) window.location.href = link(r.href);
      }
    });
    el.addEventListener("mousedown", (e) => { if (e.target === el) closeSearch(); });
    render();
    setTimeout(() => input.focus(), 30);
  }
  function closeSearch() {
    const el = $("#search-overlay");
    if (el) el.remove();
    document.body.classList.remove("is-locked");
    searchState.open = false;
  }

  /* ------------------------------------------------------------------
     8. 灯箱
     ------------------------------------------------------------------ */
  function openLightbox(items, start) {
    const gallery = items;
    let idx = start;
    const el = document.createElement("div");
    el.className = "lightbox";
    el.id = "lightbox";
    function readSrc(item) {
      const img = item.querySelector("img");
      return img ? img.getAttribute("src") : item.dataset.src;
    }
    function readCap(item) {
      const cap = item.querySelector(".gallery-item__cap");
      return cap ? cap.textContent.replace(/\s+/g, " ").trim() : (item.getAttribute("data-caption") || "");
    }
    function render() {
      el.innerHTML = '<button class="lightbox__close" type="button" aria-label="关闭">' + icon("close") + "</button>" +
        '<img src="' + readSrc(gallery[idx]) + '" alt="">' +
        '<div class="lightbox__cap">' + esc(readCap(gallery[idx])) + "</div>";
    }
    el.addEventListener("click", (e) => {
      if (e.target.closest(".lightbox__close")) close();
      else if (e.target.tagName === "IMG") {
        idx = (idx + 1) % gallery.length;
        render();
      } else close();
    });
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowRight") { idx = (idx + 1) % gallery.length; render(); }
      else if (e.key === "ArrowLeft") { idx = (idx - 1 + gallery.length) % gallery.length; render(); }
    }
    document.addEventListener("keydown", onKey);
    function close() { el.remove(); document.body.classList.remove("is-locked"); document.removeEventListener("keydown", onKey); }
    render();
    document.body.appendChild(el);
    document.body.classList.add("is-locked");
  }

  function bindLightbox() {
    document.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery-item");
      if (!item) return;
      const scope = item.closest("[data-lightbox-scope]") || document;
      // 只把当前可见（未被筛选隐藏）的图纳入灯箱序列
      const items = $$(".gallery-item", scope).filter((el) => el.offsetParent !== null && !el.hidden);
      if (!items.length) return;
      e.preventDefault();
      openLightbox(items, Math.max(0, items.indexOf(item)));
    });
  }

  /* ------------------------------------------------------------------
     9. 音乐播放器（Web Audio 程序生成）
     ------------------------------------------------------------------ */
  const TRACKS = [
    { name: "鲸落", en: "Whale Fall", bpm: 68, dur: 104, root: 146.83, type: "whale" },
    { name: "鹤归", en: "Crane Return", bpm: 92, dur: 96, root: 196.0, type: "crane" },
    { name: "夜航", en: "Night Voyage", bpm: 78, dur: 112, root: 130.81, type: "night" }
  ];

  const Music = (function () {
    let ctx = null, master = null, reverb = null, timer = null;
    let trackIndex = 0, playing = false, startAt = 0, offset = 0;
    let nextTime = 0, step = 0, volume = 0.7;
    const listeners = [];

    const SCALES = { whale: [0, 2, 4, 7, 9], crane: [0, 2, 4, 7, 9], night: [0, 3, 5, 7, 10] };
    const PROGRESSIONS = {
      whale: [[0, 4, 7, 11], [-3, 2, 7, 9], [-5, 0, 4, 7], [-1, 4, 9, 11]],
      crane: [[0, 4, 7, 12], [2, 5, 9, 12], [-3, 2, 7, 11], [-1, 2, 7, 9]],
      night: [[0, 3, 7, 10], [-2, 3, 7, 12], [-4, 3, 5, 10], [-5, 2, 7, 9]]
    };
    function midiToFreq(root, semis) { return root * Math.pow(2, semis / 12); }

    function ensureCtx() {
      if (ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = volume * 0.7;
      reverb = ctx.createConvolver();
      reverb.buffer = makeImpulse(2.6, 2.2);
      const wet = ctx.createGain(); wet.gain.value = 0.32;
      reverb.connect(wet); wet.connect(master);
      master.connect(ctx.destination);
    }
    function makeImpulse(seconds, decay) {
      const rate = ctx.sampleRate, len = Math.floor(rate * seconds);
      const buf = ctx.createBuffer(2, len, rate);
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
      return buf;
    }
    function note(freq, when, dur, opts) {
      if (!ctx) return;
      opts = opts || {};
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filt = ctx.createBiquadFilter();
      osc.type = opts.type || "sine";
      osc.frequency.setValueAtTime(freq, when);
      if (opts.glide) osc.frequency.linearRampToValueAtTime(freq * opts.glide, when + dur);
      filt.type = "lowpass";
      filt.frequency.value = opts.cutoff || 1800;
      filt.Q.value = 0.7;
      const peak = (opts.gain || 0.18);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(peak, when + (opts.attack || 0.02));
      gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      osc.connect(filt); filt.connect(gain);
      gain.connect(master);
      if (opts.reverb !== false) gain.connect(reverb);
      osc.start(when); osc.stop(when + dur + 0.05);
    }
    function noise(when, dur, gainVal) {
      if (!ctx) return;
      const rate = ctx.sampleRate;
      const buf = ctx.createBuffer(1, Math.floor(rate * dur), rate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
      const src = ctx.createBufferSource(); src.buffer = buf;
      const filt = ctx.createBiquadFilter(); filt.type = "bandpass"; filt.frequency.value = 700; filt.Q.value = 0.6;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.linearRampToValueAtTime(gainVal || 0.02, when + dur * 0.4);
      g.gain.linearRampToValueAtTime(0.0001, when + dur);
      src.connect(filt); filt.connect(g); g.connect(master);
      src.start(when); src.stop(when + dur);
    }
    function scheduleStep(when) {
      const t = TRACKS[trackIndex];
      const scale = SCALES[t.type];
      const prog = PROGRESSIONS[t.type][step % 4];
      const beat = 60 / t.bpm;
      const bar = 4;
      // 和弦 pad（每小节开始）
      if (step % bar === 0) {
        prog.slice(0, 3).forEach((semi, i) => {
          note(midiToFreq(t.root, semi) / 2, when + i * 0.03, beat * 3.6, { type: "sine", gain: 0.11, attack: 0.5, cutoff: 900 });
        });
      }
      // 琶音
      const arpPattern = [0, 2, 1, 3, 0, 3, 2, 1];
      const semi = scale[(arpPattern[step % arpPattern.length] + Math.floor(step / arpPattern.length)) % scale.length];
      const octave = (step % 8 < 4) ? 2 : 4;
      note(midiToFreq(t.root, semi + prog[0] + octave * 12), when, beat * 0.8, { type: t.type === "night" ? "triangle" : "sine", gain: 0.085, attack: 0.01, cutoff: 2600 });
      // 低音
      if (step % 2 === 0) note(midiToFreq(t.root, prog[0]) / 2, when, beat * 1.6, { type: "sine", gain: 0.13, attack: 0.04, cutoff: 400, reverb: false });
      // 特殊音色
      if (t.type === "whale" && step % 8 === 4) {
        note(midiToFreq(t.root, 12), when, beat * 2.4, { type: "sine", gain: 0.06, attack: 0.4, glide: 0.74, cutoff: 700 });
      }
      if (t.type === "crane" && step % 4 === 2) {
        note(midiToFreq(t.root, 24), when, beat * 0.5, { type: "triangle", gain: 0.045, attack: 0.005, cutoff: 3500 });
      }
      if (t.type === "night" && step % 8 === 0) {
        noise(when, beat * 3, 0.008);
      }
    }
    function scheduler() {
      if (!ctx || !playing) return;
      const lookahead = 0.35;
      while (nextTime < ctx.currentTime + lookahead) {
        scheduleStep(nextTime);
        nextTime += 60 / TRACKS[trackIndex].bpm / 2;
        step++;
      }
    }
    function loopTimer() {
      const dur = TRACKS[trackIndex].dur;
      const elapsed = ctx ? (ctx.currentTime - startAt + offset) : 0;
      if (elapsed >= dur) {
        startAt = ctx.currentTime;
        offset = 0;
        step = 0;
        nextTime = ctx.currentTime + 0.1;
      }
      emit();
    }
    function emit() {
      const t = TRACKS[trackIndex];
      const elapsed = playing && ctx ? ((ctx.currentTime - startAt + offset) % t.dur) : offset % t.dur;
      listeners.forEach((fn) => fn({ trackIndex: trackIndex, playing: playing, elapsed: elapsed, duration: t.dur, volume: volume, track: t }));
    }
    function play() {
      ensureCtx();
      if (!ctx) { toast("当前浏览器不支持 Web Audio", "alert"); return; }
      if (ctx.state === "suspended") ctx.resume();
      playing = true;
      startAt = ctx.currentTime;
      step = Math.floor((offset / TRACKS[trackIndex].dur) * TRACKS[trackIndex].bpm / 60 * 2) || 0;
      nextTime = ctx.currentTime + 0.08;
      if (timer) clearInterval(timer);
      timer = setInterval(loopTimer, 250);
      scheduler();
      emit();
    }
    function pause() {
      if (!playing) return;
      playing = false;
      offset = (ctx.currentTime - startAt + offset) % TRACKS[trackIndex].dur;
      if (timer) clearInterval(timer);
      timer = null;
      if (master) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.05);
        setTimeout(() => { if (!playing && master) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(volume * 0.7, ctx.currentTime); } }, 300);
      }
      emit();
    }
    function toggle() { if (playing) pause(); else play(); }
    function next(dir) {
      offset = 0; step = 0;
      trackIndex = (trackIndex + (dir || 1) + TRACKS.length) % TRACKS.length;
      if (playing) { if (ctx && master) master.gain.cancelScheduledValues(ctx.currentTime); if (timer) clearInterval(timer); timer = null; playing = false; play(); }
      emit();
    }
    function seek(pct) {
      const t = TRACKS[trackIndex];
      offset = Math.max(0, Math.min(0.999, pct)) * t.dur;
      if (playing) {
        startAt = ctx ? ctx.currentTime : 0;
        step = Math.floor(offset / t.dur * t.bpm / 60 * 2) || 0;
        nextTime = startAt + 0.05;
        offset = 0; // 通过 startAt 重新计时，进度从 0 显示会跳，简化处理：
        offset = pct * t.dur;
      }
      emit();
    }
    function setVolume(v) {
      volume = v;
      if (master && ctx) master.gain.setTargetAtTime(v * 0.7, ctx.currentTime, 0.05);
      emit();
    }
    function onChange(fn) { listeners.push(fn); fn({ trackIndex, playing, elapsed: offset, duration: TRACKS[trackIndex].dur, volume, track: TRACKS[trackIndex] }); }
    return { toggle, next, seek, setVolume, onChange, TRACKS, get playing() { return playing; }, get trackIndex() { return trackIndex; } };
  })();

  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    return String(Math.floor(sec / 60)) + ":" + String(sec % 60).padStart(2, "0");
  }

  function artForTrack(t) {
    const palettes = {
      whale: ["#69b3ff", "#0d3e7d", "#ffb3ad"],
      crane: ["#9fd0ff", "#14508f", "#ffd9a8"],
      night: ["#6a83ff", "#101f3a", "#ff8078"]
    };
    const p = palettes[t.type];
    return '<svg viewBox="0 0 120 120" aria-hidden="true">' +
      '<defs><radialGradient id="discGrad' + t.type + '" cx=".32" cy=".28" r=".9"><stop offset="0" stop-color="' + p[0] + '"/><stop offset=".62" stop-color="' + p[1] + '"/><stop offset="1" stop-color="#06121f"/></radialGradient></defs>' +
      '<circle cx="60" cy="60" r="60" fill="url(#discGrad' + t.type + ')"/>' +
      '<circle cx="60" cy="60" r="22" fill="none" stroke="' + p[2] + '" stroke-width="2" opacity=".6"/>' +
      '<circle cx="60" cy="60" r="9" fill="#06121f" opacity=".7"/>' +
      '<path d="M30 70c8 .5 14-3 20-9 6-7 14-9 22-4 3 1.4 5 3.6 6 6.4-4 .6-7 2.4-8.6 5 2.4 4 5.6 6 8.6 7-5.4 4.4-12.6 5.6-20.4 3.8C44 76.6 36 73.4 30 70z" fill="#eaf5ff" opacity=".9"/>' +
      '<path d="M78 59c2.4-.6 4.4-1.8 6-3.4-.4 2.8-1.7 5-4 6.4" stroke="#ffd9d6" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="64" cy="66" r="1.6" fill="#0d3e7d"/>' +
      '<path d="M88 26c-4 5-9 8.2-15 10-5.6 1.8-9.4 6-11 12.6l-1.4 6.6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>' +
      '<path d="M60 62c5-.6 9-3 12-7 3-4 7-6.4 12.4-7.2" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>' +
      '<circle cx="79" cy="37" r="2.2" fill="' + p[2] + '"/>' +
      "</svg>";
  }

  function initPlayer() {
    const card = $("#music-player");
    if (!card) return;
    const disc = $("[data-player-art]", card);
    const title = $("[data-player-title]", card);
    const artist = $("[data-player-artist]", card);
    const cur = $("[data-player-cur]", card);
    const dur = $("[data-player-dur]", card);
    const fill = $("[data-player-fill]", card);
    const toggle = $("[data-player-toggle]", card);
    const listEl = $("[data-player-list]", card);
    const vol = $("[data-player-volume]", card);
    const volVal = $("[data-player-volval]", card);

    function renderList() {
      listEl.innerHTML = Music.TRACKS.map((t, i) =>
        '<button class="player-track' + (i === Music.trackIndex ? " is-current" : "") + '" type="button" data-track="' + i + '">' +
        '<span class="player-track__idx">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="player-track__name">' + t.name + " · " + t.en + "</span>" +
        '<span class="player-track__bpm">' + t.bpm + " BPM</span></button>"
      ).join("");
      $$("[data-track]", listEl).forEach((b) => b.addEventListener("click", () => {
        const want = Number(b.dataset.track);
        while (Music.trackIndex !== want) Music.next(1);
        renderList();
      }));
    }
    Music.onChange((s) => {
      const t = s.track;
      title.textContent = t.name;
      artist.textContent = t.en + " · 程序生成";
      if (disc) disc.innerHTML = artForTrack(t);
      cur.textContent = fmtTime(s.elapsed);
      dur.textContent = fmtTime(s.duration);
      fill.style.width = Math.min(100, (s.elapsed / s.duration) * 100) + "%";
      card.classList.toggle("is-playing", s.playing);
      toggle.innerHTML = icon(s.playing ? "pause" : "play");
      toggle.setAttribute("aria-label", s.playing ? "暂停" : "播放");
      card.classList.toggle("is-playing", s.playing);
      $$(".player-track", listEl).forEach((b, i) => b.classList.toggle("is-current", i === Music.trackIndex));
      if (vol) { vol.value = Math.round(s.volume * 100); volVal.textContent = Math.round(s.volume * 100); }
    });
    toggle.addEventListener("click", () => Music.toggle());
    $("[data-player-prev]", card).addEventListener("click", () => Music.next(-1));
    $("[data-player-next]", card).addEventListener("click", () => Music.next(1));
    $("[data-player-list-btn]", card).addEventListener("click", () => card.classList.toggle("is-listed"));
    const bar = $("[data-player-bar]", card);
    bar.addEventListener("click", (e) => {
      const rect = bar.getBoundingClientRect();
      Music.seek((e.clientX - rect.left) / rect.width);
    });
    vol.addEventListener("input", () => Music.setVolume(vol.value / 100));
    renderList();
  }

  /* ------------------------------------------------------------------
     10. 留言板
     ------------------------------------------------------------------ */
  const GUEST_KEY = "mrywin.guestbook.v1";
  function defaultGuestbook() {
    return [
      { name: "小鲸鱼", text: "路过，被这只鹤和鲸鱼圈粉了。", time: "2026-10-19 21:12" },
      { name: "路过的鹤", text: "数据、兵棋和影像放在一起，居然很和谐。", time: "2026-10-19 22:03" },
      { name: "未来的自己", text: "希望下次来的时候，作品已经上线了。", time: "2026-10-19 22:40" }
    ];
  }
  function getGuestbook() {
    try {
      const raw = localStorage.getItem(GUEST_KEY);
      if (!raw) return defaultGuestbook();
      const data = JSON.parse(raw);
      return Array.isArray(data) && data.length ? data : defaultGuestbook();
    } catch (e) { return defaultGuestbook(); }
  }
  function saveGuestbook(list) {
    try { localStorage.setItem(GUEST_KEY, JSON.stringify(list.slice(0, 30))); } catch (e) {}
  }
  function renderGuestbook(target) {
    if (!target) return;
    const list = getGuestbook();
    target.innerHTML = list.slice(0, 8).map((g) =>
      '<div class="guest-item"><span class="guest-item__avatar">' + esc(String(g.name || "?").slice(0, 1)) + "</span>" +
      '<div class="guest-item__body"><div class="guest-item__head"><span class="guest-item__name">' + esc(g.name) + '</span>' +
      '<span class="guest-item__time">' + esc(g.time) + "</span></div>" +
      '<div class="guest-item__text">' + esc(g.text) + "</div></div></div>"
    ).join("");
  }
  function initGuestbook() {
    $$("[data-guestbook-list]").forEach(renderGuestbook);
    $$("[data-guestbook-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = (form.querySelector('[name="name"]') || {}).value || "匿名游客";
        const text = (form.querySelector('[name="text"]') || {}).value || "";
        if (!text.trim()) { toast("先写一句再发送吧", "info"); return; }
        const now = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        const time = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) + " " + pad(now.getHours()) + ":" + pad(now.getMinutes());
        const list = getGuestbook();
        list.unshift({ name: name.trim().slice(0, 12), text: text.trim().slice(0, 140), time: time });
        saveGuestbook(list);
        $$("[data-guestbook-list]").forEach(renderGuestbook);
        form.reset();
        toast("留言已收进本机的小盒子", "heart");
      });
    });
  }

  /* ------------------------------------------------------------------
     11. 通用交互：搜索/装饰入口、回到顶部、复制邮箱、年份
     ------------------------------------------------------------------ */
  function bindGlobal() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (t.closest("[data-open-search]")) { e.preventDefault(); closeSheet(); closeDecor(); openSearch(); }
      if (t.closest("[data-open-decor]")) { e.preventDefault(); closeSheet(); openDecor(); }
      if (t.closest("[data-open-sheet]")) { e.preventDefault(); openSheet(); }
      if (t.closest("[data-close-sheet]")) { closeSheet(); }
      if (t.closest("[data-to-top]")) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
      if (t.closest("[data-copy-email]")) {
        e.preventDefault();
        const email = SITE.email;
        if (!email) { toast("还没公开邮箱，先用站内留言板找我吧", "mail"); return; }
        if (navigator.clipboard) navigator.clipboard.writeText(email).then(() => toast("邮箱已复制：" + email, "check")).catch(() => toast(email, "mail"));
        else toast(email, "mail");
      }
      if (!t.closest("#decor-pop") && !t.closest("[data-open-decor]")) closeDecor();
    });
    document.addEventListener("keydown", (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || tag === "select";
      if (e.key === "/" && !typing) { e.preventDefault(); openSearch(); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
      if (e.key === "Escape") { closeSearch(); closeSheet(); closeDecor(); }
    });
    $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
    // 回到顶部按钮
    const btn = document.createElement("button");
    btn.className = "to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "回到顶部");
    btn.innerHTML = icon("arrow-up");
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(btn);
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        btn.classList.toggle("is-visible", y > 600);
        const nav = $(".site-nav");
        if (nav) nav.classList.toggle("is-hidden", y > 480 && y > (window.__lastY || 0) && !document.body.classList.contains("nav-pinned"));
        window.__lastY = y;
        ticking = false;
      });
    }, { passive: true });
    // 导航下滑隐藏后，动一下鼠标就回来
    document.addEventListener("mousemove", (e) => {
      if (e.clientY < 90) { const nav = $(".site-nav"); if (nav) nav.classList.remove("is-hidden"); }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     12. 动效：reveal / 数字滚动 / 打字机 / 进度条
     ------------------------------------------------------------------ */
  function initReveal() {
    const els = $$("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-revealed")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-revealed");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el, i) => {
      if (!el.style.getPropertyValue("--reveal-delay") && el.hasAttribute("data-reveal-delay")) el.style.setProperty("--reveal-delay", el.dataset.revealDelay + "ms");
      io.observe(el);
    });
  }

  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = (el) => {
      const target = Number(el.dataset.count) || 0;
      if (reduce) { el.textContent = target; return; }
      const start = performance.now();
      const duration = 1200;
      const isZero = target === 0;
      function frame(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  }

  function initProgress() {
    const els = $$("[data-progress]");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target;
          el.style.width = Math.max(0, Math.min(100, Number(el.dataset.progress) || 0)) + "%";
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    els.forEach((el) => io.observe(el));
  }

  function initTypewriter() {
    const el = $("[data-typewriter]");
    if (!el) return;
    const phrases = JSON.parse(el.dataset.typewriter);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const textEl = document.createElement("span");
    textEl.className = "hero-quote__text";
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    el.innerHTML = "";
    el.appendChild(textEl);
    el.appendChild(cursor);
    if (reduce) { el.closest(".hero-quote").querySelector("[data-typewriter-fallback]")?.remove(); el.replaceChildren(); el.appendChild(textEl); textEl.textContent = phrases[0]; return; }
    let pi = 0, ci = 0, deleting = false;
    function tick() {
      const phrase = phrases[pi];
      if (!deleting) {
        ci++;
        textEl.textContent = phrase.slice(0, ci);
        if (ci >= phrase.length) { deleting = true; setTimeout(tick, 2200); return; }
        setTimeout(tick, 95 + Math.random() * 60);
      } else {
        ci--;
        textEl.textContent = phrase.slice(0, ci);
        if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 380); return; }
        setTimeout(tick, 32);
      }
    }
    setTimeout(tick, 400);
  }

  function initDays() {
    $$("[data-days]").forEach((el) => {
      const start = new Date(SITE.birthday + "T00:00:00+08:00");
      const days = Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000) + 1);
      if (el.hasAttribute("data-count")) el.dataset.count = days;
      el.textContent = days;
    });
  }


  function fillStats() {
    $$("[data-stat]").forEach((el) => {
      const k = el.dataset.stat;
      if (SITE.stats[k] != null) {
        if (el.hasAttribute("data-count")) el.dataset.count = SITE.stats[k];
        else el.textContent = SITE.stats[k];
      }
    });
  }

  /* ------------------------------------------------------------------
     13. 筛选 / 文章读条 / 目录 / 点赞 / 回到正文链接
     ------------------------------------------------------------------ */
  function initFilters() {
    $$("[data-filter-group]").forEach((group) => {
      const chips = $$("[data-filter]", group);
      const scopeSel = group.dataset.filterGroup || "";
      const scope = scopeSel ? $(scopeSel) : group.parentElement;
      if (!scope) return;
      const items = $$("[data-tags]", scope);
      const countEl = scope.parentElement ? scope.parentElement.querySelector("[data-filter-count]") : null;
      function apply(tag) {
        let n = 0;
        items.forEach((item) => {
          const tags = (item.dataset.tags || "").split(" ");
          const show = tag === "all" || tags.indexOf(tag) >= 0;
          item.hidden = !show;
          if (show) n++;
        });
        chips.forEach((c) => c.classList.toggle("is-active", c.dataset.filter === tag));
        if (countEl) countEl.innerHTML = "共 <strong>" + n + "</strong> 项";
      }
      chips.forEach((c) => c.addEventListener("click", () => apply(c.dataset.filter)));
      const initial = chips.filter((c) => c.classList.contains("is-active"))[0];
      apply(initial ? initial.dataset.filter : "all");
    });
  }

  function initArticle() {
    const prose = $(".prose");
    if (!prose) return;
    const bar = document.createElement("div");
    bar.className = "reading-progress";
    document.body.appendChild(bar);
    function update() {
      const rect = prose.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.55;
      const passed = -rect.top + window.innerHeight * 0.35;
      bar.style.width = Math.max(0, Math.min(100, (passed / Math.max(1, total)) * 100)) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();

    // 目录高亮
    const tocLinks = $$("[data-toc] a");
    if (tocLinks.length) {
      const heads = tocLinks.map((a) => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          tocLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href").slice(1) === en.target.id));
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      heads.forEach((h) => io.observe(h));
    }

    // 点赞
    $$("[data-like]").forEach((btn) => {
      const key = "mrywin.like." + btn.dataset.like;
      const base = Number(btn.dataset.likeBase || 0);
      const liked = localStorage.getItem(key) === "1";
      const countEl = btn.querySelector("[data-like-count]");
      function set(l) {
        const n = base + (l ? 1 : 0);
        if (countEl) countEl.textContent = n;
        btn.classList.toggle("is-liked", l);
      }
      set(liked);
      btn.addEventListener("click", () => {
        const l = btn.classList.contains("is-liked");
        localStorage.setItem(key, l ? "0" : "1");
        set(!l);
        if (!l) toast("收到你的喜欢啦", "heart");
      });
    });
  }

  /* ------------------------------------------------------------------
     14. 启动
     ------------------------------------------------------------------ */
  function boot() {
    document.documentElement.setAttribute("data-decor", currentDecor());
    injectSprite();
    injectBackground();
    renderNav();
    renderFooter();
    bindGlobal();
    bindLightbox();
    initPlayer();
    initGuestbook();
    fillStats();
    initDays();
    initTypewriter();
    initCounters();
    initProgress();
    initReveal();
    initFilters();
    initArticle();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // 对外暴露一点小工具，方便页面脚本使用
  window.MRYWIN = { SITE, toast, icon, avatarSVG, logoSVG, openSearch };
})();
