import { take } from 'rxjs';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Rank, Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import { DataService } from 'apps/ranks/src/app/mock-api/data/data.service';
import { containsCountry, getRanks, passFilter } from './ranks-filter.utils';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
  name: 'ranksCountryFilter',
  pure: false,
})
export class RanksCountryFilterPipe implements PipeTransform {
  countryReports?: any;

  /**
   * Constructor
   */
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}

  transform(
    reports: Report[] | undefined,
    countryCode: string | undefined,
    regionCountries: string[] = []
  ): Report[] | undefined {
    if (!reports) return;

    if (!countryCode && regionCountries.length === 0) return reports;

    if (regionCountries && regionCountries.length > 0) {
      if (
        countryCode &&
        !regionCountries.some((code) => code === countryCode)
      ) {
        return [];
      }

      const regionReports = reports.filter((report) =>
        report.ranks
          .map((rank) => rank.country_code)
          .some((code) => regionCountries.includes(code))
      );

      if (countryCode) {
        return regionReports.filter((report) =>
          report.ranks.map((rank) => rank.country_code).includes(countryCode)
        );
      } else {
        return regionReports;
      }
    } else if (countryCode) {
      return reports.filter((report) =>
        report.ranks.map((rank) => rank.country_code).includes(countryCode)
      );
    }

    return reports;
  }
}
