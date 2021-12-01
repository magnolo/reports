import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, of } from 'rxjs';
import { Category, News, Rank, Report } from '@twentythree/api-interfaces';
import * as faker from 'faker';
import { COUNTRY_CODES } from './countries';

const randomNumber = (max: number) => Math.floor(Math.random() * max);
const randomNumberComma = (max: number) => +(Math.random() * max).toFixed(1);
const randomNumberBetween = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _reports: Map<string, Report> = new Map();
  private _categories?: Category[];

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

  getReportBySlug(slug: string): Observable<Report | null> {
    if (this._reports.has(slug)) {
      const report = this._reports.get(slug);
      if (report) {
        return of(report);
      }
    }
    return of(null);
  }

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

  getReports(count = 40, category?: Category, lvl: number = 0): Report[] {
    const reports: Report[] = [];
    const cat = category
      ? category
      : {
          slug: 'category-1',
          name: faker.lorem.words(),
          description: faker.lorem.paragraph(),
        };

    const countries = COUNTRY_CODES;

    for (let i = 0; i < count; i++) {
      const name = faker.commerce.productName();
      const slug = `report-${faker.lorem.slug()}`;

      const data: Rank[] = countries
        .map((country) => ({
          score: randomNumberComma(100),
          trend: randomNumberComma(20),
          country_code: country.alpha2Code.toLowerCase(),
          country_name: country.englishShortName,
        }))
        .sort((a, b) => b.score - a.score)
        .map((rank, idx) => ({ ...rank, rank: idx + 1 }));

      const report: Report = {
        slug: slug,
        name: name,
        short: faker.hacker.ingverb(),
        description: faker.lorem.paragraph(),
        category: cat,
        image: {
          url: `https://source.unsplash.com/random/800x600?sig=${randomNumber(
            1000
          )}`,
        },
        type: 'composite',
        ranks: data,
        value: randomNumberComma(100),
        indicators_count: randomNumber(40),
        children:
          lvl < 3
            ? this.getReports(randomNumberBetween(2, 5), undefined, lvl + 1)
            : [],
      };

      const deepCount: any = (arr = []) => {
        return arr.reduce((acc, val: any) => {
          return (
            acc +
            (val.children && Array.isArray(val.children)
              ? deepCount(val.children)
              : 0)
          );
        }, arr.length);
      };

      report.indicators_count = deepCount(report.children);
      reports.push(report);

      if (lvl === 0) {
        this._reports.set(slug, report);
      }
    }

    // const codes = reports.map((report) => report.ranks.map((rank) => rank.country_code));

    // console.log(codes.join(','));
    // this.getCountryDetails(codes.join(',')).toPromise()

    return reports;
  }

  getCategories(): Observable<Category[]> {
    if (this._categories && this._categories.length > 0) {
      return of(this._categories);
    }

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
    this._categories = categories;
    return of(categories);
  }
}
