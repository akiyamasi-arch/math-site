// 入試問題ページ（nyushi.html）のデータ。
//
// このサイトは誰でも見られるので、入試問題や予備校の解答・分析のPDFそのものは置きません。
// ・official … 大学入試センターや各大学が公式に公開しているページへのリンク
// ・drive    … 校内限定（学校のGoogleアカウントでログインした人だけが開ける）Googleドライブのフォルダのリンク
//               空（""）のあいだは、ボタンの代わりに「準備中」と表示されます。
// ・have     … 校内限定フォルダに入っている資料の年度（生徒への目安）
const EXAM_DATA = {

  // 校内限定フォルダ（Googleドライブ）のリンク。フォルダを共有したら、ここにURLを貼る
  drive: {
    kyotsu: "",     // 「センター・共通テスト」フォルダ
    daigaku: ""     // 「入試問題」（大学別）フォルダ。大学ごとに分けたいときは各大学の drive に書く
  },

  // ---- 共通テスト・センター試験 ----
  kyotsu: {
    official: {
      title: "大学入試センター（過去3年分の試験問題）",
      description: "共通テストの問題と正解が、直近3年分、公式に公開されています。",
      url: "https://www.dnc.ac.jp/kyotsu/kakomondai/"
    },
    // 校内限定フォルダに入っている資料
    have: [
      { year: "2026年", exam: "共通テスト", items: "数学ⅠA／数学ⅡBC（問題・正解・解説）" },
      { year: "2025年", exam: "共通テスト", items: "数学ⅠA／数学ⅡBC（問題・解答・解説）" },
      { year: "2024年", exam: "共通テスト", items: "数学ⅠA／数学ⅡB（問題・解答・解説）" },
      { year: "2022年", exam: "共通テスト", items: "数学ⅠA／数学ⅡB（問題・解答）" },
      { year: "2021年", exam: "共通テスト", items: "数学ⅠA／数学ⅡB（問題・解答・解説）" },
      { year: "2020年", exam: "センター試験", items: "数学ⅠA／数学ⅡB（問題・解答・解説）" },
      { year: "2019年", exam: "センター試験", items: "数学ⅠA／数学ⅡB（問題・解答・解説）" },
      { year: "2012〜2018年", exam: "センター試験", items: "数学ⅡB" }
    ]
  },

  // ---- 大学別（国公立大学の個別試験） ----
  // official が無い大学は、公式サイトでの公開がありません。
  universities: [
    { name: "北海道大学", have: "2023・2024・2026年", official: "https://www.hokudai.ac.jp/admission/faculty/general/", drive: "" },
    { name: "東北大学", have: "2023・2024・2026年", official: "https://admissions.tohoku.ac.jp/ja/", drive: "" },
    { name: "筑波大学", have: "2022・2023・2024年", official: "https://ac.tsukuba.ac.jp/examination/exam_questions/", drive: "" },
    { name: "東京大学", have: "2021・2023・2024・2026年", official: "https://www.u-tokyo.ac.jp/ja/admissions/undergraduate/e01_04.html", drive: "" },
    { name: "東京科学大学（旧 東京工業大学）", have: "2023・2024年", official: "https://admissions.isct.ac.jp/ja/013/undergraduate/examination-questions", drive: "" },
    { name: "東京科学大学（旧 東京医科歯科大学）", have: "2023・2024年", official: "https://admissions.isct.ac.jp/ja/013/undergraduate/examination-questions", drive: "" },
    { name: "新潟大学", have: "2022年（数学Ⅲ）", official: "https://www.niigata-u.ac.jp/admissions/faculty/kakomondai/", drive: "" },
    { name: "岐阜大学", have: "2023年", official: "https://www.gifu-u.ac.jp/admission/data/past_issues.html", drive: "" },
    { name: "静岡大学", have: "2021年", official: "https://www.shizuoka.ac.jp/nyushi/information/kakomon/", drive: "" },
    { name: "浜松医科大学", have: "2023・2024年", official: "", drive: "" },
    { name: "名古屋大学", have: "2023・2024・2026年", official: "https://www.nagoya-u.ac.jp/admissions/exam/us-exam/cat/index.html", drive: "" },
    { name: "京都大学", have: "2023・2024・2026年", official: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq", drive: "" },
    { name: "大阪大学", have: "2023年", official: "https://www.osaka-u.ac.jp/ja/admissions/faculty/general/pastexam-answer", drive: "" },
    { name: "神戸大学", have: "2021・2023・2024・2026年", official: "https://www.office.kobe-u.ac.jp/stdnt-examinavi/juken/past_exam/index.html", drive: "" },
    { name: "広島大学", have: "2021・2023・2024・2026年", official: "https://www.hiroshima-u.ac.jp/nyushi/gakubu/kakomon/koukai", drive: "" }
  ],

  // ---- 予備校の解答速報・過去問 ----
  yobiko: [
    { title: "河合塾 解答速報", description: "国公立大二次試験・私立大入試の解答例と分析。", url: "https://kaisoku.kawai-juku.ac.jp/nyushi/honshi/26/" },
    { title: "駿台 解答速報", description: "大学入試の解答例と分析。", url: "https://www2.sundai.ac.jp/sokuhou/" },
    { title: "代々木ゼミナール 解答速報", description: "大学入試の解答例と概評。", url: "https://sokuho.yozemi.ac.jp/sokuho/" },
    { title: "東進 過去問データベース", description: "多くの大学の過去問を見られます（無料の会員登録が必要）。", url: "https://www.toshin-kakomon.com/" }
  ]
};
