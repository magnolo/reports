import { FuseConfigService } from '@twentythree/fuse/services/config';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@twentythree/fuse/services/media-watcher';
import {
  FuseNavigationItem,
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@twentythree/fuse/components/navigation';
import { Navigation } from '@twentythree/core/navigation/navigation.types';
import { NavigationService } from '@twentythree/core/navigation/navigation.service';

@Component({
  selector: 'dense-layout',
  templateUrl: './dense.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DenseLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall!: boolean;
  menuOpen!: boolean;
  lockMenu: boolean = false;
  navigation!: Navigation;
  navigationAppearance: 'default' | 'dense' = 'dense';
  selectedCountry?: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  countryFilter: FuseNavigationItem = {
    id: 'dashboards.analytics',
    title: 'Analytics',
    type: 'basic',
    custom: true,
    icon: 'heroicons_outline:chart-pie',
  };

  rangeFilter: FuseNavigationItem = {
    id: 'dashboards.analytics',
    title: 'Analytics',
    type: 'basic',
    custom: true,
    icon: 'heroicons_outline:chart-pie',
  };

  countryFilterGroup: FuseNavigationItem = {
    id: 'dashboards',
    title: 'Country',
    subtitle: 'Choose a country',
    type: 'group',
    icon: 'heroicons_outline:home',
  };

  rangeFilterGroup: FuseNavigationItem = {
    id: 'dashboards',
    title: 'Filter',
    subtitle: 'Reduce selection',
    type: 'group',
    icon: 'heroicons_outline:home',
  };

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseConfig: FuseConfigService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        // this.navigation = navigation;
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });

    this._fuseConfig.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.selectedCountry = config.selectedCountry;
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
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  /**
   * Toggle the navigation appearance
   */
  toggleNavigationAppearance(): void {
    this.navigationAppearance =
      this.navigationAppearance === 'default' ? 'dense' : 'default';
  }
}
