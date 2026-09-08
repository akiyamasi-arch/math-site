// トップページの背景演出：暗い空間に、オレンジ〜青の光をにじませた霧がゆっくり漂う。
// - prefers-reduced-motion（動きを減らす設定）のときは動かさず1枚の静止画として描く
// - 描画は30fps程度に抑えて、学校のPCやタブレットでも負荷を軽くしている
(function(){
  'use strict';
  const canvas = document.getElementById('heroCanvas');
  if(!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // [R,G,B] : オレンジ（キーカラー）を中心に、青と白の光を少し混ぜる
  const palette = [
    [255,141,68], [255,118,40], [255,166,109],
    [59,130,246], [96,165,250],
    [148,163,184], [255,255,255]
  ];
  let w = 0, h = 0, dpr = 1;
  const blobs = [], motes = [];

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function init(){
    blobs.length = 0; motes.length = 0;
    const base = Math.max(w, h);
    for(let i = 0; i < 18; i++){
      const c = palette[i % palette.length];
      blobs.push({
        x: Math.random() * w, y: Math.random() * h,
        r: (0.16 + Math.random() * 0.30) * base,
        c, a: 0.07 + Math.random() * 0.10,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.12,
        ph: Math.random() * Math.PI * 2, sp: 0.004 + Math.random() * 0.005
      });
    }
    for(let i = 0; i < 70; i++){
      motes.push({
        x: Math.random() * w, y: Math.random() * h,
        r: 0.6 + Math.random() * 1.5, a: 0.15 + Math.random() * 0.4,
        vy: -(0.05 + Math.random() * 0.18), vx: (Math.random() - 0.5) * 0.08,
        ph: Math.random() * Math.PI * 2
      });
    }
  }

  let t = 0, last = 0;
  function draw(){
    t++;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0B1220'); g.addColorStop(1, '#111827');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    for(const b of blobs){
      const r = b.r * (1 + 0.08 * Math.sin(t * b.sp + b.ph));
      const rg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      rg.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a})`);
      rg.addColorStop(0.55, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a * 0.35})`);
      rg.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2); ctx.fill();
      if(!reduce){
        b.x += b.vx + 0.25 * Math.sin(t * 0.0011 + b.ph);
        b.y += b.vy + 0.18 * Math.cos(t * 0.0014 + b.ph);
        if(b.x < -r) b.x = w + r; if(b.x > w + r) b.x = -r;
        if(b.y < -r) b.y = h + r; if(b.y > h + r) b.y = -r;
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    for(const m of motes){
      const a = m.a * (0.55 + 0.45 * Math.sin(t * 0.03 + m.ph));
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
      if(!reduce){
        m.y += m.vy; m.x += m.vx;
        if(m.y < -5){ m.y = h + 5; m.x = Math.random() * w; }
      }
    }
  }
  function frame(now){
    if(now - last >= 33){ last = now; draw(); }   // 約30fps
    requestAnimationFrame(frame);
  }

  resize(); init(); draw();
  if(!reduce) requestAnimationFrame(frame);

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { resize(); init(); draw(); }, 150);
  });
})();
