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

const randomNumber = (max: number) => Math.floor(Math.random() * max);

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
