// トップページの背景演出：
//   深い紺の空間に青い星雲（ネビュラ）が光り、結晶のかけらが漂い、薄いグリッド線が走る。
// - prefers-reduced-motion（動きを減らす設定）のときは動かさず1枚の静止画として描く
// - 星雲は縮小した裏キャンバスに描いてから拡大表示し、30fps程度に抑えて負荷を軽くしている
(function(){
  'use strict';
  const canvas = document.getElementById('heroCanvas');
  if(!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const off = document.createElement('canvas');
  const octx = off.getContext('2d');
  const NEB_SCALE = 0.3;

  let w = 0, h = 0, dpr = 1, ow = 1, oh = 1;
  const blobs = [], sparks = [], shards = [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const gauss = () => { let s = 0; for(let i = 0; i < 4; i++) s += Math.random(); return (s - 2) / 2; };

  function resize(){
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    if(!cw || !ch) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = cw; h = ch;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ow = Math.max(1, Math.round(w * NEB_SCALE)); oh = Math.max(1, Math.round(h * NEB_SCALE));
    off.width = ow; off.height = oh;
    return true;
  }

  function init(){
    blobs.length = 0; sparks.length = 0; shards.length = 0;
    const cx = w * 0.5, cy = h * 0.45, base = Math.min(w, h);
    // 青〜白の星雲
    const palette = [
      [37,99,235], [59,130,246], [96,165,250], [147,197,253],
      [191,219,254], [125,211,252], [255,255,255]
    ];
    for(let i = 0; i < 30; i++){
      const c = palette[i % palette.length];
      const big = i < 10;
      const hx = cx + gauss() * w * 0.30, hy = cy + gauss() * h * 0.24;
      blobs.push({
        x: hx, y: hy, hx, hy,
        r: big ? base * rnd(0.24, 0.48) : base * rnd(0.07, 0.20),
        c, a: big ? rnd(0.09, 0.16) : rnd(0.14, 0.30),
        vx: rnd(-0.12, 0.12), vy: rnd(-0.08, 0.08),
        ph: rnd(0, 6.28), sp: rnd(0.003, 0.007)
      });
    }
    // 中心の明るい芯
    for(let i = 0; i < 8; i++){
      const hx = cx + gauss() * w * 0.12, hy = cy + gauss() * h * 0.12;
      blobs.push({
        x: hx, y: hy, hx, hy,
        r: base * rnd(0.05, 0.13), c: [215,238,255], a: rnd(0.16, 0.30),
        vx: rnd(-0.1, 0.1), vy: rnd(-0.06, 0.06), ph: rnd(0, 6.28), sp: rnd(0.004, 0.008)
      });
    }
    // 星雲の中の細かな輝き
    for(let i = 0; i < 260; i++){
      sparks.push({
        x: cx + gauss() * w * 0.33, y: cy + gauss() * h * 0.30,
        r: rnd(0.4, 1.6), a: rnd(0.2, 0.9), ph: rnd(0, 6.28),
        vy: rnd(-0.06, 0.03), vx: rnd(-0.04, 0.04)
      });
    }
    // 漂う結晶のかけら
    for(let i = 0; i < 44; i++){
      const n = 3 + Math.floor(Math.random() * 4);
      const R = rnd(3, 22) * (Math.random() < 0.15 ? 1.8 : 1);
      const pts = [];
      for(let k = 0; k < n; k++){
        const ang = k / n * Math.PI * 2 + rnd(-0.3, 0.3);
        const rr = R * rnd(0.6, 1);
        pts.push([Math.cos(ang) * rr, Math.sin(ang) * rr]);
      }
      const nearBottom = Math.random() < 0.45;
      shards.push({
        x: rnd(0, w), y: nearBottom ? rnd(h * 0.6, h) : rnd(0, h),
        pts, rot: rnd(0, 6.28), spin: rnd(-0.004, 0.004),
        vx: rnd(-0.08, 0.08), vy: rnd(-0.12, 0.05),
        fill: Math.random() < 0.5 ? [200,230,255] : [120,180,255],
        fa: rnd(0.08, 0.30), sa: rnd(0.4, 0.9), big: R > 14
      });
    }
  }

  let t = 0, last = 0;

  function drawGrid(){
    ctx.save();
    ctx.translate(w * 0.5, h * 0.42);
    ctx.rotate(reduce ? 0 : t * 0.0004);
    const R = Math.max(w, h) * 0.75;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(140,190,255,0.10)';
    for(let i = 1; i <= 6; i++){
      ctx.beginPath(); ctx.ellipse(0, 0, R * i / 6, R * i / 6 * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(140,190,255,0.06)';
    for(let k = 0; k < 12; k++){
      const a = k / 12 * Math.PI * 2;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R * 0.55); ctx.stroke();
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(140,190,255,0.05)';
    const step = Math.max(28, h / 14);
    for(let y = 0; y < h; y += step){ ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  }

  function drawNebula(){
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.clearRect(0, 0, ow, oh);
    octx.globalCompositeOperation = 'lighter';
    const s = NEB_SCALE;
    for(const b of blobs){
      const r = b.r * (1 + 0.08 * Math.sin(t * b.sp + b.ph));
      const x = b.x * s, y = b.y * s, rr = Math.max(1, r * s);
      const g = octx.createRadialGradient(x, y, 0, x, y, rr);
      g.addColorStop(0,   `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a})`);
      g.addColorStop(0.5, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a * 0.4})`);
      g.addColorStop(1,   `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
      octx.fillStyle = g;
      octx.beginPath(); octx.arc(x, y, rr, 0, Math.PI * 2); octx.fill();
      if(!reduce){
        b.x += b.vx + 0.2 * Math.sin(t * 0.0012 + b.ph) + (b.hx - b.x) * 0.001;
        b.y += b.vy + 0.15 * Math.cos(t * 0.0015 + b.ph) + (b.hy - b.y) * 0.001;
      }
    }
    ctx.drawImage(off, 0, 0, ow, oh, 0, 0, w, h);
  }

  function drawSparks(){
    for(const p of sparks){
      const a = p.a * (0.5 + 0.5 * Math.sin(t * 0.05 + p.ph));
      ctx.fillStyle = `rgba(230,245,255,${a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      if(!reduce){ p.x += p.vx; p.y += p.vy; }
    }
  }

  function drawShards(){
    for(const s of shards){
      ctx.save();
      ctx.translate(s.x, s.y); ctx.rotate(s.rot);
      ctx.beginPath();
      s.pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
      ctx.closePath();
      if(s.big){ ctx.shadowColor = 'rgba(150,210,255,0.8)'; ctx.shadowBlur = 10; }
      ctx.fillStyle = `rgba(${s.fill[0]},${s.fill[1]},${s.fill[2]},${s.fa})`;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(225,242,255,${s.sa})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      if(!reduce){
        s.x += s.vx; s.y += s.vy; s.rot += s.spin;
        if(s.y < -40){ s.y = h + 40; s.x = rnd(0, w); }
        if(s.y > h + 40){ s.y = -40; }
        if(s.x < -40) s.x = w + 40;
        if(s.x > w + 40) s.x = -40;
      }
    }
  }

  function drawVignette(){
    const g = ctx.createRadialGradient(w * 0.5, h * 0.45, Math.min(w, h) * 0.25, w * 0.5, h * 0.45, Math.max(w, h) * 0.75);
    g.addColorStop(0, 'rgba(2,6,23,0)');
    g.addColorStop(1, 'rgba(2,6,23,0.6)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }

  function draw(){
    if(!w || !h) return;
    t++;
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#020617'); bg.addColorStop(0.5, '#0A1E45'); bg.addColorStop(1, '#020617');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    drawNebula();
    drawGrid();
    drawSparks();
    drawShards();
    drawVignette();
  }

  // 表示サイズが変わっていたら描画面を合わせる（非表示から表示に戻った場合は初期化し直す）
  function syncSize(){
    if(canvas.clientWidth === w && canvas.clientHeight === h) return;
    const wasEmpty = (!w || !h) || blobs.length === 0;
    if(resize() && wasEmpty) init();
  }
  function frame(now){
    if(now - last >= 33){ last = now; syncSize(); draw(); }   // 約30fps
    requestAnimationFrame(frame);
  }

  if(resize()) init();
  draw();
  if(!reduce) requestAnimationFrame(frame);

  let rt;
  const refresh = () => { clearTimeout(rt); rt = setTimeout(() => { syncSize(); draw(); }, 150); };
  window.addEventListener('resize', refresh);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pageshow', refresh);
})();
