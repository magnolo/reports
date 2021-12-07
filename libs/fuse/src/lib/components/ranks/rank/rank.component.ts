import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'apps/ranks/src/app/mock-api/data/data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'country-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
})
export class RankComponent {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  get countryCode() {
    return this.item?.country_code.toLowerCase();
  }

  selectedRegion?: string;
  region?: any;

  @Input('rank') item: any;

  constructor(
    private _configService: FuseConfigService,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this._configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        if (config.selectedRegion !== this.selectedRegion) {
          this.selectedRegion = config.selectedRegion;
          if (this.selectedRegion) {
            this._dataService
              .getRegionById(this.selectedRegion)
              .subscribe((region) => {
                this.region = region;
              });
          } else {
            this.region = undefined;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
