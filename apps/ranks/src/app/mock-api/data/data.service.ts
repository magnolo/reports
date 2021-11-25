import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Category, News, Report } from '@twentythree/api-interfaces';
import * as faker from 'faker';

const randomNumber = (max:number) => Math.floor(Math.random() * max);


@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  // getRanks() {
  //   return this.httpClient.get<any[]>(`/api/ranks`);
  //   //.pipe(map((response: any) => response.payload));
  // }

  getFolderContent(slug: string) {
    return this.httpClient.get<any[]>(`/api/ranks/${slug}`);
    //.pipe(map((response: any) => response.payload));
  }

  // getReports() {
  //   return this.httpClient.get<Report[]>(`/api/reports`);
  // }
  // getCategories() {
  //   return this.httpClient.get<Category[]>(`/api/reports/categories`);
  // }

  getNews(): Observable<News[]> {
    // return this.httpClient.get<News[]>(`/api/news`);

    const news: News[] = [];

    for (let i = 0; i <= 4; i++) {
      const item: News = {
        slug: `news-${i}`,
        name: faker.lorem.words(),
        created_at: faker.date.recent(),
        description: faker.lorem.paragraph(),
        text: faker.lorem.paragraphs(),
        image: {
          url: `https://source.unsplash.com/random/800x600?sig=${randomNumber(
            1000
          )}`,
        },
      };
      news.push(item);
    }

    return of(news);
  }

  getReports(count = 40, category?: Category): Report[] {
    const reports: Report[] = [];
    const cat = category ? category : {
      slug: 'category-1',
      name: faker.lorem.words(),
      description: faker.lorem.paragraph(),
    };

    for (let i = 0; i < count; i++) {


      const report: Report = {
        slug: `report-${i}`,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        category: cat,
        image: {
          url: `https://source.unsplash.com/random/800x600?sig=${randomNumber(1000)}`,
        },
        type: 'composite',
        score: randomNumber(100),
        trend: randomNumber(20),
        ranks: [
          {
            score: randomNumber(100),
            trend: randomNumber(20),
            rank: 1,
            country_code: faker.address.countryCode().toLowerCase(),
            country_name: faker.address.country()
          },
        ],
        indicators_count: randomNumber(40),
      };
      reports.push(report);
    }

    // const codes = reports.map((report) => report.ranks.map((rank) => rank.country_code));

    // console.log(codes.join(','));
    // this.getCountryDetails(codes.join(',')).toPromise()

    return reports;
  }

  getCategories(): Observable<Category[]> {
    const categories: Category[] = [];
    const names = [
      'Sustainability and Resources',
      'Digitalization, Education & Governance',
      'Economics & Business',
    ];
    for (let i = 0; i < 3; i++) {
      const category: Category = {
        slug: `category-${i}`,
        name: names[i] ? names[i] : faker.lorem.words(),
        description: faker.lorem.paragraph(),
        short: faker.lorem.slug(),
        color: faker.internet.color(),
        tags: [],
      };

      category.reports = this.getReports(8, category);

      categories.push(category);
    }

    return of(categories);
  }
}
