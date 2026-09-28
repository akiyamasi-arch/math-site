// 授業スライドの一覧データ。単元ページの「授業スライド」欄に表示されます
// （スライドが無い単元では欄ごと表示されません）。
// order・added の使い方はアプリ・プリントと同じです。
//
// 載せ方は2通りあります。
// ・Googleスライド … url に共有リンク（https://docs.google.com/presentation/d/…/edit?usp=sharing）を貼る。
//   共有設定が「リンクを知っている全員（閲覧者）」になっている必要があります。クリックするとページ内で見られます。
// ・PowerPoint（.pptx）… 各ページを画像（01.png, 02.png …）に書き出して slides/ の下のフォルダに置き、
//   images にそのフォルダ、pages にページ数を書く。◀ ▶ でページを送れます。
//   ※.pptx ファイル自体は公開されません。スライドを直したら、画像を書き出し直します。
// 同じスライドを別の単元にも出したいときは、subject・unit だけ変えた項目をもう1つ足します。
const SLIDE_DATA = [
  {
    subject: "数学Ⅰ",
    unit: "数と式",
    order: 10,
    title: "因数分解とは？／たすき掛け",
    description: "そもそも因数分解は何のためにするのか、から始めて、x² に係数がある式をたすき掛けで因数分解する方法、答えの確かめ方までを学びます。",
    url: "https://docs.google.com/presentation/d/1LdYwkBwiSesluc5FHLQ8kZt_b8_q5SNXjvfbc69WUbk/edit?usp=sharing",
    added: "2026-09-24"
  },
  {
    subject: "数学Ⅰ",
    unit: "図形と計量",
    order: 10,
    title: "1÷0 はなぜダメなのか（tan90° の値が求められない理由）",
    description: "tan90° を求めようとすると 1÷0 が出てきます。割り算は「掛け算の逆」という約束から、0で割ると答えが1つに決まらない理由を確かめ、表と図でも tan90° に値がないことを見ていきます。",
    images: "slides/div-by-zero/",   // 元ファイル：図形と計量/1割る0とtan90度.pptx
    pages: 9,
    added: "2026-09-28"
  }
];
