import { Pipe, PipeTransform } from '@angular/core';
import { Rank, Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import { containsCountry, getRanks, passFilter } from './ranks-filter.utils';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
  name: 'ranksCountry',
  pure: false,
})
export class RanksCountryPipe implements PipeTransform {
  /**
   * Constructor
   */
  constructor() {}

  transform(
    report: Report,
    countryCode: string | undefined,
    regionCountries: string[] = []
  ): any {
    if (!countryCode) return false;

    let ranks = report.ranks;
    if (regionCountries && regionCountries.length > 0) {
      ranks = report.ranks.filter((rank) =>
        regionCountries.includes(rank.country_code)
      );
    }

    let countryInRank = containsCountry(ranks, countryCode) > 0;

    if (!countryInRank) {
      countryInRank =
        getRanks(report, countryCode, 'country', undefined, regionCountries) >
        0;
    }

    return !countryInRank;
  }
}
