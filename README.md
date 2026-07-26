# YouTube Shorts 解説動画テンプレート

静止画スライドの余白・タイポグラフィ・赤い強調を引き継いだ、Remotion製の縦型（1080 × 1920 / 30秒）動画テンプレートです。

## セットアップと確認

```bash
npm install
npm run dev
```

Remotion Studioで `InsuranceShort` を選ぶとプレビューできます。

## MP4を書き出す

```bash
npm run render
```

完成ファイルは `out/insurance-short.mp4` に出力されます。初回レンダー時はChromiumの取得が必要になる場合があります。

## 別テーマへ差し替える

`src/data/insurance-sample.ts` の `insuranceSample` を編集してください。レイアウトやアニメーションを触らず、タイトル・主張・統計・結論を差し替えられます。型は `src/types.ts` の `VideoData` で定義しています。

各ページは300フレーム（10秒）です。全体の長さを変える場合は `src/Root.tsx` の `durationInFrames` と、`src/MainVideo.tsx` の各 `Sequence` を合わせて調整してください。
