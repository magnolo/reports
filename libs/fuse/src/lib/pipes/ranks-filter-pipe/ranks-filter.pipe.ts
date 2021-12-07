import { take } from 'rxjs';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Rank, Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import { DataService } from 'apps/ranks/src/app/mock-api/data/data.service';
import { getRanks, passFilter } from './ranks-filter.utils';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
  name: 'ranksFilter',
  pure: false,
})
export class RanksFilterPipe implements PipeTransform {
  latestValue: any;

  /**
   * Constructor
   */
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}

  transform(
    report: Report,
    countryCode: string | undefined,
    filters: Filter[],
    regionCountries?: string[],
    valueField: string = 'score'
  ): any {
    if (!countryCode || filters.length === 0) return false;

    this.evaluate(report, countryCode, filters, regionCountries);

    return this.latestValue;
  }

  evaluate(
    report: Report,
    countryCode: string,
    filters: Filter[],
    regionCountries?: string[]
  ) {
    let ranks: Rank[] = report.ranks;
    if (regionCountries && regionCountries.length > 0) {
      ranks = report.ranks.filter((rank) =>
        regionCountries.includes(rank.country_code)
      );

      const rank: Rank | undefined = ranks.find(
        (entry) => entry.country_code === countryCode
      );

      let isInRange = false;
      let mainIsValid = false;

      if (rank) {
        filters.forEach((filter) => {
          mainIsValid =
            passFilter(ranks, countryCode, filter.type, filter.value) >
            0;
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
    } else {
      const rank: Rank | undefined = report.ranks.find(
        (entry) => entry.country_code === countryCode
      );
      let isInRange = false;
      let mainIsValid = false;

      if (rank) {
        filters.forEach((filter) => {
          mainIsValid =
            passFilter(report.ranks, countryCode, filter.type, filter.value) >
            0;
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
}
