import { Route } from '@angular/router';
import { LayoutComponent } from '@twentythree/layout/layout.component';
import { InitialDataResolver } from './app.resolver';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      // Dashboards

      {
        path: '',
        // data: {
        //   layout: 'classic',
        // },
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'report/:slug',
        loadChildren: () =>
          import('./modules/report/report.module').then((m) => m.ReportModule),
      },
    ],
  },
];
