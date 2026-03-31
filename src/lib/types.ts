export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: 'hackernews' | 'reddit';
  category: 'ai' | 'tech' | 'international';
  publishedAt: number;
  isTranslated?: boolean;
  translatedTitle?: string;
  translatedSummary?: string;
}

export interface NewsResponse {
  news: NewsItem[];
  timestamp: number;
}

export type CategoryFilter = 'all' | 'ai' | 'tech' | 'international';
