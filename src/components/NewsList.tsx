'use client';

import { useState } from 'react';
import NewsCard from './NewsCard';
import { NewsItem, CategoryFilter } from '@/lib/types';

interface NewsListProps {
  initialNews: NewsItem[];
  apiKey: string;
}

export default function NewsList({ initialNews, apiKey }: NewsListProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const filters: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'ai', label: 'AI' },
    { value: 'tech', label: '科技' },
    { value: 'international', label: '国际' },
  ];

  const filteredNews = filter === 'all'
    ? news
    : news.filter((item) => item.category === filter);

  async function handleRefresh() {
    setIsLoading(true);
    try {
      const headers: HeadersInit = {};
      if (apiKey) {
        headers['x-api-key'] = apiKey;
      }

      const res = await fetch('/api/news?translate=true', { headers });
      if (res.ok) {
        const data = await res.json();
        setNews(data.news);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <svg
            className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isLoading ? '刷新中...' : '刷新'}
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        最后更新: {lastUpdated.toLocaleTimeString('zh-CN')} | 共 {filteredNews.length} 条
      </p>

      {filteredNews.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>暂无新闻</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
