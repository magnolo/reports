import { Pipe, PipeTransform } from '@angular/core';
import { Rank, Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import { getRanks, passFilter } from './ranks-filter.utils';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
  name: 'ranksFilter',
  pure: false,
})
export class RanksFilterPipe implements PipeTransform {
  /**
   * Constructor
   */
  constructor() {}

  transform(
    report: Report,
    countryCode: string | undefined,
    filters: Filter[],
    valueField: string = 'score'
  ): any {
    if (!countryCode || filters.length === 0) return false;

    const rank: Rank | undefined = report.ranks.find(
      (entry) => entry.country_code === countryCode
    );
    let isInRange = false;
    let mainIsValid = false;

    if (rank) {
      filters.forEach((filter) => {

        mainIsValid = passFilter(report.ranks, countryCode, filter.type, filter.value) > 0;
        // eslint-disable-next-line no-case-declarations
        const subIndicatorsCount = getRanks(
          report,
          countryCode,
          filter.type,
          filter.value
        );
        // console.log('report', report.name, subIndicatorsCount)
        if (subIndicatorsCount > 0 || mainIsValid) {
          isInRange = true;
        }
      });
    }

    return !isInRange || !mainIsValid;
  }
}
