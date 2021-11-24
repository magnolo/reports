import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'twentythree-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public ranks$ = this.http.get('/api/ranks').pipe(map((response: any) => response.payload));
  public news$ = this.http.get<any[]>('/api/news');

  constructor(private http: HttpClient) {}
}
