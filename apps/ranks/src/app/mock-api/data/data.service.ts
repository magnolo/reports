import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category, News, Report } from '@twentythree/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getRanks() {
    return this.httpClient.get<any[]>(`/api/ranks`);
    //.pipe(map((response: any) => response.payload));
  }

  getFolderContent(slug: string) {
    return this.httpClient.get<any[]>(`/api/ranks/${slug}`);
    //.pipe(map((response: any) => response.payload));
  }

  getReports() {
    return this.httpClient.get<Report[]>(`/api/reports`);
  }
  getCategories() {
    return this.httpClient.get<Category[]>(`/api/reports/categories`);
  }

  getNews(){
    return this.httpClient.get<News[]>(`/api/news`);
  }
}
