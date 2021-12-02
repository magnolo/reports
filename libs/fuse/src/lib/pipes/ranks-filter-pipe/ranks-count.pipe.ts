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
    valueField: string = 'score'
  ): any {
    if (!countryCode || !filters || filters.length === 0)
      return report.indicators_count;

    const rank: Rank | undefined = report.ranks.find(
      (entry) => entry.country_code === countryCode
    );
    let subFound = 0;

    if (rank) {
      filters.forEach((filter) => {
        // eslint-disable-next-line no-case-declarations
        subFound = getRanks(report, countryCode, filter.type, filter.value);
      });
    }

    return subFound;
  }
}
