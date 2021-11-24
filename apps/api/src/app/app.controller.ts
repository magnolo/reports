import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('ranks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }


  // @Get('navigation')
  // getNavigation() {
  //   return this.appService.getNews();
  // }

  @Get(':slug')
  getContent(@Param('slug') slug: string) {
    return this.appService.getData(slug, false, 'card');
  }
}
