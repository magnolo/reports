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

    if (config.selectedRegion && config.selectedCountry) {
      this._dataService
        .getRegions()
        .pipe(take(1))
        .subscribe((regions) => {
          const selectedRegion = regions.find(
            (r) => r._id === config.selectedRegion
          );
          // console.log('selectedRegion', selectedRegion);
          const countryExistsInRegion = selectedRegion.subregions.some(
            (subRegion: any) =>
              subRegion.code.substring(2).toLocaleLowerCase() ===
              config.selectedCountry
          );
          if (!countryExistsInRegion) {
            config.selectedCountry = undefined;
          }
          console.log('SET GET config', config, value);
          this._config.next(config);
        });
    } else {
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
