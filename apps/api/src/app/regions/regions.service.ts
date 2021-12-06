import { map, tap } from 'rxjs/operators';
import { HttpService, Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';

@Injectable()
export class RegionsService {
  private url = `${environment.api.baseUrl}regions`;

  constructor(private httpService: HttpService) {}

  getRegions() {
    // 'https://app.23degrees.io/api/v2/regions?space=public&mappingid=world_countries_disputed&page=0&page_size=50'
    console.log(
      `${this.url}?space=public&mappingid=world_countries_disputed&page=0&page_size=100`
    );
    console.log('Bearer ' + environment.api.token);
    return this.httpService
      .get(
        `${this.url}?space=public&mappingid=world_countries_disputed&page=0&page_size=100`,
        {
          headers: {
            Authorization: 'Bearer ' + environment.api.token,
          },
        }
      )
      .pipe(  map((response) => response.data.payload), tap((data) => console.log(data)));
  }
}
