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


@NgModule({
    declarations: [
        SearchDrawerComponent,
        SearchPipe
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
        FormsModule,
        ReactiveFormsModule,
        SearchModule
    ],
    exports     : [
      SearchDrawerComponent
    ]
})
export class SearchDrawerModule
{
}
