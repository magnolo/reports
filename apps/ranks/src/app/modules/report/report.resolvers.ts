import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Report } from '@twentythree/api-interfaces';
import { Observable } from 'rxjs';
import { DataService } from '../../mock-api/data/data.service';


@Injectable({
  providedIn: 'root',
})
export class ReportResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _dataService: DataService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Report | null> {
    const slug: string = route.params['slug'];
    console.log('SLUUG', slug);
    return this._dataService.getReportBySlug(slug);
  }
}
