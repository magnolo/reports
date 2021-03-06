import { COUNTRY_CODES } from './countries';
import {
  EPI_NAMES,
  EPI_DATA_FULL,
  EPI_TREE,
} from './epi';


export class Epi {

  getRanksByIndicator(indicator: string) {
    const scoreField: any = indicator + '.new';
    const rankField = indicator + '.rnk.new';
    const changeField = indicator + '.change';
    // const scoreField: any = indicator + '.new';
    // const rankField = indicator + '.rgn.rank';
    // const changeField = indicator + '.rgn.mean';

    return EPI_DATA_FULL.filter((item: any) => item[scoreField] != 'NA')
      .map((item: any) => ({
        country_name: item.country,
        country_code: COUNTRY_CODES.find((code) => code.alpha3Code === item.iso)
          ?.alpha2Code.toLocaleLowerCase(),
        score: item[scoreField],
        rank: item[rankField],
        trend: item[changeField],
      }))
      .sort((a, b) => a.rank - b.rank);
  }

  getIndicator(indicatorId: string) {
    const item = EPI_NAMES.find((i) => i.slug === indicatorId);
    return {
      ...item,
      ranks: this.getRanksByIndicator(indicatorId),
    };
  }

  getTree() {
    const baseTree = EPI_TREE;
    return this.generateTreeItem(baseTree);
  }

  generateTreeItem(item: any) {
    const entry = {
      ...item,
      short: item.name,
      description: item.description,
      ...this.getIndicator(item.slug),
    };

    if (item.children && item.children.length > 0) {
      entry.children = item.children.map((child: any) =>
        this.generateTreeItem(child)
      );
    }

    return entry;
  }
}
