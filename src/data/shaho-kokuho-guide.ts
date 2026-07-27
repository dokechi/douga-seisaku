export type ShahoKokuhoGuideData = {
  calculation: {
    standardMonthlyRemuneration: number;
    dailyAllowance: number;
    waitingDays: number;
    eligibleDays: number;
    totalAllowance: number;
  };
  checklist: readonly string[];
};

/** 映像内の金額は、この確定的な概算条件から算出する。 */
export const shahoKokuhoGuideData: ShahoKokuhoGuideData = {
  calculation: {
    standardMonthlyRemuneration: 380_000,
    dailyAllowance: 8_447,
    waitingDays: 3,
    eligibleDays: 27,
    totalAllowance: 228_069,
  },
  checklist: ['扶養', '保険料', '休業保障'],
};
