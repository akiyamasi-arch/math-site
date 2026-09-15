// 振り返りGEM（Gemini の Gem）の一覧データ。
// url には Gemini の共有リンク（https://gemini.google.com/gem/…）をそのまま貼ります。
// order・added の使い方はアプリ・プリントと同じです。
//
// ・どの単元でも使えるGEM … common: true と書く（subject・unit は不要）。
//   「学習サポートGEM」ページ（furikaeri.html）に表示されます。
//   kind: "hint" と書くと「問題を解いているとき」の欄に、書かなければ「ふり返るとき」の欄に入ります。
// ・単元専用のGEM … subject・unit を書く。その単元ページの「振り返りGEM」欄に表示されます
//   （GEMが無い単元では欄ごと表示されません）。
const GEM_DATA = [
  // ---- 問題を解いているときに使うGEM（どの単元でも使える） ----
  {
    common: true,
    kind: "hint",
    order: 10,
    title: "ヒントGEM",
    description: "問題を解いていて行きづまったときに。答えは教えずに、次の一歩のヒントを出してくれます。ノートや問題の写真をアップロードして聞くこともできます。",
    url: "https://gemini.google.com/gem/1mzbQvtVaxJ_QrBRrkXaEp8gBYQe9gqB-?usp=sharing",
    added: "2026-09-14"
  },

  // ---- 学習をふり返るときに使うGEM（どの単元でも使える） ----
  {
    common: true,
    order: 10,
    title: "振り返りGEM Lv.1（おまかせコース）",
    description: "",
    url: "https://gemini.google.com/gem/1n-daK-xXWdKuQv_eBEUpvbMUhzPmJKFF?usp=sharing",
    added: "2026-09-11"
  },
  {
    common: true,
    order: 20,
    title: "振り返りGEM Lv.2（2択でえらぶコース）",
    description: "",
    url: "https://gemini.google.com/gem/1pStaKV1hUGSl8RAETUDpdKuSG0mxHbtU?usp=sharing",
    added: "2026-09-11"
  },
  {
    common: true,
    order: 30,
    title: "振り返りGEM Lv.3（クイズで答えるコース）",
    description: "",
    url: "https://gemini.google.com/gem/1RgfE6W1jt9eqzwnbywFWGptv58QPH0Xs?usp=sharing",
    added: "2026-09-11"
  },

  // ---- 単元専用のGEM ----
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 10,
    title: "数と式 振り返りGEM Lv.1",
    description: "",
    url: "https://gemini.google.com/gem/1hwRethFBN4kzBEkFewe5f-tEpq_AAATl?usp=sharing",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 20,
    title: "数と式 振り返りGEM Lv.2",
    description: "",
    url: "https://gemini.google.com/gem/1SoneAUvkYYDIU7llwAxvPes8ZPd0w2dj?usp=sharing",
    added: "2026-09-11"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 30,
    title: "数と式 振り返りGEM Lv.3",
    description: "",
    url: "https://gemini.google.com/gem/1mMQBZOJ6vmkgfd1a4xDrZVsgeJJb7N2_?usp=sharing",
    added: "2026-09-11"
  }
];
