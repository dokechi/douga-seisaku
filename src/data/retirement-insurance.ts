export type RetirementInsuranceData = {
  hook: {eyebrow: string; title: string; sub: string};
  hospital: {title: string; facts: string[]; note: string};
  pivot: {from: string; to: string; lead: string};
  comparison: {
    title: string;
    days: number;
    social: {name: string; badge: string; lines: string[]};
    national: {name: string; badge: string; lines: string[]};
    disclaimer: string;
  };
  checklist: Array<{number: string; title: string; detail: string; icon: 'family' | 'bill' | 'calendar'}>;
  conclusion: {lead: string; accent: string; final: string};
};

/** 制度解説を量産するときは、まずこのデータを差し替えてください。 */
export const retirementInsuranceData: RetirementInsuranceData = {
  hook: {
    eyebrow: '退職届を出す、その前に',
    title: '退職、\nちょい待ち。',
    sub: '次の給料だけ見て辞めると、あとで地味に痛い。',
  },
  hospital: {
    title: '国保でも、病院には行ける。',
    facts: ['医療費は原則3割負担', '高額療養費制度もある'],
    note: 'ここだけ見ると、差は見えにくい。',
  },
  pivot: {from: '病院代', to: '休んだ月', lead: '本当に差が出るのは'},
  comparison: {
    title: 'もし、病気やケガで30日休んだら？',
    days: 30,
    social: {name: '会社の健康保険', badge: '社保', lines: ['傷病手当金が', '入る可能性']},
    national: {name: '国民健康保険', badge: '国保', lines: ['傷病手当金は', '原則なし']},
    disclaimer: '※支給には条件があります。国保でも自治体等による例外があります。',
  },
  checklist: [
    {number: '01', title: '扶養', detail: '家族分も含めて確認', icon: 'family'},
    {number: '02', title: '保険料', detail: '会社が払っていた分も見る', icon: 'bill'},
    {number: '03', title: '休んだ月', detail: '収入を守る制度を確認', icon: 'calendar'},
  ],
  conclusion: {
    lead: '社保の強さは、\n病院に行けることより',
    accent: '生活が崩れにくいこと。',
    final: '自由になる前に、失う制度を知る。',
  },
};
