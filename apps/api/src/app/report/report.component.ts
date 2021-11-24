import { ReportService } from './report.service';
import { Controller, Get, Param } from '@nestjs/common';


@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getRanks() {
    return this.reportService.getRanks();
  }

  @Get('categories')
  getCategories() {
    return this.reportService.getCategories();
  }
}
