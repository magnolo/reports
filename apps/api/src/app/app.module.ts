import { RegionsService } from './regions/regions.service';
import { NewsController } from './news/news.component';

import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionsController } from './regions/regions.component';
import { NewsService } from './news/news.service';
import { ReportController } from './report/report.component';
import { ReportService } from './report/report.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ReportController, NewsController, RegionsController],
  providers: [AppService, ReportService, NewsService, RegionsService],
})
export class AppModule {}
