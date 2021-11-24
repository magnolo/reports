import { categories } from './../../../../ranks/src/app/mock-api/apps/academy/data';
import { HttpService, Injectable } from '@nestjs/common';
import { Category, Report } from '@twentythree/api-interfaces';
import * as faker from 'faker/locale/de_AT';

const randomNumber = (max) => Math.floor(Math.random() * max);

@Injectable()
export class ReportService {
  private countryRestUrl = 'https://restcountries.com/v3.1/alpha/';

  constructor(private httpService: HttpService) {}

  private getCountryDetails(code: string){
    return this.httpService.get(`${this.countryRestUrl}${code}`)
  }

  getRanks(count = 40, category?: Category): Report[] {
    const reports: Report[] = [];
    const cat = {...category} || {
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

  getCategories() {
    const categories: Category[] = [];

    for (let i = 0; i < 5; i++) {
      const category: Category = {
        slug: `category-${i}`,
        name: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        short: faker.lorem.slug(),
        color: faker.internet.color(),
        tags: [],
      };

      category.reports = this.getRanks(8, category);

      categories.push(category);
    }

    return categories;
  }
}
