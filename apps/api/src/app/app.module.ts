import { NewsController } from './news/news.component';
import { ReportService } from './report/report.service';
import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportController } from './report/report.component';
import { NewsService } from './news/news.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ReportController, NewsController],
  providers: [AppService, ReportService, NewsService],
})
export class AppModule {}
