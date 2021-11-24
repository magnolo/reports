import { RanksModule } from './../../../../../../../../libs/fuse/src/lib/components/ranks/ranks.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { analyticsRoutes } from './analytics.routing';
import { SharedModule } from '@twentythree/shared';
import { AnalyticsComponent } from './analytics.component';
import { FuseCardModule } from '@twentythree/fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CountriesMapModule } from 'countries-map';

@NgModule({
    declarations: [
        AnalyticsComponent
    ],
    imports     : [
        RouterModule.forChild(analyticsRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatCheckboxModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
        SharedModule,
        FuseCardModule,
        RanksModule,
        CountriesMapModule
    ]
})
export class AnalyticsModule
{
}
