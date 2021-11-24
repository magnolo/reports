import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rank-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class RankCardComponent implements OnInit {

  @Input('rank') item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
