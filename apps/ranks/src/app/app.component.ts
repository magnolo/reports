import { Component } from '@angular/core';

import { take } from 'rxjs/operators';
import { DataService } from './mock-api/data/data.service';


@Component({
  selector: 'twentythree-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // public ranks$ = this.http.get('/api/ranks').pipe(map((response: any) => response.payload));
  // public news$ = this.http.get<any[]>('/api/news');

  constructor(private dataService: DataService) {
    this.dataService.getRegions().pipe(take(1)).subscribe((regions) => {
      console.log('REGIONS', regions)
    })
  }
}
