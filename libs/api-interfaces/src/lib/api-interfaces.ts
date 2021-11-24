export interface Message {
  message: string;
}

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

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
  category: {
    slug: string;
    name: string;
    description: string;
  };
  image: {
    url: string;
  };
  type: 'group' | 'composite';
  score: number;
  trend: number;
  ranks: Rank[];
  tags?: Tags[];
  indicators_count: number;
  indicators?: {
    slug: string;
    name: string;
  }[];
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
