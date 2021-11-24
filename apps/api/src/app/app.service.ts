import { HttpService, Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppService {
  private baseUrl = 'https://app.23degrees.io/api/v2/content';
  private url = `${this.baseUrl}?space=all&order_by=updated_at desc&page=0&page_size=100&type=folder`;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDIxMGI4YTAzYzZiYTAwMWQ1MmZiYzEiLCJlbWFpbCI6InJhbmtpbmdzQDIzZGVncmVlcy5pbyIsInNsdWciOiJyYW5raW5ncy11bmQtbW9uaXRvcmluZyIsInJvbGVzIjpbIjVkNDhhYmM1ODMxODZjMDAxZWY2Yzc5MCIsIjVmNjQ5MDdjY2JkMDBkMDAxYzViMDhlZSIsIjVkNDhhYmM1ODMxODZjMDAxZWY2Yzc5MSIsIjVkNGFlZDBlMmU1YTMxMDAyMDY0ZWEzMSIsIjVkNGFlZDI5MmU1YTMxMDAyMDY0ZWEzMiIsIjVmMmFjYTQwZTJmNmQzMDAxZGMyZDgyMCIsIjVlZDExNzdkZGE4YTc3MDAxZDJhZDJiYSIsIjVmZTA1MWNmYWU3YTcyMDAxY2VkODUyYSJdLCJpYXQiOjE2MzczMTM3MDl9.oogUWwv2VubvXiOvSXSTt0VKb9TI_bBA6qtOjXp0uVY';

  constructor(private httpService: HttpService) {}

  getData(
    slug = 'ZUSlRmBAfim8r4ex-collection-edutcation-and-digitalization',
    includeSubfolders = true,
    projection: 'simple' | 'full' | 'card' = 'simple'
  ) {
    this.httpService.get(`${this.baseUrl}/${slug}`);
    return this.httpService
      .get(
        `${
          this.url
        }&parent=${slug}&projection=${projection}&includesubfolders=${
          includeSubfolders ? 'yes' : 'no'
        }`,
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        }
      )
      .pipe(
        catchError((boom) => {
          console.log('boom');
          return of(boom);
        }),
        map((response) => response.data.payload)
      );
  }
}
