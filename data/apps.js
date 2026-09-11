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
    order: 10,
    title: "三角比みつけ（向きが変わっても迷わない）",
    description: "直角三角形を回したり裏返したりしながら、θ から見た対辺・隣辺・斜辺を1つずつ確かめ、「斜辺分の対辺」の形で三角比を組み立てます。図の辺をタップして答える練習8問付き。",
    file: "apps/trig-find-ratio.html",
    added: "2026-09-10"
  },
  {
    subject: "数学Ⅰ",
    unit: "図形と計量",
    order: 20,
    title: "30°・45°・60°の三角比（つくる→瞬間に答える）",
    description: "正三角形と正方形を切って 1:√3:2、1:1:√2 の三角形を自分でつくり、sin 60° などの値がどこから来るのかを確かめます。そのあと、瞬間に答えるフラッシュ練習ができます。",
    file: "apps/trig-special-values.html",
    added: "2026-09-10"
  },
  {
    subject: "数学Ⅰ",
    unit: "図形と計量",
    order: 30,
    title: "三角比の相互関係シミュレーター",
    description: "角θを動かしながら、単位円の図の上で sin²θ+cos²θ=1 をはじめとする3つの相互関係が成り立つ理由を1段階ずつ確かめます。確認クイズ付き。",
    file: "apps/trig-identities.html",
    added: "2026-09-10"
  },
  {
    subject: "数学Ⅰ",
    unit: "図形と計量",
    order: 40,
    title: "三角比で高さ・距離を求める（立式トレーニング）",
    description: "木の高さ・はしご・ハウスの屋根・傾斜畑の4場面で、絵の中から直角三角形を取り出し、どの比（sin・cos・tan）を使うかを自分で選んで式を立てるところまでを段階的に練習します。",
    file: "apps/trig-application.html",
    added: "2026-09-10"
  }
];
