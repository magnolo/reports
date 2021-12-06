import { take } from 'rxjs/operators';
import { DataService } from '../../mock-api/data/data.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Observable, Subject, takeUntil } from 'rxjs';
import { Category, News } from '@twentythree/api-interfaces';
import * as chroma from 'chroma-js';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import { Filter } from '@twentythree/core/config/app.config';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('swap', [
      // state('void', style({ opacity: 0, transform: 'translateY(10%)' })),
      // state('*', style({ opacity: 1, transform: 'translateY(0%)' })),
      //transition('void => *', [style({ transform: 'translateY(50px) rotateX(-90deg) scale(0.95)', opacity: 0}), animate('0.25s 0.2s ease-in',style({ transform: 'translateY(0%) rotateX(0deg) scale(1)', opacity: 1}))]),
      transition('* => void', [style({ opacity: 1}), animate('1s ease-out', style({ opacity: 0}))])
    ])
  ],
})
export class HomeComponent {
  categories$!: Observable<Category[]>;
  categories: Category[] = [];
  news$!: Observable<News[]>;

  filters: Filter[] = [];
  selectedCountry?: string;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private dataService: DataService,
    private configService: FuseConfigService,
    private cdr: ChangeDetectorRef
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.filters = config.filters;
        this.selectedCountry = config.selectedCountry;
        this.cdr.detectChanges();
      });

    this.dataService
      .getCategories()
      .pipe(take(1))
      .subscribe((categories) => {
        this.categories = categories;
        console.log('[All]', this.categories)
        this.cdr.detectChanges();
      });
    this.news$ = this.dataService.getNews();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  getColor(color: string) {
    return chroma(color).alpha(0.1).css();
  }
}
