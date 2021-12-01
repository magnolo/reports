import { RanksCountPipe } from './ranks-count.pipe';
import { RanksFilterPipe } from './ranks-filter.pipe';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        RanksFilterPipe,
        RanksCountPipe
    ],
    exports     : [
      RanksFilterPipe,
      RanksCountPipe
    ]
})
export class RanksFilterPipeModule
{
}
