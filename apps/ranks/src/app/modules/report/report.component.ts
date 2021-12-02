import { take } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';

import Sunburst from 'sunburst-chart';


import { Rank, Report } from '@twentythree/api-interfaces';


import { CountriesData } from 'countries-map';
import { COUNTRY_CODES } from '../../mock-api/data/countries';
import { FuseConfigService } from '@twentythree/fuse/services/config';
import { Epi } from '../../mock-api/data';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  @ViewChild('sunburst') set setSurbst(elem: ElementRef) {
    if (elem) {
      this.zone.runOutsideAngular(() => {
        if (!this.sunburstChart) {
          const size =
            this.elem.nativeElement.clientWidth < 400
              ? this.elem.nativeElement.clientWidth * 0.8
              : 450;
          this.sunburstChart = Sunburst();
          this.sunburstChart
            .onClick((node: any) => {
              this.updateStates(node);
              this.cdr.detectChanges();
              return true;
            })
            // .strokeColor('transparent')
            .minSliceAngle(0)
            .labelOrientation('angular')
            .radiusScaleExponent(1)
            .nodeClassName('node')
            .color((node: any) => {
              return node.color || '#ccc';
            })
            .tooltipContent((node: any) => {
              const rank: any = node.ranks[0];
              return `${rank.country_name}: ${rank.score}`;
            })
            .label((node: any) => node.name)
            .centerRadius(0.5)
            .width(size)
            .height(size)
            .data(this.report)(elem.nativeElement);
        }
      });
    }
  }

  chartVisitors?: any;
  chartConversions!: any;
  chartImpressions!: any;
  chartVisits!: any;
  chartVisitorsVsPageViews!: any;
  chartNewVsReturning!: any;
  chartGender!: any;
  chartAge!: any;
  chartLanguage!: any;
  data: any;

  sunburstChart: any;
  country!: Rank;

  epi;

  report!: Report;
  visibleIndicators: string[] = [];
  countriesData!: CountriesData;
  indCountriedData?: CountriesData;
  active?: string;
  chartData?: any;
  currentIndicator!: any;
  selectedCountry?: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private elem: ElementRef,
    private configService: FuseConfigService
  ) {
    this.epi = new Epi();
    this.report = this.epi.getTree();
    // this.generateCountriesData();
    // this.country = this.epiTree.ranks[0];
    // this.currentIndicator = this.epiTree;
    this.updateStates(this.report);
    console.log(this.report)

    this.configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        console.log('config', config);
        if (config.selectedCountry) {
          const c = COUNTRY_CODES.find(
            (codes) =>
              codes.alpha2Code.toLocaleLowerCase() ===
              config.selectedCountry.toLowerCase()
          );

          if (c) {
            console.log('c', c);
            this.selectedCountry = {
              country_name: c.englishShortName,
              country_code: c.alpha2Code.toLowerCase(),
            };
            this.updateStates(this.currentIndicator);
            this.cdr.detectChanges();
          }
        } else {
          this.selectedCountry = undefined;
          this.updateStates(this.currentIndicator);
          this.zone.onStable.pipe(take(1)).subscribe(() => {
            this.cdr.detectChanges();
          });
          //
        }
      });
  }

  updateStates(node?: any) {
    if (this.sunburstChart) {
      this.sunburstChart.focusOnNode(node);
    }

    node = node || this.report;

    this.currentIndicator = node;
    if (this.selectedCountry) {
      const c = node.ranks.find(
        (rank: any) => rank.country_code === this.selectedCountry.country_code
      );
      if (!c) return;
      this.country = c;
      console.log(this.country, node.ranks);
    } else {
      this.country = node.ranks[0];
    }

    this.generateCountriesData(node.ranks);
  }

  deepFind(slug: string) {
    if (this.report.slug === slug) {
      return this.report;
    }

    return this.find(this.report.children, 'slug', slug);
  }
  find(collection: any, key: string, value: any) {
    for (const o of collection) {
      for (const [k, v] of Object.entries(o)) {
        if (k === key && v === value) {
          return o;
        }
        if (Array.isArray(v)) {
          const _o: any = this.find(v, key, value);
          if (_o) {
            return _o;
          }
        }
      }
    }
  }

  generateCountriesData(ranks?: Rank[]) {
    const r = ranks || this.report.ranks;
    this.countriesData = r.reduce((result: any, item: any) => {
      result[item.country_code.toUpperCase()] = { ...item, value: item.score };
      return result;
    }, {});
  }

  setIndMap(indicator: Report) {
    if (this.active === indicator.slug) {
      this.active = undefined;
      this.indCountriedData = undefined;
      this.chartData = undefined;
      return;
    }
    this.active = indicator.slug;
    this.indCountriedData = indicator.ranks.reduce((result: any, item: any) => {
      result[item.country_code.toUpperCase()] = { ...item, value: item.score };
      return result;
    }, {});

    // this.chartData = {
    // const chartData: any = {
    //   series: [
    //     {
    //       name: 'Countries',
    //       data: indicator.ranks.map((rank: any) => rank.score),
    //     },
    //   ],
    //   chart: {
    //     type: 'bar',
    //     animations: {
    //       speed: 400,
    //       animateGradually: {
    //         enabled: false,
    //       },
    //     },
    //     fontFamily: 'inherit',
    //     foreColor: 'inherit',
    //     width: '100%',
    //     height: '100%',

    //     toolbar: {
    //       show: false,
    //     },
    //     zoom: {
    //       enabled: true,
    //     },
    //   },
    //   plotOptions: {
    //     bar: {
    //       borderRadius: 10,
    //       dataLabels: {
    //         position: 'top', // top, center, bottom
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //     formatter: function (val: any) {
    //       return val + '%';
    //     },
    //     offsetY: -20,
    //     style: {
    //       fontSize: '12px',
    //       colors: ['#304758'],
    //     },
    //   },

    //   xaxis: {
    //     lines:{
    //       show: false,
    //     },
    //     categories: indicator.ranks.map((rank: any) => rank.rank),
    //     position: 'bottom',
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     crosshairs: {
    //       fill: {
    //         type: 'gradient',
    //         gradient: {
    //           colorFrom: '#4F46E5',
    //           colorTo: '#BED1E6',
    //           stops: [0, 180],
    //           opacityFrom: 0.4,
    //           opacityTo: 0.5,
    //         },
    //       },
    //     },
    //     tooltip: {
    //       enabled: true,
    //     },
    //   },
    //   yaxis: {
    //     lines:{
    //       show: false,
    //     },
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     labels: {
    //       show: false,
    //       formatter: function (val: any) {
    //         return val + '%';
    //       },
    //     },
    //   },
    // };
    // console.log(chartData)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the data
    this._route.data.pipe(take(1)).subscribe((data) => {
      console.log('DATA', data);

      if(data && data.report){
        this.report = data.report;
        this.updateStates(this.report)
      }
    });

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
          },
        },
      },
    };
  }

  isVisible(id: string) {
    return this.visibleIndicators.includes(id);
  }

  toggleVisibleIndicator(id: string) {
    const idx = this.visibleIndicators.indexOf(id);
    if (idx > -1) {
      this.visibleIndicators.splice(idx, 1);
    } else {
      this.visibleIndicators.push(id);
    }
  }

  selectCountry(country: any) {
    if (!country || !country.country) return;

    const c = COUNTRY_CODES.find(
      (codes) =>
        codes.alpha2Code.toLocaleLowerCase() === country.country.toLowerCase()
    );

    if (c) {
      this.selectedCountry = {
        country_name: c.englishShortName,
        country_code: c.alpha2Code.toLowerCase(),
      };
      this.updateStates(this.currentIndicator);
    }
  }

  removeCountrySelection() {
    this.selectedCountry = undefined;
    this.updateStates(this.currentIndicator);
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

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
  private _fixSvgFill(element: Element): void {
    // Current URL
    const currentURL = this._router.url;

    // 1. Find all elements with 'fill' attribute within the element
    // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
    // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
    Array.from(element.querySelectorAll('*[fill]'))
      .filter((el) => el.getAttribute('fill')?.indexOf('url(') !== -1)
      .forEach((el) => {
        const attrVal = el.getAttribute('fill');
        el.setAttribute(
          'fill',
          `url(${currentURL}${attrVal?.slice(attrVal.indexOf('#'))}`
        );
      });
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    // Visitors

    // {
    //   chart: {
    //     animations: {
    //       speed: 400,
    //       animateGradually: {
    //         enabled: false,
    //       },
    //     },
    //     fontFamily: 'inherit',
    //     foreColor: 'inherit',
    //     width: '100%',
    //     height: '100%',
    //     type: 'area',
    //     toolbar: {
    //       show: false,
    //     },
    //     zoom: {
    //       enabled: false,
    //     },
    //   },
    //   colors: ['#818CF8'],
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   fill: {
    //     colors: ['#312E81'],
    //   },
    //   grid: {
    //     show: true,
    //     borderColor: '#334155',
    //     padding: {
    //       top: 10,
    //       bottom: -40,
    //       left: 0,
    //       right: 0,
    //     },
    //     position: 'back',
    //     xaxis: {
    //       lines: {
    //         show: true,
    //       },
    //     },
    //   },
    //   series: this.data.visitors.series,
    //   stroke: {
    //     width: 2,
    //   },
    //   tooltip: {
    //     followCursor: true,
    //     theme: 'dark',
    //     x: {
    //       format: 'MMM dd, yyyy',
    //     },
    //     y: {
    //       formatter: (value: number): string => `${value}`,
    //     },
    //   },
    //   xaxis: {
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     crosshairs: {
    //       stroke: {
    //         color: '#475569',
    //         dashArray: 0,
    //         width: 2,
    //       },
    //     },
    //     labels: {
    //       offsetY: -20,
    //       style: {
    //         colors: '#CBD5E1',
    //       },
    //     },
    //     tickAmount: 20,
    //     tooltip: {
    //       enabled: false,
    //     },
    //     type: 'datetime',
    //   },
    //   yaxis: {
    //     axisTicks: {
    //       show: false,
    //     },
    //     axisBorder: {
    //       show: false,
    //     },
    //     min: (min: number): number => min - 750,
    //     max: (max: number): number => max + 250,
    //     tickAmount: 5,
    //     show: false,
    //   },
    // };

    // Conversions
    this.chartConversions = {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#38BDF8'],
      fill: {
        colors: ['#38BDF8'],
        opacity: 0.5,
      },
      series: this.data.conversions.series,
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
      },
      xaxis: {
        type: 'category',
        categories: this.data.conversions.labels,
      },
      yaxis: {
        labels: {
          formatter: (val: { toString: () => string }): string =>
            val.toString(),
        },
      },
    };

    // Impressions
    this.chartImpressions = {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#34D399'],
      fill: {
        colors: ['#34D399'],
        opacity: 0.5,
      },
      series: this.data.impressions.series,
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
      },
      xaxis: {
        type: 'category',
        categories: this.data.impressions.labels,
      },
      yaxis: {
        labels: {
          formatter: (val: { toString: () => string }): string =>
            val.toString(),
        },
      },
    };

    // Visits
    this.chartVisits = {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#FB7185'],
      fill: {
        colors: ['#FB7185'],
        opacity: 0.5,
      },
      series: this.data.visits.series,
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
      },
      xaxis: {
        type: 'category',
        categories: this.data.visits.labels,
      },
      yaxis: {
        labels: {
          formatter: (val: { toString: () => string }): string =>
            val.toString(),
        },
      },
    };

    // Visitors vs Page Views
    this.chartVisitorsVsPageViews = {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'area',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ['#64748B', '#94A3B8'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ['#64748B', '#94A3B8'],
        opacity: 0.5,
      },
      grid: {
        show: false,
        padding: {
          bottom: -40,
          left: 0,
          right: 0,
        },
      },
      legend: {
        show: false,
      },
      series: this.data.visitorsVsPageViews.series,
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
        x: {
          format: 'MMM dd, yyyy',
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        labels: {
          offsetY: -20,
          rotate: 0,
          style: {
            colors: 'var(--fuse-text-secondary)',
          },
        },
        tickAmount: 3,
        tooltip: {
          enabled: false,
        },
        type: 'datetime',
      },
      yaxis: {
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)',
          },
        },
        max: (max: number): number => max + 250,
        min: (min: number): number => min - 250,
        show: false,
        tickAmount: 5,
      },
    };

    // New vs. returning
    this.chartNewVsReturning = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false,
          },
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'donut',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#3182CE', '#63B3ED'],
      labels: this.data.newVsReturning.labels,
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%',
          },
        },
      },
      series: this.data.newVsReturning.series,
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        custom: ({
          seriesIndex,
          w,
        }: any): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`,
      },
    };

    // Gender
    this.chartGender = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false,
          },
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'donut',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#319795', '#4FD1C5'],
      labels: this.data.gender.labels,
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%',
          },
        },
      },
      series: this.data.gender.series,
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        custom: ({
          seriesIndex,
          w,
        }: any): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                     <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                     <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                     <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                 </div>`,
      },
    };

    // Age
    this.chartAge = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false,
          },
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'donut',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#DD6B20', '#F6AD55'],
      labels: this.data.age.labels,
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%',
          },
        },
      },
      series: this.data.age.series,
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        custom: ({
          seriesIndex,
          w,
        }: any): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`,
      },
    };

    // Language
    this.chartLanguage = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false,
          },
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'donut',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#805AD5', '#B794F4'],
      labels: this.data.language.labels,
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%',
          },
        },
      },
      series: this.data.language.series,
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        custom: ({
          seriesIndex,
          w,
        }: any): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`,
      },
    };
  }

  currentRank(ranks: any) {
    if (!this.selectedCountry || !this.selectedCountry.country_code) {
      return ranks[0];
    }

    const c = ranks.find(
      (rank: any) => rank.country_code === this.selectedCountry.country_code
    );
    if (!c) return ranks[0];

    return c;
  }
}
