import { Component, OnInit } from '@angular/core';
import { AppConfig, Filter } from '@twentythree/core/config/app.config';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'range-filters',
  templateUrl: './range-filters.component.html',
  styleUrls: ['./range-filters.component.scss'],
})
export class RangeFiltersComponent implements OnInit {
  filters: Filter[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  get filterOption() {
    if (this.filters && this.filters.length > 0) {
      return this.filters[0].type;
    }
    return;
  }

  constructor(private _fuseConfigService: FuseConfigService) {}

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        console.log('FILTERs', config);
        this.filters = config.filters;
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

  addFilter() {
    this._fuseConfigService.config = {
      filters: [...this.filters, { type: 'top', value: 5 }],
      // filters: [...this.filters, { type: 'quantile', value: 95 }],
    };
  }

  removeFilter(idx: number) {
    this.filters.splice(idx, 1);
    this._fuseConfigService.config = {
      filters: [...this.filters],
    };
  }

  updateFilterValue(idx: number, value: number | null) {
    if (!value) return;
    this.filters[idx].value = value;
    this._fuseConfigService.config = {
      filters: [...this.filters],
    };
  }

  trackByFilter = (index: number, item: Filter) => {
    return item.type;
  };

  setFilter(type: string | undefined) {
    console.log('FILTER', type);
    if (type === undefined) {
      this.filters = [];
      this._fuseConfigService.config = {
        filters: [...this.filters],
      };
      return;
    }

    let filter = { type: 'top', value: 5 };
    if (type === 'quantile') {
      filter = { type: 'quantile', value: 95 };
    }
    this._fuseConfigService.config = {
      filters: [filter],
      // filters: [...this.filters, { type: 'quantile', value: 95 }],
    };
  }
}
