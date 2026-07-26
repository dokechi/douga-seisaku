export type VideoData = {
  title: string;
  titleAccent: string;
  subtitleLeft: string;
  subtitleRight: string;
  premiseLead: string;
  premiseAccent: string;
  premiseEnd: string;
  evidence: {
    title: string;
    comparisonBefore: string;
    comparisonAccent: string;
    comparisonAfter: string;
    shortStayLead: string;
    shortStayAccent: string;
    stats: Array<{label: string; value: string}>;
    note: string;
    takeawayLead: string;
    takeawayAccent: string;
  };
  conclusion: {
    titleLead: string;
    titleAccent: string;
    paragraphs: string[];
    finalLead: string;
    finalAccent: string;
  };
};
