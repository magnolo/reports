import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'country-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent {

  get countryCode(){
    return this.item?.country_code.toLowerCase();
  }

  @Input('rank') item: any;



}
