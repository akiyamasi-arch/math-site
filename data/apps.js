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
    unit: "数と式",
    order: 10,
    title: "面積タイルで見る展開・因数分解",
    description: "x²・x・1 のタイルを並べて長方形をつくり、「縦×横＝タイルの面積の合計」から展開と因数分解のしくみを1段階ずつ確かめます。因数分解では、1 のタイルの並べ方を自分で選んで試します。",
    file: "apps/algebra-tiles.html",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 20,
    title: "たすき掛けナビ",
    description: "ax²+bx+c の因数分解を、数の組み合わせを自分で選ぶ → 斜めに掛ける → 足して確かめる、の順に進めます。はずれた組み合わせも記録に残り、合うまで何度でも試せます。",
    file: "apps/tasuki-navi.html",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 30,
    title: "循環小数を分数に直す",
    description: "0.2727… を 100 倍した式と上下に並べ、限りなく続く「しっぽ」がそろって引き算で消えるようすを見ながら、循環小数を分数に直す手順を確かめます。0.999… ＝ 1 のふしぎも体験できます。",
    file: "apps/repeating-decimal.html",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 40,
    title: "√2 はどれくらい？（数直線で追いつめる）",
    description: "面積 2 m² の正方形の1辺を、予想した数を2乗して確かめながら、数直線を拡大して1けたずつ追いつめます。いつまでも終わらない無理数と、ぴったり終わる数のちがいを体験します。",
    file: "apps/sqrt-zoom.html",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 50,
    title: "正方形で見る (x+y)² と x²+y²",
    description: "1辺 x+y の正方形を4つに切り分けて (x+y)²＝x²+2xy+y² を確かめ、そこから x²+y²＝(x+y)²−2xy を導きます。和と積だけで値を求める確認問題付き。",
    file: "apps/square-identity.html",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 60,
    title: "数直線で解く1次不等式・連立不等式",
    description: "移項 → 両辺を割る、の手順を1段階ずつ進め、答えを数直線に表します。マイナスで割ると不等号の向きが変わるところ、連立不等式で2つの範囲が重なるところを確かめます。苗の本数を考える文章題付き。",
    file: "apps/linear-inequality.html",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 70,
    title: "絶対値は「距離」",
    description: "数直線の上で点を動かしながら、|x−a| が「a からの距離」であることを確かめ、|x−3|<2 のような絶対値を含む方程式・不等式の答えを図から読み取ります。確認問題付き。",
    file: "apps/absolute-distance.html",
    added: "2026-09-11"
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
  },
  {
    subject: "数学A",
    unit: "図形の性質",
    order: 20,
    title: "公平な待ち合わせ場所（垂直二等分線から外心へ）",
    description: "「3人の家から等しい距離の場所はどこ？」という問いから始めます。地図をタップして等距離の点を自分で探すと、打った点が一列に並んで垂直二等分線が現れ、2本の交点が外心、そこを中心にかいた円が外接円だと分かります。家をドラッグして形を変え、外心が三角形の外に出る場合も確かめられます。",
    file: "apps/equidistant-point.html",
    added: "2026-09-15"
  }
];
