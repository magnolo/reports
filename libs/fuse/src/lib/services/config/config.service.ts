import { DataService } from './../../../../../../apps/ranks/src/app/mock-api/data/data.service';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { merge } from 'lodash-es';
import { FUSE_APP_CONFIG } from './config.constants';

@Injectable({
  providedIn: 'root',
})
export class FuseConfigService {
  private _config: BehaviorSubject<any>;

  public regionCountries$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  /**
   * Constructor
   */
  constructor(
    @Inject(FUSE_APP_CONFIG) config: any,
    private _dataService: DataService
  ) {
    // Private
    this._config = new BehaviorSubject(config);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for config
   */
  set config(value: any) {
    // Merge the new config over to the current config
    const config = merge({}, this._config.getValue(), value);

    if (
      value &&
      typeof value === 'object' &&
      Object.keys(value).includes('selectedCountry') &&
      !value.selectedCountry
    ) {
      config.selectedCountry = undefined;
    }

    if (
      value &&
      typeof value === 'object' &&
      Object.keys(value).includes('selectedRegion') &&
      !value.selectedRegion
    ) {
      config.selectedRegion = undefined;
    }

    if (config.selectedRegion) {
      this._dataService
        .getRegionCountries(config.selectedRegion)
        .pipe(take(1))
        .subscribe((countryCodes) => {
          config.selectedRegionCountries = countryCodes;

          if (config.selectedCountry) {
            const countryExistsInRegion = countryCodes.some(
              (subRegion: any) => subRegion === config.selectedCountry
            );
            if (!countryExistsInRegion) {
              config.selectedCountry = undefined;
            }
          }

          this._config.next(config);
        });
    } else {
      config.selectedRegionCountries = [];
      console.log('SET GET config', config, value);
      // Execute the observable
      this._config.next(config);
    }
  }

  get config$(): Observable<any> {
    return this._config.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resets the config to the default
   */
  reset(): void {
    // Set the config
    this._config.next(this.config);
  }
}
