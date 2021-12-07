import { take } from 'rxjs/operators';
import { DataService } from './../../../../../../../../apps/ranks/src/app/mock-api/data/data.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@twentythree/fuse/services/config';

@Component({
  selector: 'regions-filter',
  templateUrl: './regions-filter.component.html',
  styleUrls: ['./regions-filter.component.scss'],
})
export class RegionsFilterComponent implements OnInit {
  @Output() openChanged = new EventEmitter();

  public regions!: any[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedRegion?: string;
  selectedFullRegion?: any;
  search = '';

  constructor(
    private dataService: DataService,
    private _fuseConfigService: FuseConfigService
  ) {}

  ngOnInit(): void {
    this.dataService
      .getRegions()
      .pipe(take(1))
      .subscribe((regions: any[]) => {
        this.regions = regions;
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

  setRegion(selectedRegion: string) {
    if (this.selectedRegion === selectedRegion || !selectedRegion) {
      this._fuseConfigService.config = { selectedRegion: undefined };
      this.selectedFullRegion = undefined;
    } else {
      this._fuseConfigService.config = { selectedRegion };
      this.selectedFullRegion = this.regions.find((r) => r._id === selectedRegion);
    }
  }

  selectOpened(open: boolean) {
    this.openChanged.emit(open);
  }
}
