import { FuseConfigService } from './../../../../../../libs/fuse/src/lib/services/config/config.service';
import { DataService } from './../../mock-api/data/data.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseCardComponent } from '@twentythree/fuse/components/card';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Category, News } from '@twentythree/api-interfaces';
import * as chroma from 'chroma-js';

const randomNumber = (max: number) => Math.floor(Math.random() * max);

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements AfterViewInit {
  @ViewChildren(FuseCardComponent, { read: ElementRef })
  private _fuseCards!: QueryList<ElementRef>;

  filters: string[] = [
    'all',
    'article',
    'listing',
    'list',
    'info',
    'shopping',
    'pricing',
    'testimonial',
    'post',
    'interactive',
  ];
  numberOfCards: any = {};
  selectedFilter = 'all';

  items: any[] = [];
  items$!: Observable<any[]>;
  categories$!: Observable<Category[]>;
  news$!: Observable<News[]>;

  chartWeeklyExpenses: any = {
    chart  : {
        animations: {
            enabled: false
        },
        fontFamily: 'inherit',
        foreColor : 'inherit',
        height    : '100%',
        type      : 'area',
        sparkline : {
            enabled: true
        }
    },
    colors : ['#22D3EE'],
    series :  [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, ],
    stroke : {
        curve: 'smooth'
    },
    tooltip: {
        theme: 'dark'
    },
    xaxis  : {
        type      : 'category',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    yaxis  : {
        labels: {
            formatter: (val: any): string => `${val}%`
        }
    }
};


private _unsubscribeAll: Subject<any> = new Subject<any>();
  /**
   * Constructor
   */
  constructor(
    private _renderer2: Renderer2,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private configService: FuseConfigService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    // this._activatedRoute.params.subscribe((params) => {
    //   if (params.slug) {
    //     this.items$ = this.dataService.getFolderContent(params.slug);
    //   } else {
    //     this.items$ = this.dataService.getRanks();
    //   }
    //   console.log('pramas', params);
    // });
    // this.items$ = this.dataService.getReports();
    this.categories$ = this.dataService.getCategories();
    this.news$ = this.dataService.getNews();

   // Attach SVG fill fixer to all ApexCharts
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };




  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    // Calculate the number of cards
    this._calcNumberOfCards();

    // Filter the cards for the first time
    this._filterCards();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On filter change
   *
   * @param change
   */
  onFilterChange(change: MatButtonToggleChange): void {
    // Set the filter
    this.selectedFilter = change.value;

    // Filter the cards
    this._filterCards();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private _calcNumberOfCards(): void {
    // Prepare the numberOfCards object
    this.numberOfCards = {};

    // Prepare the count
    let count = 0;

    // Go through the filters
    this.filters.forEach((filter) => {
      // For each filter, calculate the card count
      if (filter === 'all') {
        count = this._fuseCards.length;
      } else {
        count = this.numberOfCards[filter] = this._fuseCards.filter(
          (fuseCard) =>
            fuseCard.nativeElement.classList.contains('filter-' + filter)
        ).length;
      }

      // Fill the numberOfCards object with the counts
      this.numberOfCards[filter] = count;
    });
  }

  /**
   * Filter the cards based on the selected filter
   *
   * @private
   */
  private _filterCards(): void {
    // Go through all fuse-cards
    this._fuseCards.forEach((fuseCard) => {
      // If the 'all' filter is selected...
      if (this.selectedFilter === 'all') {
        // Remove hidden class from all cards
        fuseCard.nativeElement.classList.remove('hidden');
      }
      // Otherwise...
      else {
        // If the card has the class name that matches the selected filter...
        if (
          fuseCard.nativeElement.classList.contains(
            'filter-' + this.selectedFilter
          )
        ) {
          // Remove the hidden class
          fuseCard.nativeElement.classList.remove('hidden');
        }
        // Otherwise
        else {
          // Add the hidden class
          fuseCard.nativeElement.classList.add('hidden');
        }
      }
    });
  }

  getColor(color: string){
    return chroma(color).alpha(0.10).css();
  }

  randomColor(){
    return chroma.random().css();
  }

  chartColors(){
    return [chroma.random().css()];
  }
  chartSeries(){
    return [{
      name: 'series1',
      data: [randomNumber(100), randomNumber(100), randomNumber(100), randomNumber(100)]
    }]
  }

  /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
   private _fixSvgFill(element: Element): void
   {
       // Current URL
       const currentURL = this._router.url;

       // 1. Find all elements with 'fill' attribute within the element
       // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
       // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
       Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill')?.indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal?.slice(attrVal.indexOf('#'))}`);
            });
   }


}
