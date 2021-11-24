import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LandingHomeComponent } from './home.component';
import { SharedModule } from '@twentythree/shared';
import { landingHomeRoutes } from './home.routing';


@NgModule({
    declarations: [
        LandingHomeComponent
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class LandingHomeModule
{
}
