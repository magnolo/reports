import { NewsService } from './news.service';
import { Controller, Get } from '@nestjs/common';


@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getRanks() {
    return this.newsService.getNews();
  }


}
