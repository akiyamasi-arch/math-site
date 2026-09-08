// 科目と単元の一覧（サイトの「部屋」の設計図）。
// ここに書いた順番で科目カード・単元カードが並びます。
// 単元を追加したいときは units の配列に { id, name } を1つ足すだけで、
// 科目ページ・単元ページが自動的に用意されます（id はURLに使う半角英数字）。
// プリント・動画・アプリのデータ側では name（日本語名）で科目・単元を指定します。
const CURRICULUM = [
  {
    id: "math1",
    name: "数学Ⅰ",
    description: "高校数学の土台となる科目。数と式・2次関数・図形と計量・データの分析を学びます。",
    units: [
      { id: "kazu-shiki",     name: "数と式" },
      { id: "shugo-meidai",   name: "集合と命題" },
      { id: "nijikansu",      name: "2次関数" },
      { id: "zukei-keiryo",   name: "図形と計量" },
      { id: "data-bunseki",   name: "データの分析" }
    ]
  },
  {
    id: "mathA",
    name: "数学A",
    description: "図形の性質、場合の数と確率など、考え方の幅を広げる科目です。",
    units: [
      { id: "zukei-seishitsu", name: "図形の性質" },
      { id: "baai-kakuritsu",  name: "場合の数と確率" },
      { id: "ningen-katsudo",  name: "数学と人間の活動" }
    ]
  },
  {
    id: "math2",
    name: "数学Ⅱ",
    description: "式と証明、図形と方程式、三角関数、指数・対数関数、微分・積分の考えを学びます。",
    units: [
      { id: "shiki-shomei",        name: "式と証明" },
      { id: "fukusosu-hoteishiki", name: "複素数と方程式" },
      { id: "zukei-hoteishiki",    name: "図形と方程式" },
      { id: "sankaku-kansu",       name: "三角関数" },
      { id: "shisu-taisu",         name: "指数関数・対数関数" },
      { id: "bibun-sekibun",       name: "微分・積分の考え" }
    ]
  },
  {
    id: "mathB",
    name: "数学B",
    description: "数列と統計的な推測を中心に、変化やデータを数学的に扱います。",
    units: [
      { id: "suretsu",        name: "数列" },
      { id: "tokei-suisoku",  name: "統計的な推測" },
      { id: "shakai-seikatsu", name: "数学と社会生活" }
    ]
  },
  {
    id: "math3",
    name: "数学Ⅲ",
    description: "極限、微分法、積分法。関数の変化をより深く扱います。",
    units: [
      { id: "kyokugen", name: "極限" },
      { id: "bibunho",  name: "微分法" },
      { id: "sekibunho", name: "積分法" }
    ]
  },
  {
    id: "mathC",
    name: "数学C",
    description: "ベクトル、平面上の曲線と複素数平面、数学的な表現の工夫を学びます。",
    units: [
      { id: "vector",          name: "ベクトル" },
      { id: "kyokusen-fukuso", name: "平面上の曲線と複素数平面" },
      { id: "hyogen-kufu",     name: "数学的な表現の工夫" }
    ]
  }
];
