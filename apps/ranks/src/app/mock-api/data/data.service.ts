import { switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, of, share, shareReplay, take } from 'rxjs';
import { Category, News, Rank, Report } from '@twentythree/api-interfaces';
import * as faker from 'faker';
import { COUNTRY_CODES } from './countries';

export const randomNumber = (max: number) => Math.floor(Math.random() * max);
export const randomNumberComma = (max: number) =>
  +(Math.random() * max).toFixed(1);
export const randomNumberBetween = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _reports: Map<string, Report> = new Map();
  private _categories?: Category[];
  private _regions?: any[];
  private cache$?: Observable<any[]>;

  constructor(private httpClient: HttpClient) {}

  getRegions(): Observable<any[]> {
    if (this._regions && this._regions.length > 0) {
      return of(this._regions);
    }

    if (!this.cache$) {
      this.cache$ = this.httpClient.get<any[]>('/api/regions').pipe(
        share(),
        tap((regions) => (this._regions = regions))
      );
    }
    return this.cache$;
  }

  getRegionById(regionId: string) {
    return this.getRegions().pipe(
      take(1),
      switchMap((regions) =>
        of(regions.find((region) => region._id === regionId))
      )
    );
  }

  getRegionCountries(regionId: string): Observable<string[]> {
    return this.getRegions().pipe(
      take(1),
      switchMap((regions) => {
        const region = regions.find((r) => r._id === regionId);
        return of(
          region.subregions.map((subRegion: any) =>
            subRegion.code.substring(2).toLocaleLowerCase()
          )
        );
      })
    );
  }

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

  getReports(
    count = 40,
    category?: Category,
    lvl: number = 0,
    countryCodes: string[] = []
  ): Report[] {
    const reports: Report[] = [];
    const cat = category
      ? category
      : {
          slug: 'category-1',
          name: faker.lorem.words(),
          description: faker.lorem.paragraph(),
        };

    let countries = COUNTRY_CODES.filter((item) =>
      countryCodes.length > 0 ? countryCodes.includes(item.alpha2Code) : true
    );

    for (let i = 0; i < count; i++) {
      const name = faker.commerce.productName();
      const slug = `report-${faker.lorem.slug()}`;
      // console.log('generate report', name, countryCodes, lvl)
      // countryCodes.length === 0 &&
      if (lvl === 0) {
        const random = randomNumberBetween(
          COUNTRY_CODES.length / 2,
          COUNTRY_CODES.length
        );

        countryCodes = this._getShuffledArr(COUNTRY_CODES)
          .slice(0, random)
          .map((item) => item.alpha2Code);

        countries = COUNTRY_CODES.filter((item) =>
          countryCodes.length > 0
            ? countryCodes.includes(item.alpha2Code)
            : true
        );
        console.log('[Report]', { name, slug });
        console.log(
          'exludes',
          COUNTRY_CODES.filter(
            (item) => !countryCodes.includes(item.alpha2Code)
          ).map((item) => item.alpha2Code)
        );
      }

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
            ? this.getReports(
                randomNumberBetween(2, 5),
                undefined,
                lvl + 1,
                countryCodes
              )
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

  _getShuffledArr(arr: any[]): any[] {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  }
}
