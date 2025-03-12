/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDsList {
  ids: string[];
}

export interface IDItem {
  encodedId: string;
  influence: number;
  similarCount: number;
}

export interface FormattedData {
  date: string;
  documentsCount: number;
  riskCount: number;
}

export interface ItemData {
  date: string;
  value: number;
}

export interface HistogramData {
  data: ItemData[];
  histogramType: string;
}

export interface OverviewData {
  date: string;
  documentsCount: number;
  riskCount: number;
}

export interface DataState {
  overviewData: OverviewData[];
  overviewIsLoading: boolean;
  idsAreLoading: boolean;
  articlesAreLoading: boolean;
  ids: string[];
  articles: any[];
  prevArticles: any[];
}
