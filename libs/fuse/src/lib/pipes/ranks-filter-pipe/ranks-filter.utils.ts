import { Rank, Report } from '@twentythree/api-interfaces';

export const getTopRanks = (
  indicator: Report,
  countryCode: string,
  top: number = 5
) => {
  // const rank: Rank | undefined = indicator.ranks.find(
  //   (entry) => entry.country_code === countryCode
  // );
  // let idx = -1;
  let foundInSubIndicators = 0;

  // if (rank) {
  // idx = indicator.ranks.indexOf(rank);

  // if (idx >= top) {
  // }

  if (indicator.children && indicator.children.length > 0) {
    foundInSubIndicators = indicator.children.reduce((acc, val: any) => {
      return (
        acc +
        (val.children && Array.isArray(val.children)
          ? deepCount(val.children, countryCode, top)
          : 0)
      );
    }, 0);
  }
  // }

  return foundInSubIndicators;
};

export const deepCount: any = (
  reports: Report[] = [],
  countryCode: string,
  top: number = 5
) => {
  let found = 0;

  reports.forEach((report) => {
    found += isInTop(report.ranks, countryCode, top);
    if (report.children && report.children.length > 0) {
      found += deepCount(report.children, countryCode, top);
    }
  });

  return found;
};

export const isInTop = (
  ranks: Rank[],
  countryCode: string,
  top: number = 5
) => {
  const rank: Rank | undefined = ranks.find(
    (entry) => entry.country_code === countryCode
  );
  let idx = -1;

  if (rank) {
    // Hmmm... maybe index vs score
    idx = ranks.indexOf(rank);
    if (idx < top) {
      return 1;
    }
  }
  return 0;
};
