// シミュレーションアプリの一覧データ。
// added（追加日）を入れておくと、トップページの「更新情報」に自動で載ります。
//
// order（表示順）… 単元ごとに「授業で扱う順番」で並べるための番号。
//   小さい数字ほど先に表示されます（10, 20, 30 …のように間隔をあけておくと、
//   後から間に差し込みやすくなります）。order が無いものは最後に回ります。
const APP_DATA = [
  {
    subject: "数学Ⅰ",
    unit: "2次関数",
    order: 10,
    title: "2次関数のグラフ演習（頂点を答える）",
    description: "グラフまたは式から頂点の座標を答える5問の演習。得点と時間が記録され、提出用テキストをコピーできます。",
    file: "apps/vertex-quiz.html",
    added: "2026-09-09"
  },
  {
    subject: "数学Ⅰ",
    unit: "2次関数",
    order: 20,
    title: "最大・最小の基本（スライド＋確認テスト）",
    description: "平方完成から最大値・最小値を求める考え方をスライドで学び、最後に5問の確認テストで確かめます。",
    file: "apps/max-min-basics.html",
    added: "2026-09-09"
  },
  {
    subject: "数学Ⅰ",
    unit: "2次関数",
    order: 30,
    title: "トマト収穫量シミュレーター",
    description: "肥料の量と収穫量の関係（y = -2(x-4)² + 32）を動かしながら、最大値の求め方を学びます。定義域に制限がある場合も体験できます。",
    file: "apps/tomato-max-min.html",
    added: "2026-09-09"
  },
  {
    subject: "数学Ⅰ",
    unit: "2次関数",
    order: 40,
    title: "2次不等式ビジュアライザー",
    description: "係数と不等号を入れると、グラフのどの部分が答えになるかを段階的に確認できます。",
    file: "apps/quadratic-inequality.html",
    added: "2026-09-08"
  },
  {
    subject: "数学Ⅰ",
    unit: "図形と計量",
    order: 20,
    title: "三角比の相互関係シミュレーター",
    description: "角θを動かしながら、単位円の図の上で sin²θ+cos²θ=1、tanθ=sinθ/cosθ、1+tan²θ=1/cos²θ が成り立つ理由を1段階ずつ確かめます。確認クイズ付き。",
    file: "apps/trig-identities.html",
    added: "2026-09-10"
  }
];
