import { Injectable } from '@nestjs/common';
import { News } from '@twentythree/api-interfaces';
import * as faker from 'faker/locale/de_AT';

const randomNumber = (max) => Math.floor(Math.random() * max);

@Injectable()
export class NewsService {
  getNews(): News[] {
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

    return news;
  }
}
