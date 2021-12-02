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

  transform(report: Report, countryCode: string | undefined): any {
    if (!countryCode) return false;

    let countryInRank = containsCountry(report.ranks, countryCode) > 0;

    if (!countryInRank) {
      countryInRank = getRanks(report, countryCode, 'country') > 0;
    }

    return !countryInRank;
  }
}
