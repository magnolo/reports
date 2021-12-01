import { Route } from '@angular/router';
import { ReportComponent } from './report.component';
import { ReportResolver } from './report.resolvers';

export const reportRoutes: Route[] = [
    {
        path     : '',
        component: ReportComponent,
        resolve  : {
            report: ReportResolver
        }
    }
];
