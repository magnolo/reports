import { Pipe, PipeTransform } from '@angular/core';
import { Rank, Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import { containsCountry, getRanks, passFilter } from './ranks-filter.utils';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
  name: 'ranksCountryFilter',
  pure: false,
})
export class RanksCountryFilterPipe implements PipeTransform {
  /**
   * Constructor
   */
  constructor() {}

  transform(
    reports: Report[] | undefined,
    countryCode: string | undefined,

  ): Report[] | undefined {
    if(!reports) return;

    if (!countryCode ) return reports;

    const r = reports.filter((report) =>
      report.ranks.map((rank) => rank.country_code).includes(countryCode)
    );

    return r;
  }
}
