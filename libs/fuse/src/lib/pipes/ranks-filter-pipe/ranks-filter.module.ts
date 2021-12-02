import { RanksCountryPipe } from './ranks-country.pipe';
import { RanksCountPipe } from './ranks-count.pipe';
import { RanksFilterPipe } from './ranks-filter.pipe';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        RanksFilterPipe,
        RanksCountPipe,
        RanksCountryPipe
    ],
    exports     : [
      RanksFilterPipe,
      RanksCountPipe,
      RanksCountryPipe
    ]
})
export class RanksFilterPipeModule
{
}
