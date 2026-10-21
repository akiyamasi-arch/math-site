// 参考動画の一覧データ（教材リスト.xlsx の「動画」シートから反映）。
// youtubeId は動画URLの末尾のID部分（例: https://youtu.be/xxxxxxxxxxx → xxxxxxxxxxx）。
// added（追加日）は「更新情報」に自動で載ります。
const VIDEO_DATA = [
  {
    subject: "数学Ⅰ",
    unit: "2次関数",
    title: "2次不等式の解き方",
    youtubeId: "cLZZmxxSLFg",
    note: "",
    added: "2026-09-08"
  },
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    title: "たすき掛けで「斜め」に掛ける本当の理由",
    youtubeId: "DHRpKKKHah4",
    note: "ショート動画",
    added: "2026-09-24"
  },
  {
    subject: "数学B",
    unit: "統計的な推測",
    order: 10,
    title: "動画① 標本平均と中心極限定理",
    youtubeId: "8u6fqF8siiY",
    note: "プリント①と対応",
    added: "2026-10-21"
  },
  {
    subject: "数学B",
    unit: "統計的な推測",
    order: 20,
    title: "動画② 統計的な推定",
    youtubeId: "E4C_0u4roZ8",
    note: "プリント②と対応",
    added: "2026-10-21"
  },
  {
    subject: "数学B",
    unit: "統計的な推測",
    order: 30,
    title: "動画③ 統計的な検定の考え方",
    youtubeId: "sB36o_EyUvY",
    note: "プリント③と対応",
    added: "2026-10-21"
  },
  {
    subject: "数学B",
    unit: "統計的な推測",
    order: 40,
    title: "動画④ 正規分布を使った検定とp値",
    youtubeId: "q0Elbn9IXYE",
    note: "プリント④と対応",
    added: "2026-10-21"
  },
  {
    subject: "数学B",
    unit: "統計的な推測",
    order: 50,
    title: "動画⑤ 第一種の過誤と第二種の過誤",
    youtubeId: "nmZoousLt2s",
    note: "プリント⑤と対応",
    added: "2026-10-21"
  }
];
