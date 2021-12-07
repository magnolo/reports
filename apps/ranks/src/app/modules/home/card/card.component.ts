import { Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import {
  ChangeDetectorRef,
  Component,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
// import { quantileSeq } from 'mathjs';
import { Report } from '@twentythree/api-interfaces';
import { Filter } from '@twentythree/core/config/app.config';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Directive({
  selector: '[ifChanges]',
})
export class IfChangesDirective {
  private currentValue: any;
  private hasView = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input() set ifChanges(val: any) {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (val !== this.currentValue) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.currentValue = val;
    }
  }
}

@Component({
  selector: 'rank-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('myTrigger', [
      // state('void', style({ opacity: 0, transform: 'translateY(10%)' })),
      // state('*', style({ opacity: 1, transform: 'translateY(0%)' })),
      transition('void => *', [
        style({
          transform: 'translateY(50px) rotateX(-90deg) scale(0.95)',
          opacity: 0,
        }),
        animate(
          '0.25s 0.2s ease-in',
          style({
            transform: 'translateY(0%) rotateX(0deg) scale(1)',
            opacity: 1,
          })
        ),
      ]),
      transition('* => void', [
        style({ transform: 'translateY(0%) rotateX(0deg)', opacity: 1 }),
        animate(
          '0.25s ease-out',
          style({
            transform: 'translateY(-50px) rotateX(90deg) scale(0.95)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class RankCardComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input('report') item!: Report;

  @Input() notValid = false;

  selectedCountry?: string;
  filters: Filter[] = [];
  selectedRegion?: string;
  selectedRegionCountries: string[] = [];

  get activeRank() {
    if (this.ranks.length > 0) {
      if (this.selectedCountry) {
        let rank =
          this.ranks.findIndex(
            (rank) => rank.country_code === this.selectedCountry
          ) || 0;
        rank++;

        return {
          ...(this.ranks.find(
            (rank) => rank.country_code === this.selectedCountry
          ) || this.item.ranks[0]),
          rank,
        };
      }
      return {...this.ranks[0], rank: 1};
    }
    return;
  }

  get ranks() {
    if (this.item?.ranks?.length > 0) {
      if (this.selectedRegionCountries?.length > 0) {
        return this.item.ranks.filter((rank) =>
          this.selectedRegionCountries.includes(rank.country_code)
        );
      }
      return this.item.ranks;
    }
    return [];
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
        this.selectedRegion = config.selectedRegion;
        this.selectedRegionCountries = config.selectedRegionCountries;
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
