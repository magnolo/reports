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
  search = '';

  countries = COUNTRY_CODES.map((country) => ({
    country_name: country.englishShortName,
    country_code: country.alpha2Code.toLocaleLowerCase(),
  }));


  public bankFilterCtrl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _fuseConfigService: FuseConfigService) {}

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.selectedCountry = config.selectedCountry;
      });
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

  selectOpened(open: boolean){
    this.openChanged.emit(open);
  }
}
