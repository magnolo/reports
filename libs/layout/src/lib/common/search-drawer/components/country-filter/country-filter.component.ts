import { take } from 'rxjs/operators';
import { DataService } from './../../../../../../../../apps/ranks/src/app/mock-api/data/data.service';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppConfig } from '@twentythree/core/config/app.config';
import { COUNTRY_CODES } from 'apps/ranks/src/app/mock-api/data/countries';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.scss'],
})
export class CountryFilterComponent implements OnInit {
  @Output() openChanged = new EventEmitter();

  selectedCountry?: string;
  selectedRegion?: string;
  search = '';

  countries = COUNTRY_CODES.map((country) => ({
    country_name: country.englishShortName,
    country_code: country.alpha2Code.toLocaleLowerCase(),
  }));

  public bankFilterCtrl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.selectedCountry = config.selectedCountry;
        this.setupCountriesByRegion(config.selectedRegion);
        console.log('CONFIG', config);
      });
  }

  setupCountriesByRegion(region?: string) {
    if (region) {
      this._dataService
        .getRegions()
        .pipe(take(1))
        .subscribe((regions) => {
          const selectedRegion = regions.find((r) => r._id === region);
          // console.log('selectedRegion', selectedRegion);
          this.countries = selectedRegion.subregions.map((subRegion: any) => ({
            country_name: subRegion.label,
            country_code: subRegion.code.substring(2).toLocaleLowerCase(),
          }));

          if(this.selectedCountry && !this.countries.some(c => c.country_code === this.selectedCountry)){
            this._fuseConfigService.config = { selectedCountry: undefined };
          }
          // console.log('COUNTRIES', this.countries);
        });
    }
    else{
      this.countries = COUNTRY_CODES.map((country) => ({
        country_name: country.englishShortName,
        country_code: country.alpha2Code.toLocaleLowerCase(),
      }));

    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  setCountry(selectedCountry: string) {
    if (this.selectedCountry === selectedCountry || !selectedCountry) {
      this._fuseConfigService.config = { selectedCountry: undefined };
    } else {
      this._fuseConfigService.config = { selectedCountry };
    }
  }

  selectOpened(open: boolean) {
    this.openChanged.emit(open);
  }
}
