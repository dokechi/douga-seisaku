export type ComparisonItem = {label: string; social: string; national: string};

export type ShahoKokuhoGuideData = {
  hook: {eyebrow: string; title: string; focus: string};
  hospital: {title: string; facts: string[]; insight: string};
  pivot: {question: string; days: string; answer: string};
  allowance: {caption: string; daily: string; monthly: string; national: string};
  companyShare: {title: string; amount: string; social: string; national: string; note: string};
  checklist: ComparisonItem[];
  conclusion: {lead: string; main: string; action: string; note: string};
};

// 文言や概算値を差し替える場合は、このオブジェクトだけを編集します。
export const shahoKokuhoGuideData: ShahoKokuhoGuideData = {
  hook: {
    eyebrow: '会社を辞めて、国保にする前に。',
    title: 'まず見るのは、\n病院代より',
    focus: '休んだ月。',
  },
  hospital: {
    title: '国保でも、病院には行ける。',
    facts: ['受診できる', '原則3割負担', '高額療養費もある'],
    insight: 'ここだけでは、差は見えにくい。',
  },
  pivot: {
    question: 'もし、病気やケガで',
    days: '30日',
    answer: '休んだら？',
  },
  allowance: {
    caption: '標準報酬月額38万円の例',
    daily: '1日 約8,400円',
    monthly: '30日で 約25万円前後',
    national: '原則、傷病手当金なし',
  },
  companyShare: {
    title: '会社が払っていた分',
    amount: '月 約5.3万円規模',
    social: '健康保険＋厚生年金を会社も負担',
    national: '会社負担なし',
    note: '給与明細だけでは、見えにくい。',
  },
  checklist: [
    {label: '扶養', social: '家族を扶養に入れられる場合', national: '扶養の仕組みなし'},
    {label: '保険料', social: '会社と折半', national: '原則、自分で負担'},
    {label: '休んだ月', social: '現金が入る可能性', national: '収入が止まりやすい'},
  ],
  conclusion: {
    lead: '社保の強さは、',
    main: '「病院に行けること」より\n「生活が崩れにくいこと」。',
    action: '自由になる前に、失う制度を知る。',
    note: '※概算例。支給には条件があります。国保は自治体などで異なります。',
  },
};
