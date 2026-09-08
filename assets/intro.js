// トップページのオープニング（「MATHEMATICS」のタイトルカード）
// - ブラウザを開いてから最初にトップを見たときだけ表示（sessionStorage で記録）
// - 画面をクリック／タップ、キーを押すと即スキップ
// - 「動きを減らす」設定のときは表示しない
// - 約2秒で自動的に消え、下の星雲のトップページが現れる
(function(){
  'use strict';
  const el = document.getElementById('intro');
  if(!el) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(document.documentElement.classList.contains('no-intro') || reduce){ el.remove(); return; }
  try{ sessionStorage.setItem('mathsite-intro', '1'); }catch(e){}

  let done = false;
  function finish(){
    if(done) return;
    done = true;
    el.classList.add('out');
    setTimeout(() => { if(el.parentNode) el.parentNode.removeChild(el); }, 500);
  }
  function start(){
    el.classList.add('in');
    setTimeout(finish, 1150);
  }
  // フォントの読み込みを最大450msだけ待ってから開始（それ以上は代替フォントで表示）
  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(r => setTimeout(r, 450))]).then(start, start);

  el.addEventListener('click', finish);
  el.addEventListener('touchstart', finish, { passive: true });
  document.addEventListener('keydown', finish);
  setTimeout(finish, 3000);   // 念のための上限
})();
