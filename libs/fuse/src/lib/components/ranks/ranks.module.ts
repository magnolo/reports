import { RankComponent } from './rank/rank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RanksComponent } from './ranks.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RanksComponent, RankComponent],
  exports: [RankComponent]
})
export class RanksModule { }
