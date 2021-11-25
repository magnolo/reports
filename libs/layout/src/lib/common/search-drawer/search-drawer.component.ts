import { COUNTRY_CODES } from './../../../../../../apps/ranks/src/app/modules/admin/dashboards/analytics/countries';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import { FuseTailwindService } from '@twentythree/fuse/services/tailwind';

import { Layout } from '@twentythree/layout/layout.types';
import { AppConfig, Scheme, Theme } from '@twentythree/core/config/app.config';

@Component({
  selector: 'search-drawer',
  templateUrl: './search-drawer.component.html',
  styles: [
    `
      search-drawer {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SearchDrawerComponent implements OnInit, OnDestroy {
  config!: AppConfig;
  layout!: Layout;
  scheme!: 'dark' | 'light';
  theme!: string;
  themes: [string, any][] = [];
  search = '';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  countries = COUNTRY_CODES.map((country) => ({
    country_name: country.englishShortName,
    country_code: country.alpha2Code.toLocaleLowerCase(),
  }));

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _fuseConfigService: FuseConfigService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.config = config;
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router
      .navigate([], {
        queryParams: {
          layout: null,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Set the config
        this._fuseConfigService.config = { layout };
      });
  }

  /**
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme };
  }

  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: Theme): void {
    this._fuseConfigService.config = { theme };
  }

  setCountry(selectedCountry: string) {
    if (this.config.selectedCountry === selectedCountry || !selectedCountry) {
      this._fuseConfigService.config = { selectedCountry: undefined };
    } else {
      this._fuseConfigService.config = { selectedCountry };
    }
  }
}
