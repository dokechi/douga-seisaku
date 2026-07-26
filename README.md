# YouTube Shorts 解説動画テンプレート

静止画スライドの余白・タイポグラフィ・赤い強調を引き継いだ、Remotion製の縦型（1080 × 1920 / 30秒）動画テンプレートです。

## セットアップと確認

```bash
npm install
npm run dev
```

Remotion Studioで `InsuranceShort` を選ぶとプレビューできます。

Studioには次の2本が表示されます。既存の `InsuranceShort` は変更せず、そのまま残しています。

- `InsuranceShort` — 既存の入院保険ショート（30秒）
- `TaishokuShakaihokenKokuhou3D` — 退職前の社会保険／国民健康保険解説（40秒）

## MP4を書き出す

```bash
npm run render
```

完成ファイルは `out/insurance-short.mp4` に出力されます。初回レンダー時はChromiumの取得が必要になる場合があります。

新しい退職前制度解説を書き出す場合は、次を実行します。

```bash
npm run render:retirement
```

完成ファイルは `out/taishoku-shakaihoken-kokuhou-3d.mp4` に出力されます。

## 別テーマへ差し替える

`src/data/insurance-sample.ts` の `insuranceSample` を編集してください。レイアウトやアニメーションを触らず、タイトル・主張・統計・結論を差し替えられます。型は `src/types.ts` の `VideoData` で定義しています。

各ページは300フレーム（10秒）です。全体の長さを変える場合は `src/Root.tsx` の `durationInFrames` と、`src/MainVideo.tsx` の各 `Sequence` を合わせて調整してください。

## 退職前制度解説を別テーマへ差し替える

新動画の文言・比較内容・チェック項目は `src/data/retirement-insurance.ts` の `retirementInsuranceData` に集約しています。見出し、病院利用の前提、本題転換、30日比較、比較後の一言、3つの確認カード、会社負担への注意、結論までをデータだけで差し替えられます。`comparison.days` はカレンダーの表示日数にも反映されます。

演出は `src/RetirementInsuranceComic3D.tsx`、再利用できる3D風パネルとアイコンは `src/components/comic3d/` にあります。各シーンには読みやすさを保つフェード、緩やかなカメラの引き、前後レイヤーを共通適用しています。尺を変える場合は `src/Root.tsx` の1200フレーム、動画コンポーネント末尾の各 `Sequence`、各 `Stage` の `duration` を合わせて変更してください。
