import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], query: string): any[] {
    if (!items) {
      return [];
    }
    if (!query || query.length === 0) return items;
    return items.filter((item) => {
      return item.country_name
        .toLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }
}
