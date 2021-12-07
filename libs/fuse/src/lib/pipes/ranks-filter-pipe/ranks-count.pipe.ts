import { Pipe, PipeTransform } from '@angular/core';
import { Rank, Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import { getRanks } from './ranks-filter.utils';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
  name: 'ranksCount',
  pure: false,
})
export class RanksCountPipe implements PipeTransform {
  /**
   * Constructor
   */
  constructor() {}

  transform(
    report: Report,
    countryCode: string | undefined,
    filters?: Filter[],
    regionCountries: string[] = [],
    valueField: string = 'score'
  ): any {
    if (!countryCode || !filters || filters.length === 0)
      return report.indicators_count;

    let ranks = report.ranks;
    if (regionCountries && regionCountries.length > 0) {
      ranks = report.ranks.filter((rank) =>
        regionCountries.includes(rank.country_code)
      );
    }

    const rank: Rank | undefined = ranks.find(
      (entry) => entry.country_code === countryCode
    );

    let subFound = 0;

    if (rank) {
      filters.forEach((filter) => {
        subFound = getRanks(report, countryCode, filter.type, filter.value, regionCountries);
      });
    }

    return subFound;
  }
}
