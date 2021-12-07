import { quantileSeq } from 'mathjs';
import { Rank, Report } from '@twentythree/api-interfaces';

export const getRanks = (
  indicator: Report,
  countryCode: string,
  type: 'top' | 'quantile' | 'country' = 'top',
  value: number = 5,
  countryCodes: string[] = []
) => {
  let foundInSubIndicators = 0;

  if (indicator.children && indicator.children.length > 0) {
    foundInSubIndicators = indicator.children.reduce((acc, val: any) => {
      return (
        acc +
        (val.children && Array.isArray(val.children)
          ? deepCount(val.children, countryCode, type, value, countryCodes)
          : 0)
      );
    }, 0);
  }

  return foundInSubIndicators;
};

export const passFilter = (
  ranks: Rank[],
  countryCode: string,
  type: 'top' | 'quantile' | 'country' = 'top',
  value: number = 5
) => {
  let found = 0;
  switch (type) {
    case 'top':
      found += isInTop(ranks, countryCode, value);
      break;

    case 'quantile':
      found += isInQuantile(ranks, countryCode, value);
      break;

    case 'country':
      found += containsCountry(ranks, countryCode);

      break;
    default:
      break;
  }

  return found;
};

export const deepCount: any = (
  reports: Report[] = [],
  countryCode: string,
  type: 'top' | 'quantile' | 'country' = 'top',
  value: number = 5,
  countryCodes: string[] = []
) => {
  let found = 0;

  reports.forEach((report) => {
    const ranks = report.ranks.filter((rank) =>
      countryCodes.length > 0 ? countryCodes.includes(rank.country_code) : true
    );

    found += passFilter(ranks, countryCode, type, value);

    if (report.children && report.children.length > 0) {
      found += deepCount(
        report.children,
        countryCode,
        type,
        value,
        countryCodes
      );
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

/**
 * Quantiles
 */
export const isInQuantile = (
  ranks: Rank[],
  countryCode: string,
  quantile: number = 95
) => {
  const rank: Rank | undefined = ranks.find(
    (entry) => entry.country_code === countryCode
  );

  if (rank) {
    const q = quantileSeq(
      ranks.map((item) => item.score),
      quantile / 100
    );

    if (rank.score >= q) {
      return 1;
    }
  }
  return 0;
};

/**
 * Quantiles
 */
export const containsCountry = (ranks: Rank[], countryCode: string) => {
  const hasCountry: boolean = ranks.some(
    (entry) => entry.country_code === countryCode
  );

  if (hasCountry) {
    return 1;
  }
  return 0;
};
