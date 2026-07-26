export type ShahoKokuhoGuideData = {
  opening: {label: string; title: string; subtitle: string};
  medical: {title: string; shared: string[]; message: string};
  leave: {title: string; salaryExample: string; social: string[]; national: string[]; message: string};
  premium: {title: string; social: string[]; national: string[]};
  checklist: Array<{number: string; title: string; social: string; national: string}>;
  ending: {lead: string; emphasis: string; action: string; note: string};
};

export const shahoKokuhoGuideData: ShahoKokuhoGuideData = {
  opening: {
    label: '退職前の保存版',
    title: '社保と国保、\n差が出るのはどこ？',
    subtitle: '「病院代」だけで決める前に、\n生活を守る3つの違いを確認。',
  },
  medical: {
    title: '① 病院に行く',
    shared: ['医療費は原則3割負担', '高額療養費制度がある'],
    message: 'ここだけでは、差は見えにくい。',
  },
  leave: {
    title: '② 病気やケガで30日休む',
    salaryExample: '標準報酬月額38万円の例',
    social: ['傷病手当金の対象になり得る', '30日なら約25万円前後の目安'],
    national: ['傷病手当金は原則なし', '休むと収入が止まりやすい'],
    message: '差が出るのは「病院代」より「休んだ月」。',
  },
  premium: {
    title: '③ 誰が保険料を払う？',
    social: ['健康保険と厚生年金', '会社と本人で原則折半'],
    national: ['会社負担はなし', '前年所得・自治体などで決まる'],
  },
  checklist: [
    {number: '01', title: '扶養', social: '家族を扶養に入れられる場合あり', national: '扶養の仕組みなし'},
    {number: '02', title: '保険料', social: '会社と原則折半', national: '原則、自分で負担'},
    {number: '03', title: '休んだ月', social: '現金給付の可能性', national: '収入が止まりやすい'},
  ],
  ending: {
    lead: '社保の強さは、',
    emphasis: '生活が崩れにくいこと。',
    action: '自由になる前に、失う制度を知ろう。',
    note: '※制度の適用・支給には条件があります。国保の保険料や給付は自治体等で異なります。',
  },
};
