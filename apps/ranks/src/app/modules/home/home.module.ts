import { RanksFilterPipeModule } from '../../../../../../libs/fuse/src/lib/pipes/ranks-filter-pipe/ranks-filter.module';
import { RanksModule } from '../../../../../../libs/fuse/src/lib/components/ranks/ranks.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@twentythree/fuse/components/card';
import { HomeComponent } from './home.component';
import { SharedModule } from '@twentythree/shared';
import { RankCardComponent } from './card/card.component';


export const routes: Route[] = [
    {
        path     : '',
        component: HomeComponent
    },
    // {
    //   path: ':slug',
    //   component: CardsComponent
    // }
];

@NgModule({
    declarations: [
        HomeComponent,
        RankCardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule,
        RanksFilterPipeModule,
        NgApexchartsModule,
        RanksModule
    ]
})
export class HomeModule
{
}
