import { Pipe, PipeTransform } from '@angular/core';
import { Rank, Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import { getTopRanks } from './ranks-filter.utils';


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
    const result: Rank[] = [];

    let idx = -1;
    const rank: Rank | undefined = report.ranks.find(
      (entry) => entry.country_code === countryCode
    );
    let isInRange = false;

    if (rank) {
      idx = report.ranks.indexOf(rank);

      filters.forEach((filter) => {
        switch (filter.type) {
          case 'top':
            // eslint-disable-next-line no-case-declarations
            const subIndicatorsCount = getTopRanks(
              report,
              countryCode,
              filter.value
            );

            if (
              (filter.value && idx < filter.value) ||
              subIndicatorsCount > 0
            ) {
              isInRange = true;
            }

            break;

          default:
            break;
        }
      });
    }

    return !isInRange;
  }
}


