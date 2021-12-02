import { RanksCountryFilterPipe } from './ranks-country-filter.pipe';
import { RanksCountryPipe } from './ranks-country.pipe';
import { RanksCountPipe } from './ranks-count.pipe';
import { RanksFilterPipe } from './ranks-filter.pipe';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        RanksFilterPipe,
        RanksCountPipe,
        RanksCountryPipe,
        RanksCountryFilterPipe
    ],
    exports     : [
      RanksFilterPipe,
      RanksCountPipe,
      RanksCountryPipe,
      RanksCountryFilterPipe
    ]
})
export class RanksFilterPipeModule
{
}
