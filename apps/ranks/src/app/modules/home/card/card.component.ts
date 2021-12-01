import { Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
// import { quantileSeq } from 'mathjs';
import { Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
@Component({
  selector: 'rank-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class RankCardComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input('report') item!: Report;

  selectedCountry?: string;
  filters: Filter[] = [];

  get activeRank() {
    if (this.item && this.item.ranks && this.item.ranks.length > 0) {
      if (this.selectedCountry) {
        return this.item.ranks.find(
          (rank) => rank.country_code === this.selectedCountry
        );
      }
      return this.item.ranks[0];
    }
    return;
  }

  constructor(
    private configService: FuseConfigService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.selectedCountry = config.selectedCountry;
        this.filters = config.filters;
        this.cdr.detectChanges();
      });

    // const q = quantileSeq(
    //   this.item.ranks.map((rank) => rank.score),
    //   0.95
    // );
    // console.log('item', this.item.name, q);
  }

  ngOnDestroy(): void {

    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
