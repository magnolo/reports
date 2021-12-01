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
import { reportRoutes } from './report.routing';
import { SharedModule } from '@twentythree/shared';
import { ReportComponent } from './report.component';
import { FuseCardModule } from '@twentythree/fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CountriesMapModule } from 'countries-map';
import { RanksModule } from '@twentythree/fuse/components/ranks/ranks.module';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    RouterModule.forChild(reportRoutes),
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
    CountriesMapModule,
  ],
})
export class ReportModule {}
