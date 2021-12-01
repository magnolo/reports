
export interface Tags {
  slug: string;
  name: string;
  short: string;
}

export interface Rank {
  score: number;
  country_code: string;
  country_name: string;
  rank: number;
  trend: number;
}

export interface Report {
  slug: string;
  name: string;
  description: string;
  short?: string;
  category: {
    slug: string;
    name: string;
    description: string;
  };
  image: {
    url: string;
  };
  value?: number;
  type: 'group' | 'composite' | 'indicator';
  ranks: Rank[];
  indicators_count: number;
  indicators?: {
    slug: string;
    name: string;
  }[];
  children?: Report[]
}

export interface Indicator {
  slug: string;
  name: string;
  description: string;
  parent: {
    type: 'indicator' | 'report' | 'group' | null | undefined;
    slug: string | undefined;
    name: string | undefined;
  };
}

export interface Category {
  slug: string;
  short: string;
  name: string;
  description: string;
  color: string;
  tags: Tags[];
  reports?: Report[];
}

export interface News {
  slug: string;
  created_at: Date;
  name: string;
  description: string;
  text: string;
  image: {
    url: string;
  };
}
