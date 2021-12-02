import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SearchPipe } from './search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchModule } from './../search/search.module';
import { SearchDrawerComponent } from './search-drawer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@twentythree/fuse/components/drawer';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { CountryFilterComponent } from './components/country-filter/country-filter.component';
import { RangeFiltersComponent } from './components/range-filters/range-filters.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
    declarations: [
        SearchDrawerComponent,
        SearchPipe,
        CountryFilterComponent,
        RangeFiltersComponent,

    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
        MatFormFieldModule,
        FuseDrawerModule,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatButtonToggleModule,
        FormsModule,
        ReactiveFormsModule,
        SearchModule,
        NgxMatSelectSearchModule
    ],
    exports     : [
      SearchDrawerComponent,
      CountryFilterComponent,
      RangeFiltersComponent
    ]
})
export class SearchDrawerModule
{
}
