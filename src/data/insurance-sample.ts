import type {VideoData} from '../types';

/** 別テーマを量産するときは、このオブジェクトの文言だけを差し替えます。 */
export const insuranceSample: VideoData = {
  title: '入院保険、\n結局どっちが',
  titleAccent: '強い',
  subtitleLeft: '日額',
  subtitleRight: '一時金',
  premiseLead: '見るべきは',
  premiseAccent: '『最大額』',
  premiseEnd: 'ではなく、\n実際にどう出るか。',
  evidence: {
    title: '入院は、\n意外と短期が多い',
    comparisonBefore: '日額2万円',
    comparisonAccent: '10日',
    comparisonAfter: '一時金20万円は',
    shortStayLead: 'でも実際は、入院の多くが',
    shortStayAccent: '『0〜14日以内』',
    stats: [
      {label: '病院', value: '68.4%'},
      {label: '診療所', value: '84.3%'},
    ],
    note: '※平均だけで決めない。精神・神経系など、\n　長期入院が平均を押し上げることもある。',
    takeawayLead: '見るべきは、',
    takeawayAccent: '『実際に何日入院しやすいか』。',
  },
  conclusion: {
    titleLead: '一時金が縮小されているのは、',
    titleAccent: '逆に強さの証拠かもしれない',
    paragraphs: [
      '以前は20万円まで付けられたものが、\n今は10万円までになっている商品もある。',
      '保険会社が保障を縮小するのは、\nその条件だと採算が合いにくい\nと見たからかもしれない。',
      'だったら逆に、加入者にとっては\n一時金の方が都合がいい保障だった\nとも考えられる。',
    ],
    finalLead: 'だから自分は、',
    finalAccent: '一時金は付けられるなら\n軽く見ない方がいいと思ってる。',
  },
};
