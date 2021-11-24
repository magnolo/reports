import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'country-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent {

  @Input('rank') item: any;



}
