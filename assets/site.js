// 数学学習サイト 共通スクリプト
// data/*.js を読み込んだあとに読み込むこと。
// 科目・単元の一覧（CURRICULUM）と、教材データ（APP_DATA / PRINT_DATA / VIDEO_DATA）、
// お知らせ（NEWS_DATA）、勉強のヒント（TIPS_DATA）、数学いろいろ（TOPIC_DATA）から各ページを組み立てる。
(function(){
  'use strict';

  // 「数学Ⅰ」「数学I」「数学１」などの表記ゆれを吸収して比較する
  const norm = s => String(s == null ? '' : s).normalize('NFKC').replace(/\s+/g, '').toUpperCase();
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const param = k => new URLSearchParams(location.search).get(k) || '';

  const D = {
    curriculum: typeof CURRICULUM !== 'undefined' ? CURRICULUM : [],
    apps:       typeof APP_DATA   !== 'undefined' ? APP_DATA   : [],
    prints:     typeof PRINT_DATA !== 'undefined' ? PRINT_DATA : [],
    videos:     typeof VIDEO_DATA !== 'undefined' ? VIDEO_DATA : [],
    news:       typeof NEWS_DATA  !== 'undefined' ? NEWS_DATA  : [],
    tips:       typeof TIPS_DATA  !== 'undefined' ? TIPS_DATA  : [],
    topics:     typeof TOPIC_DATA !== 'undefined' ? TOPIC_DATA : []
  };

  // ---- 検索・集計 ----
  function findSubject(key){
    const k = norm(key);
    return D.curriculum.find(s => s.id === key || norm(s.name) === k) || null;
  }
  function findUnit(subject, key){
    const k = norm(key);
    return subject.units.find(u => u.id === key || norm(u.name) === k) || null;
  }
  function belongs(item, subject, unit){
    return norm(item.subject) === norm(subject.name) && (!unit || norm(item.unit) === norm(unit.name));
  }
  const itemsFor = (list, subject, unit) => list.filter(x => belongs(x, subject, unit));
  function counts(subject, unit){
    return {
      apps:   itemsFor(D.apps,   subject, unit).length,
      prints: itemsFor(D.prints, subject, unit).length,
      videos: itemsFor(D.videos, subject, unit).length
    };
  }
  const total = c => c.apps + c.prints + c.videos;
  const subjectUrl = s => 'subject.html?s=' + encodeURIComponent(s.id);
  const unitUrl = (s, u) => 'unit.html?s=' + encodeURIComponent(s.id) + '&u=' + encodeURIComponent(u.id);
  const topicId = i => 't' + (i + 1);

  function fmtDate(iso){
    const m = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/.exec(iso || '');
    if(!m) return esc(iso || '');
    return `${m[1]}年${+m[2]}月${+m[3]}日`;
  }
  function countText(c){
    const parts = [];
    if(c.apps)   parts.push(`アプリ ${c.apps}`);
    if(c.prints) parts.push(`プリント ${c.prints}`);
    if(c.videos) parts.push(`動画 ${c.videos}`);
    return parts.join('・');
  }
  const snippet = (s, n) => { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n) + '…' : t; };

  // ---- カードの描画 ----
  function appCard(a){
    return `<a class="card" href="${esc(a.file)}">
      <span class="tag">アプリ</span>
      <h3>${esc(a.title)}</h3>
      ${a.description ? `<p>${esc(a.description)}</p>` : ''}
    </a>`;
  }
  function printCard(p){
    const label = `${p.title}（PDFファイル、新しいタブで開きます）`;
    return `<a class="card" href="${esc(encodeURI(p.file))}" target="_blank" rel="noopener" aria-label="${esc(label)}">
      <span class="tag">PDF</span>
      <h3>${esc(p.title)}</h3>
      ${p.note ? `<p>${esc(p.note)}</p>` : ''}
    </a>`;
  }
  function videoCard(v){
    return `<div class="video-card">
      <div class="video-thumb" data-yid="${esc(v.youtubeId)}" data-title="${esc(v.title)}" role="button" tabindex="0" aria-label="動画を再生：${esc(v.title)}">
        <img src="https://img.youtube.com/vi/${esc(v.youtubeId)}/hqdefault.jpg" alt="" loading="lazy">
        <span class="play-badge" aria-hidden="true"><span>▶</span></span>
      </div>
      <h3>${esc(v.title)}</h3>
      ${v.note ? `<p>${esc(v.note)}</p>` : ''}
    </div>`;
  }
  function bindVideoThumbs(root){
    root.querySelectorAll('.video-thumb').forEach(el => {
      const play = () => {
        el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(el.dataset.yid)}?autoplay=1" title="${esc(el.dataset.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      };
      el.addEventListener('click', play);
      el.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); play(); } });
    });
  }
  function gridOr(items, renderer, emptyText){
    if(!items.length) return `<div class="placeholder">${esc(emptyText)}</div>`;
    return `<div class="grid">${items.map(renderer).join('')}</div>`;
  }
  function breadcrumb(el, items){
    el.innerHTML = items.map((it, i) => {
      const last = i === items.length - 1;
      const s = last ? `<span aria-current="page">${esc(it.name)}</span>` : `<a href="${esc(it.url)}">${esc(it.name)}</a>`;
      return i ? `<span class="sep" aria-hidden="true">›</span>${s}` : s;
    }).join('');
  }

  // ---- 更新情報（教材の added からの自動生成 ＋ 手書きのお知らせ） ----
  function updates(limit){
    const groups = new Map();
    const add = (arr, label) => arr.forEach(x => {
      if(!x.added) return;
      const s = findSubject(x.subject);
      const u = s ? findUnit(s, x.unit) : null;
      const key = `${x.added}|${s ? s.id : x.subject}|${u ? u.id : x.unit}`;
      if(!groups.has(key)) groups.set(key, { date: x.added, s, u, rawS: x.subject, rawU: x.unit, kinds: new Map() });
      const g = groups.get(key);
      g.kinds.set(label, (g.kinds.get(label) || 0) + 1);
    });
    add(D.apps, 'アプリ'); add(D.prints, 'プリント'); add(D.videos, '動画');

    const list = [];
    groups.forEach(g => {
      const where = g.s ? `${g.s.name}「${g.u ? g.u.name : g.rawU}」` : `${g.rawS}「${g.rawU}」`;
      const parts = [];
      g.kinds.forEach((n, label) => parts.push(`${label}${n}件`));
      list.push({
        date: g.date, kind: '教材追加', notice: false,
        text: `${where}に${parts.join('・')}を追加しました`,
        url: (g.s && g.u) ? unitUrl(g.s, g.u) : (g.s ? subjectUrl(g.s) : '')
      });
    });
    D.topics.forEach((t, i) => {
      if(!t.added) return;
      list.push({ date: t.added, kind: '数学いろいろ', notice: false, text: `「${t.title}」を追加しました`, url: 'iroiro.html#' + topicId(i) });
    });
    D.news.forEach(n => list.push({ date: n.date, kind: 'お知らせ', notice: true, text: n.text, url: n.url || '' }));
    list.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return limit ? list.slice(0, limit) : list;
  }
  function renderNews(id, limit){
    const el = document.getElementById(id);
    const items = updates(limit);
    if(!items.length){ el.innerHTML = '<li><span class="news-text">まだ更新情報はありません。</span></li>'; return; }
    el.innerHTML = items.map(it => `<li>
      <time datetime="${esc(it.date)}">${fmtDate(it.date)}</time>
      <span class="news-kind${it.notice ? ' notice' : ''}">${esc(it.kind)}</span>
      <span class="news-text">${it.url ? `<a href="${esc(it.url)}">${esc(it.text)}</a>` : esc(it.text)}</span>
    </li>`).join('');
  }

  // ---- トップページ ----
  function renderHeroButtons(id){
    const el = document.getElementById(id);
    const subjects = D.curriculum.map(s => {
      const t = total(counts(s, null));
      return `<a class="hero-btn${t ? '' : ' soon'}" href="${subjectUrl(s)}">
        <span class="name">${esc(s.name)}</span>
        <span class="meta">${t ? `教材 ${t}件` : '準備中'}</span>
      </a>`;
    });
    subjects.push(`<a class="hero-btn iroiro" href="iroiro.html">
      <span class="name">数学いろいろ</span>
      <span class="meta">読みもの・面白い話題</span>
    </a>`);
    el.innerHTML = subjects.join('');
  }
  function renderSubjectGrid(id){
    const el = document.getElementById(id);
    el.innerHTML = D.curriculum.map(s => {
      const t = total(counts(s, null));
      return `<a class="card subject-card${t ? '' : ' muted'}" href="${subjectUrl(s)}">
        <span class="tag">${s.units.length}単元</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.description || '')}</p>
        <span class="meta">${t ? `教材 ${t}件` : '準備中'}</span>
      </a>`;
    }).join('');
  }
  function renderTips(id){
    const el = document.getElementById(id);
    if(!D.tips.length){ el.innerHTML = '<div class="placeholder">準備中</div>'; return; }
    el.innerHTML = D.tips.map(t => `<div class="tip-card"><h3>${esc(t.title)}</h3><p>${esc(t.body)}</p></div>`).join('');
  }

  // ---- 数学いろいろ ----
  const topicsNewestFirst = () => D.topics.map((t, i) => ({ t, i })).sort((a, b) => String(b.t.added || '').localeCompare(String(a.t.added || '')));
  function renderTopicsTeaser(id, limit){
    const el = document.getElementById(id);
    const items = topicsNewestFirst().slice(0, limit || 3);
    if(!items.length){ el.innerHTML = '<div class="placeholder">面白い数学の話題や、参考になる情報をここに集めていきます。</div>'; return; }
    el.innerHTML = `<div class="grid">${items.map(({ t, i }) => `<a class="card" href="iroiro.html#${topicId(i)}">
      <span class="tag">読みもの</span>
      <h3>${esc(t.title)}</h3>
      <p>${esc(snippet(t.body, 60))}</p>
    </a>`).join('')}</div>`;
  }
  function renderTopicsPage(id){
    const el = document.getElementById(id);
    const items = topicsNewestFirst();
    if(!items.length){ el.innerHTML = '<div class="placeholder">まだ記事はありません。面白い数学の話題や、参考になる情報をここに集めていきます。</div>'; return; }
    el.innerHTML = items.map(({ t, i }) => `<article class="topic" id="${topicId(i)}">
      <h2>${esc(t.title)}</h2>
      ${t.added ? `<time datetime="${esc(t.added)}">${fmtDate(t.added)}</time>` : ''}
      <p>${esc(t.body)}</p>
      ${t.url ? `<p class="topic-link"><a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.urlLabel || t.url)}（新しいタブで開きます）</a></p>` : ''}
    </article>`).join('');
  }

  // ---- 科目ページ・単元ページ ----
  function renderSubjectPage(){
    const s = findSubject(param('s'));
    const crumb = document.getElementById('crumb');
    const title = document.getElementById('title');
    const lead  = document.getElementById('lead');
    const grid  = document.getElementById('unitGrid');
    if(!s){
      document.title = '見つかりません｜数学学習サイト';
      breadcrumb(crumb, [{ name:'トップ', url:'index.html' }, { name:'見つかりません' }]);
      title.textContent = '科目が見つかりません';
      lead.innerHTML = '<a href="index.html">トップページに戻る</a>';
      grid.innerHTML = '';
      return;
    }
    document.title = `${s.name}｜数学学習サイト`;
    breadcrumb(crumb, [{ name:'トップ', url:'index.html' }, { name:s.name }]);
    title.textContent = s.name;
    lead.textContent = s.description || '';
    grid.innerHTML = s.units.map((u, i) => {
      const c = counts(s, u), t = total(c);
      return `<a class="card${t ? '' : ' muted'}" href="${unitUrl(s, u)}">
        <span class="tag">単元${i + 1}</span>
        <h3>${esc(u.name)}</h3>
        <span class="meta">${t ? esc(countText(c)) : '<span class="badge-soon">準備中</span>'}</span>
      </a>`;
    }).join('');
  }
  function renderUnitPage(){
    const s = findSubject(param('s'));
    const u = s ? findUnit(s, param('u')) : null;
    const crumb = document.getElementById('crumb');
    const title = document.getElementById('title');
    const label = document.getElementById('subjectLabel');
    const secA = document.getElementById('appSection');
    const secP = document.getElementById('printSection');
    const secV = document.getElementById('videoSection');
    const nav  = document.getElementById('unitNav');
    if(!s || !u){
      document.title = '見つかりません｜数学学習サイト';
      breadcrumb(crumb, [{ name:'トップ', url:'index.html' }, { name:'見つかりません' }]);
      title.textContent = '単元が見つかりません';
      label.innerHTML = '<a href="index.html">トップページに戻る</a>';
      [secA, secP, secV, nav].forEach(e => e.innerHTML = '');
      return;
    }
    document.title = `${u.name}｜${s.name}｜数学学習サイト`;
    breadcrumb(crumb, [{ name:'トップ', url:'index.html' }, { name:s.name, url:subjectUrl(s) }, { name:u.name }]);
    label.innerHTML = `<a href="${subjectUrl(s)}">${esc(s.name)}</a>`;
    title.textContent = u.name;
    secA.innerHTML = gridOr(itemsFor(D.apps,   s, u), appCard,   'この単元のアプリは準備中です。');
    secP.innerHTML = gridOr(itemsFor(D.prints, s, u), printCard, 'この単元のプリントは準備中です。');
    secV.innerHTML = gridOr(itemsFor(D.videos, s, u), videoCard, 'この単元の参考動画は準備中です。');
    bindVideoThumbs(secV);
    const i = s.units.indexOf(u);
    const prev = s.units[i - 1], next = s.units[i + 1];
    nav.innerHTML = `<span>${prev ? `<a href="${unitUrl(s, prev)}">← ${esc(prev.name)}</a>` : ''}</span>
      <span>${next ? `<a href="${unitUrl(s, next)}">${esc(next.name)} →</a>` : ''}</span>`;
  }

  // データの科目名・単元名がカリキュラムに無い場合は console に警告（表示はされない）
  [['apps', D.apps], ['prints', D.prints], ['videos', D.videos]].forEach(([name, arr]) => {
    arr.forEach(x => {
      const s = findSubject(x.subject);
      if(!s || !findUnit(s, x.unit)){
        console.warn(`[site] ${name}: 科目/単元がカリキュラムに見つかりません →`, x.subject, x.unit, x.title);
      }
    });
  });

  window.Site = {
    renderHeroButtons, renderSubjectGrid, renderNews, renderTips,
    renderTopicsTeaser, renderTopicsPage, renderSubjectPage, renderUnitPage, updates
  };
})();
